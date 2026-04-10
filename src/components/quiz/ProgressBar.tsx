import React from 'react';

type Props = {
  progress: number; // 0–100
};

export function ProgressBar({ progress }: Props) {
  return (
    <div className="w-full bg-gray-200 h-1">
      <div
        className="h-1 bg-brand transition-all duration-500"
        style={{
          width: `${Math.min(100, Math.max(0, progress))}%`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
