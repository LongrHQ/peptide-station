import React from 'react';
import type { RecommendationTemplate } from 'lib/quiz/recommendations';

type Props = {
  rec: RecommendationTemplate;
  variant?: 'primary' | 'secondary';
  onCta?: () => void;
};

export function RecommendationCard({ rec, variant = 'primary', onCta }: Props) {
  const isPrimary = variant === 'primary';

  return (
    <div
      className={`rounded-2xl border-2 p-6 ${
        isPrimary ? 'border-brand bg-white shadow-lift-lg' : 'border-gray-300 bg-white shadow-lift'
      }`}
    >
      {isPrimary && (
        <span className="badge-trust mb-4 inline-block">Primary recommendation</span>
      )}
      {!isPrimary && (
        <span className="inline-block mb-3 text-11px font-body font-semibold uppercase tracking-wide-md text-muted">
          Also recommended
        </span>
      )}

      <h3 className="text-21px font-display text-ink leading-tight mb-1">{rec.headline}</h3>
      <p className="text-14px font-body text-muted italic mb-4">{rec.tagline}</p>
      <p className="text-14px font-body text-gray-700 leading-relaxed mb-4">{rec.body}</p>

      {/* Hook fact */}
      <div className="bg-canvas rounded-xl px-4 py-3 mb-4 border border-gray-300">
        <p className="text-13px font-body text-gray-700 leading-relaxed">
          <span className="font-semibold text-ink">Did you know? </span>
          {rec.hookFact}
        </p>
      </div>

      {onCta && (
        <button
          type="button"
          onClick={onCta}
          className="w-full py-3.5 px-6 rounded-full font-body font-semibold text-14px uppercase tracking-wide-md text-white transition-all duration-200 active:scale-[0.98]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%), linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)',
            boxShadow: '0 2px 8px rgba(192,57,43,0.25), 0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {rec.cta} →
        </button>
      )}
    </div>
  );
}
