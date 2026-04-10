// Convenience hook — thin wrapper over useQuizContext
// Exposes state + typed action dispatchers so containers don't need to know action shapes

import { useQuizContext } from './quiz.provider';
import type { Answers } from 'lib/quiz/questions';

export function useQuiz() {
  const { state, dispatch } = useQuizContext();

  return {
    // ── State ──────────────────────────────────────────────────────────────
    screen: state.currentScreen,
    questionIndex: state.currentQuestionIndex,
    answers: state.answers,
    interstitial: state.activeInterstitial,
    progress: state.progress,
    email: state.email,
    firstName: state.firstName,
    results: state.results,

    // ── Actions ────────────────────────────────────────────────────────────
    startQuiz: () => dispatch({ type: 'START_QUIZ' }),
    answer: (questionId: string, value: string | string[]) =>
      dispatch({ type: 'ANSWER', questionId, value }),
    next: () => dispatch({ type: 'NEXT' }),
    back: () => dispatch({ type: 'BACK' }),
    advanceInterstitial: () => dispatch({ type: 'ADVANCE_INTERSTITIAL' }),
    showTeaser: () => dispatch({ type: 'SHOW_TEASER' }),
    showGate: () => dispatch({ type: 'SHOW_GATE' }),
    submitEmail: (email: string, firstName?: string) =>
      dispatch({ type: 'SUBMIT_EMAIL', email, firstName }),
    showResults: () => dispatch({ type: 'SHOW_RESULTS' }),
    restart: () => dispatch({ type: 'RESTART' }),
  };
}
