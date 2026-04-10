import React from 'react';
import clsx from 'clsx';

type Props = {
  icon?: string;
  label: string;
  subtext?: string;
  selected: boolean;
  onClick: () => void;
};

export function AnswerCard({ icon, label, subtext, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-full text-left px-4 py-3 border-2 rounded-xl transition-all duration-200 flex items-center gap-3',
        selected
          ? 'border-brand bg-accent-light -translate-y-0.5 shadow-lift'
          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:-translate-y-px hover:shadow-product-item'
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
    >
      {icon && (
        <span className="text-2xl flex-shrink-0 leading-none" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex flex-col min-w-0">
        <span className="font-body font-medium text-14px leading-tight text-ink">
          {label}
        </span>
        {subtext && (
          <span className="font-body text-12px text-muted leading-snug mt-0.5">
            {subtext}
          </span>
        )}
      </span>
      {selected && (
        <span className="ml-auto flex-shrink-0">
          <svg
            className="w-5 h-5 text-brand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
