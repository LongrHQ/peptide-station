import React from 'react';
import { useQuiz } from 'contexts/quiz/use-quiz';

export function WelcomeScreen() {
  const { startQuiz } = useQuiz();

  return (
    <div className="flex flex-col flex-1 px-6 pt-10 pb-8 max-w-xl mx-auto w-full animate-fade-in-up">
      {/* Trust badge */}
      <div className="mb-6">
        <span className="badge-trust">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Your answers are private
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-40px font-display text-ink leading-tight mb-4">
        Find Your <em>Peptide Protocol</em>
      </h1>

      {/* Sub-headline */}
      <p className="text-16px font-body text-muted leading-relaxed mb-8">
        Answer 8 quick questions. Get personalised peptide recommendations backed by real science.
      </p>

      {/* Supporting copy */}
      <div className="flex flex-col gap-3 mb-10 animate-delay-2 animate-fade-in-up">
        {[
          { icon: '⏱️', text: 'Takes under 3 minutes' },
          { icon: '🔬', text: 'Recommendations backed by published research' },
          { icon: '🔒', text: 'HIPAA-compliant data handling' },
          { icon: '👥', text: '3,000+ protocols matched' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <span className="text-lg" aria-hidden="true">{icon}</span>
            <span className="text-14px font-body text-gray-700">{text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto animate-delay-3 animate-fade-in-up">
        <button
          type="button"
          onClick={startQuiz}
          className="w-full py-4 px-8 rounded-full font-body font-semibold text-14px uppercase tracking-wide-md text-white transition-all duration-200 active:scale-[0.98]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%), linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)',
            boxShadow: '0 2px 8px rgba(192,57,43,0.25), 0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          Start My Assessment →
        </button>

        <p className="text-center text-12px text-muted mt-3">
          Used by athletes, biohackers, and longevity-focused professionals.
        </p>
      </div>
    </div>
  );
}
