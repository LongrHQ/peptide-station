import React from 'react';
import { useQuiz } from 'contexts/quiz/use-quiz';
import { getTeaserLine, countRecommendations } from 'lib/quiz/recommendations';

export function ResultsTeaser() {
  const { results, showGate } = useQuiz();

  if (!results) return null;

  const teaserLine = getTeaserLine(results.primary);
  const recCount = countRecommendations(results.ranked, results.scores);

  return (
    <div className="flex flex-col flex-1 px-6 pt-10 pb-8 max-w-xl mx-auto w-full">
      {/* Badge */}
      <div className="mb-6 animate-fade-in">
        <span className="badge-trust">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Analysis complete
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-36px font-display text-ink leading-tight mb-3 animate-fade-in-up">
        Your results are <em>ready.</em>
      </h2>

      {/* Count line */}
      <p className="text-16px font-body text-gray-700 mb-6 animate-fade-in-up animate-delay-1">
        Based on your answers, we&apos;ve identified{' '}
        <strong>{recCount} peptide{recCount !== 1 ? 's' : ''}</strong> that match your profile.
      </p>

      {/* Teaser card */}
      <div className="bg-white border-2 border-brand rounded-2xl px-5 py-4 mb-8 animate-fade-in-up animate-delay-2">
        <p className="text-14px font-body text-gray-700 leading-relaxed">
          <span className="text-brand font-semibold">Your match: </span>
          {teaserLine}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto animate-fade-in-up animate-delay-3">
        <button
          type="button"
          onClick={showGate}
          className="w-full py-4 px-8 rounded-full font-body font-semibold text-14px uppercase tracking-wide-md text-white transition-all duration-200 active:scale-[0.98]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%), linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)',
            boxShadow: '0 2px 8px rgba(192,57,43,0.25), 0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          Unlock My Results →
        </button>

        <button
          type="button"
          onClick={showGate}
          className="block w-full text-center text-12px text-muted mt-3 hover:text-ink transition-colors duration-150 underline"
        >
          Skip to general recommendations
        </button>
      </div>
    </div>
  );
}
