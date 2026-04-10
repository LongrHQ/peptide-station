import React from 'react';
import { useQuiz } from 'contexts/quiz/use-quiz';

export function InterstitialScreen() {
  const { interstitial, advanceInterstitial, back } = useQuiz();

  if (!interstitial) return null;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
        <div className="max-w-xl mx-auto w-full">
          {/* Decorative rule */}
          <span className="rule-accent mb-6 block animate-fade-in" />

          {/* Headline */}
          <h2 className="text-28px font-display text-ink leading-tight mb-5 animate-fade-in-up">
            {interstitial.headline}
          </h2>

          {/* Body */}
          <p className="text-16px font-body text-gray-700 leading-relaxed animate-fade-in-up animate-delay-2">
            {interstitial.body}
          </p>
        </div>
      </div>

      {/* Sticky footer */}
      <div
        className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex gap-3 max-w-xl mx-auto w-full">
          {/* Back */}
          <button
            type="button"
            onClick={back}
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white transition-all duration-200 active:scale-[0.96]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)',
            }}
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Continue */}
          <button
            type="button"
            onClick={advanceInterstitial}
            className="flex-1 py-3.5 px-6 rounded-full font-body font-semibold text-14px uppercase tracking-wide-md text-white transition-all duration-200 active:scale-[0.98]"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%), linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)',
              boxShadow: '0 2px 8px rgba(192,57,43,0.25), 0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
