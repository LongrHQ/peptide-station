import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RECOMMENDATION_TEMPLATES } from 'lib/quiz/recommendations';
import { RecommendationCard } from 'components/quiz/RecommendationCard';
import type { TopRecommendations } from 'lib/quiz/scoring';

// Results are written to sessionStorage by EmailGate after gate submission.
// This page reads them back — works with static export.

const SESSION_KEY = 'ps_quiz_results';

const QuizResultsPage: NextPage = () => {
  const [results, setResults] = useState<TopRecommendations | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setResults(JSON.parse(raw));
    } catch {
      // Ignore parse errors
    }
    setLoaded(true);
  }, []);

  const primary = results?.primary
    ? RECOMMENDATION_TEMPLATES[results.primary]
    : null;

  const secondary =
    results?.secondary && results.secondary !== results.primary
      ? RECOMMENDATION_TEMPLATES[results.secondary]
      : null;

  if (!loaded) {
    // SSR placeholder — nothing to show yet
    return null;
  }

  if (!results || !primary) {
    // No results in session — user landed here directly
    return (
      <>
        <Head>
          <title>Your Peptide Protocol — Peptide Station</title>
        </Head>
        <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6">
          <h1 className="text-28px font-display text-ink mb-4 text-center">
            No results found
          </h1>
          <p className="text-14px font-body text-muted mb-6 text-center">
            It looks like you arrived here without completing the quiz.
          </p>
          <Link
            href="/quiz"
            className="py-3 px-8 rounded-full font-body font-semibold text-14px uppercase tracking-wide-md text-white"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)',
            }}
          >
            Take the Quiz →
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Your Peptide Protocol — Peptide Station</title>
        <meta
          name="description"
          content="Your personalised peptide protocol, matched to your health goals and profile."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-canvas">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-18px text-ink hover:text-brand transition-colors duration-150"
            >
              Peptide Station
            </Link>
            <Link
              href="/quiz"
              className="text-12px font-body text-muted hover:text-ink transition-colors duration-150"
            >
              Retake quiz
            </Link>
          </div>
          {/* Full progress bar */}
          <div className="w-full h-1 bg-brand" />
        </header>

        <main className="max-w-xl mx-auto px-6 py-8">
          {/* Hero heading */}
          <div className="mb-8 animate-fade-in-up">
            <span className="badge-trust mb-4 inline-block">Your personalised protocol</span>
            <h1 className="text-36px font-display text-ink leading-tight">
              {primary.headline}
            </h1>
            <p className="text-16px font-body text-muted italic mt-2">{primary.tagline}</p>
          </div>

          {/* Primary recommendation */}
          <div className="mb-6 animate-fade-in-up animate-delay-1">
            <RecommendationCard
              rec={primary}
              variant="primary"
              onCta={() => {
                // Navigate to product page — slug TBD when products are set up
                window.location.href = '/products';
              }}
            />
          </div>

          {/* Secondary recommendation */}
          {secondary && (
            <div className="mb-8 animate-fade-in-up animate-delay-2">
              <RecommendationCard
                rec={secondary}
                variant="secondary"
                onCta={() => {
                  window.location.href = '/products';
                }}
              />
            </div>
          )}

          {/* Science note */}
          <div className="bg-white border border-gray-300 rounded-xl px-5 py-4 mb-8 animate-fade-in-up animate-delay-3">
            <h3 className="text-14px font-body font-semibold text-ink mb-2">
              A note on personalisation
            </h3>
            <p className="text-13px font-body text-muted leading-relaxed">
              This recommendation is based on your quiz answers and the published research
              literature on each peptide. It is not medical advice. For a clinical protocol
              tailored to your bloodwork and health history, speak with a qualified healthcare
              provider.
            </p>
          </div>

          {/* Retake CTA */}
          <div className="text-center animate-fade-in-up animate-delay-4">
            <Link
              href="/quiz"
              className="text-14px font-body text-muted underline hover:text-ink transition-colors duration-150"
            >
              Retake the quiz with different goals
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default QuizResultsPage;
