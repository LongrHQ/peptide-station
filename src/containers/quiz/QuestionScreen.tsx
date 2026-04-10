import React, { useState, useEffect } from 'react';
import { useQuiz } from 'contexts/quiz/use-quiz';
import { AnswerCard } from 'components/quiz/AnswerCard';
import { MultiAnswerCard } from 'components/quiz/MultiAnswerCard';
import { ScaleCard } from 'components/quiz/ScaleCard';
import type { QuestionType } from 'lib/quiz/questions';
import { QUESTIONS } from 'lib/quiz/questions';

export function QuestionScreen() {
  const { questionIndex, answers, answer, next, back } = useQuiz();
  const question: QuestionType | undefined = QUESTIONS[questionIndex];

  // Local value — initialise from saved answers
  const savedValue = question ? answers[question.id] : undefined;
  const [localValue, setLocalValue] = useState<string | string[]>(
    savedValue ?? (question?.type === 'multi' ? [] : '')
  );

  // Sync when question changes (e.g. back navigation)
  useEffect(() => {
    if (!question) return;
    const saved = answers[question.id];
    setLocalValue(saved ?? (question.type === 'multi' ? [] : ''));
  }, [question?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!question) return null;

  const isAnswered =
    question.type === 'multi'
      ? (localValue as string[]).length > 0
      : (localValue as string) !== '';

  const handleSingleSelect = (label: string) => {
    setLocalValue(label);
    answer(question.id, label);
    // Auto-advance on single/scale select after brief delay for UX feedback
    setTimeout(() => next(), 200);
  };

  const handleMultiChange = (selected: string[]) => {
    setLocalValue(selected);
    answer(question.id, selected);
  };

  const handleSkip = () => {
    setLocalValue([]);
    answer(question.id, []);
    next();
  };

  const handleContinue = () => {
    next();
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
        {/* Progress label */}
        <p className="text-12px font-body text-muted uppercase tracking-wide-md mb-4">
          {question.progress} of {QUESTIONS.length}
        </p>

        {/* Question text */}
        <h2 className="text-24px font-display text-ink leading-tight mb-2 animate-fade-in-up">
          {question.text}
        </h2>

        {question.subtext && (
          <p className="text-13px font-body text-muted mb-4 animate-fade-in-up animate-delay-1">
            {question.subtext}
          </p>
        )}

        {/* Answer inputs */}
        <div className="mt-5 animate-fade-in-up animate-delay-2">
          {question.type === 'single' && (
            <div className="flex flex-col gap-2">
              {question.options.map((opt) => (
                <AnswerCard
                  key={opt.label}
                  icon={opt.icon}
                  label={opt.label}
                  subtext={opt.subtext}
                  selected={localValue === opt.label}
                  onClick={() => handleSingleSelect(opt.label)}
                />
              ))}
            </div>
          )}

          {question.type === 'scale' && (
            <ScaleCard
              options={question.options}
              selected={localValue as string}
              onSelect={handleSingleSelect}
            />
          )}

          {question.type === 'multi' && (
            <MultiAnswerCard
              options={question.options}
              selected={localValue as string[]}
              onChange={handleMultiChange}
              skipLabel={question.skipLabel}
              onSkip={handleSkip}
            />
          )}
        </div>
      </div>

      {/* Sticky footer — only visible for multi-select (single/scale auto-advance) */}
      {question.type === 'multi' && (
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
              onClick={handleContinue}
              disabled={!isAnswered}
              className="flex-1 py-3.5 px-6 rounded-full font-body font-semibold text-14px uppercase tracking-wide-md text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed"
              style={{
                backgroundImage: isAnswered
                  ? 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%), linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)'
                  : undefined,
                backgroundColor: isAnswered ? undefined : '#9ca3af',
                boxShadow: isAnswered
                  ? '0 2px 8px rgba(192,57,43,0.25), 0 1px 3px rgba(0,0,0,0.1)'
                  : 'none',
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Back button for single/scale (no sticky footer needed) */}
      {question.type !== 'multi' && (
        <div
          className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <div className="max-w-xl mx-auto w-full">
            <button
              type="button"
              onClick={back}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-[0.96]"
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
          </div>
        </div>
      )}
    </div>
  );
}
