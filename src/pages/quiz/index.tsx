import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { QuizProvider } from 'contexts/quiz/quiz.provider';
import { useQuiz } from 'contexts/quiz/use-quiz';
import { ProgressBar } from 'components/quiz/ProgressBar';
import { WelcomeScreen } from 'containers/quiz/WelcomeScreen';
import { QuestionScreen } from 'containers/quiz/QuestionScreen';
import { InterstitialScreen } from 'containers/quiz/InterstitialScreen';
import { ResultsTeaser } from 'containers/quiz/ResultsTeaser';
import { EmailGate } from 'containers/quiz/EmailGate';

// ── Inner component — must be inside QuizProvider ───────────────────────────

function QuizInner() {
  const { screen, progress } = useQuiz();

  const showProgress = screen !== 'welcome';

  return (
    <div
      className="flex flex-col bg-canvas"
      style={{ minHeight: '100dvh' }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-xl mx-auto px-6 py-3 flex items-center justify-between">
          <a
            href="/"
            className="font-display text-18px text-ink hover:text-brand transition-colors duration-150"
            aria-label="Peptide Station home"
          >
            Peptide Station
          </a>
          {showProgress && (
            <span className="text-12px font-body text-muted">{progress}% complete</span>
          )}
        </div>
        {showProgress && <ProgressBar progress={progress} />}
      </header>

      {/* Main content — switches between screens */}
      <main className="flex flex-col flex-1 max-w-xl mx-auto w-full">
        {screen === 'welcome' && <WelcomeScreen />}
        {screen === 'question' && <QuestionScreen />}
        {screen === 'interstitial' && <InterstitialScreen />}
        {screen === 'teaser' && <ResultsTeaser />}
        {screen === 'gate' && <EmailGate />}
        {/* 'results' screen redirects to /quiz/results — handled in EmailGate */}
      </main>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const QuizPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Find Your Peptide Protocol — Peptide Station</title>
        <meta
          name="description"
          content="Answer 8 quick questions and get personalised peptide recommendations backed by real science. Takes under 3 minutes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <QuizProvider>
        <QuizInner />
      </QuizProvider>
    </>
  );
};

export default QuizPage;
