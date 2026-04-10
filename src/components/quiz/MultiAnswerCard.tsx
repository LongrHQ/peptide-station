import React from 'react';
import clsx from 'clsx';

type Option = {
  icon?: string;
  label: string;
};

type Props = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  skipLabel?: string;
  onSkip?: () => void;
};

export function MultiAnswerCard({ options, selected, onChange, skipLabel, onSkip }: Props) {
  const toggle = (label: string) => {
    if (selected.includes(label)) {
      onChange(selected.filter((s) => s !== label));
    } else {
      onChange([...selected, label]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.label);
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => toggle(opt.label)}
            className={clsx(
              'w-full text-left px-4 py-3 border-2 rounded-xl transition-all duration-200 flex items-center gap-3',
              isSelected
                ? 'border-brand bg-accent-light'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-product-item'
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            {opt.icon && (
              <span className="text-xl flex-shrink-0 leading-none" aria-hidden="true">
                {opt.icon}
              </span>
            )}
            <span className="font-body font-medium text-14px text-ink leading-tight flex-1">
              {opt.label}
            </span>
            <span
              className={clsx(
                'w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors duration-150',
                isSelected ? 'border-brand bg-brand' : 'border-gray-300 bg-white'
              )}
            >
              {isSelected && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          </button>
        );
      })}

      {skipLabel && onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="mt-1 text-muted text-14px font-body underline text-left self-start hover:text-ink transition-colors duration-150"
        >
          {skipLabel}
        </button>
      )}
    </div>
  );
}
