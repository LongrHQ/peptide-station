import React from 'react';
import clsx from 'clsx';

type Option = {
  label: string;
  subtext?: string;
};

type Props = {
  options: Option[];
  selected: string;
  onSelect: (label: string) => void;
};

export function ScaleCard({ options, selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt, i) => {
        const isSelected = selected === opt.label;
        // Visual gradient: top option is "best" (lighter), bottom is "worst" (more prominent)
        const opacity = 0.6 + (i / (options.length - 1)) * 0.4;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onSelect(opt.label)}
            className={clsx(
              'w-full text-left px-4 py-3.5 border-2 rounded-xl transition-all duration-200 flex items-start gap-3',
              isSelected
                ? 'border-brand bg-accent-light -translate-y-0.5 shadow-lift'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:-translate-y-px hover:shadow-product-item'
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            {/* Scale dot indicator */}
            <span
              className={clsx(
                'w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-colors duration-150',
                isSelected ? 'bg-brand' : 'bg-gray-300'
              )}
              style={{ opacity: isSelected ? 1 : opacity }}
              aria-hidden="true"
            />
            <span className="flex flex-col min-w-0">
              <span className="font-body font-medium text-14px leading-tight text-ink">
                {opt.label}
              </span>
              {opt.subtext && (
                <span className="font-body text-12px text-muted leading-snug mt-0.5">
                  {opt.subtext}
                </span>
              )}
            </span>
            {isSelected && (
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
      })}
    </div>
  );
}
