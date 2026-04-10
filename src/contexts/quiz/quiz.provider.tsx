import React, { createContext, useContext, useReducer } from 'react';
import { QUESTIONS } from 'lib/quiz/questions';
import { selectInterstitialA, selectInterstitialB } from 'lib/quiz/interstitials';
import { getTopRecommendations } from 'lib/quiz/scoring';
import type { Answers } from 'lib/quiz/questions';
import type { Interstitial } from 'lib/quiz/interstitials';
import type { TopRecommendations } from 'lib/quiz/scoring';

// ── Screen types ────────────────────────────────────────────────────────────

export type Screen =
  | 'welcome'
  | 'question'
  | 'interstitial'
  | 'teaser'
  | 'gate'
  | 'results';

// ── State ───────────────────────────────────────────────────────────────────

export type QuizState = {
  currentScreen: Screen;
  currentQuestionIndex: number; // 0-based; -1 = welcome
  answers: Answers;
  activeInterstitial: Interstitial | null;
  progress: number; // 0–100 display value
  maxProgress: number; // never decreases
  email: string | null;
  firstName: string | null;
  results: TopRecommendations | null;
};

const INITIAL_STATE: QuizState = {
  currentScreen: 'welcome',
  currentQuestionIndex: -1,
  answers: {},
  activeInterstitial: null,
  progress: 0,
  maxProgress: 0,
  email: null,
  firstName: null,
  results: null,
};

// ── Actions ─────────────────────────────────────────────────────────────────

export type Action =
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER'; questionId: string; value: string | string[] }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'ADVANCE_INTERSTITIAL' }
  | { type: 'SHOW_TEASER' }
  | { type: 'SHOW_GATE' }
  | { type: 'SUBMIT_EMAIL'; email: string; firstName?: string }
  | { type: 'SHOW_RESULTS' }
  | { type: 'RESTART' };

// ── Progress helpers ────────────────────────────────────────────────────────

const TOTAL_QUESTIONS = QUESTIONS.length; // 8

function calcProgress(questionIndex: number): number {
  if (questionIndex < 0) return 15; // welcome screen — endowed start
  const base = 15;
  const remaining = 85;
  return Math.round(base + (remaining * (questionIndex + 1)) / TOTAL_QUESTIONS);
}

function setProgress(state: QuizState, rawProgress: number): Pick<QuizState, 'progress' | 'maxProgress'> {
  const next = Math.max(state.maxProgress, rawProgress);
  return { progress: next, maxProgress: next };
}

// ── Reducer ─────────────────────────────────────────────────────────────────

// After which question index to show each interstitial (0-based)
const INTERSTITIAL_AFTER_Q2 = 1; // after q2_barrier (index 1)
const INTERSTITIAL_AFTER_Q6 = 5; // after q6_age (index 5)

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'START_QUIZ': {
      const progress = calcProgress(-1);
      return {
        ...state,
        currentScreen: 'question',
        currentQuestionIndex: 0,
        ...setProgress(state, progress),
      };
    }

    case 'ANSWER': {
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };
    }

    case 'NEXT': {
      const nextIndex = state.currentQuestionIndex + 1;

      // Check if we should show interstitial A (after Q2, index 1)
      if (state.currentQuestionIndex === INTERSTITIAL_AFTER_Q2) {
        const interstitial = selectInterstitialA(state.answers);
        return {
          ...state,
          currentScreen: 'interstitial',
          activeInterstitial: interstitial,
          currentQuestionIndex: nextIndex, // pre-advance so ADVANCE_INTERSTITIAL knows where to go
        };
      }

      // Check if we should show interstitial B (after Q6, index 5)
      if (state.currentQuestionIndex === INTERSTITIAL_AFTER_Q6) {
        const interstitial = selectInterstitialB(state.answers);
        return {
          ...state,
          currentScreen: 'interstitial',
          activeInterstitial: interstitial,
          currentQuestionIndex: nextIndex,
        };
      }

      // Last question — go to teaser
      if (nextIndex >= TOTAL_QUESTIONS) {
        const results = getTopRecommendations(state.answers);
        return {
          ...state,
          currentScreen: 'teaser',
          results,
          ...setProgress(state, 95),
        };
      }

      const progress = calcProgress(nextIndex);
      return {
        ...state,
        currentScreen: 'question',
        currentQuestionIndex: nextIndex,
        ...setProgress(state, progress),
      };
    }

    case 'BACK': {
      if (state.currentScreen === 'interstitial') {
        // Back from interstitial — return to previous question
        const prevIndex = state.currentQuestionIndex - 1;
        const progress = calcProgress(prevIndex);
        return {
          ...state,
          currentScreen: 'question',
          currentQuestionIndex: prevIndex,
          activeInterstitial: null,
          ...setProgress(state, progress),
        };
      }

      if (state.currentScreen === 'teaser' || state.currentScreen === 'gate') {
        return {
          ...state,
          currentScreen: 'question',
          currentQuestionIndex: TOTAL_QUESTIONS - 1,
          ...setProgress(state, calcProgress(TOTAL_QUESTIONS - 1)),
        };
      }

      if (state.currentQuestionIndex <= 0) {
        return { ...state, currentScreen: 'welcome', currentQuestionIndex: -1 };
      }

      const prevIndex = state.currentQuestionIndex - 1;
      const progress = calcProgress(prevIndex);
      return {
        ...state,
        currentScreen: 'question',
        currentQuestionIndex: prevIndex,
        ...setProgress(state, progress),
      };
    }

    case 'ADVANCE_INTERSTITIAL': {
      // Already pre-advanced index in NEXT
      const progress = calcProgress(state.currentQuestionIndex);
      return {
        ...state,
        currentScreen: 'question',
        activeInterstitial: null,
        ...setProgress(state, progress),
      };
    }

    case 'SHOW_TEASER': {
      const results = getTopRecommendations(state.answers);
      return {
        ...state,
        currentScreen: 'teaser',
        results,
        ...setProgress(state, 95),
      };
    }

    case 'SHOW_GATE': {
      return { ...state, currentScreen: 'gate', ...setProgress(state, 98) };
    }

    case 'SUBMIT_EMAIL': {
      return {
        ...state,
        email: action.email,
        firstName: action.firstName ?? null,
        ...setProgress(state, 100),
      };
    }

    case 'SHOW_RESULTS': {
      return { ...state, currentScreen: 'results' };
    }

    case 'RESTART': {
      return { ...INITIAL_STATE };
    }

    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────────────────────────

type QuizContextValue = {
  state: QuizState;
  dispatch: React.Dispatch<Action>;
};

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizContext must be used inside QuizProvider');
  return ctx;
}
