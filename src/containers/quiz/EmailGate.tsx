import React, { useState } from 'react';
import { useQuiz } from 'contexts/quiz/use-quiz';
import { useRouter } from 'next/router';

export function EmailGate() {
  const { answers, results, submitEmail, showResults } = useQuiz();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Placeholder fetch — will be wired to Firebase/MongoDB/n8n
      await fetch('/api/quiz/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim() || undefined,
          answers,
          scores: results?.scores ?? {},
          topPeptide: results?.primary ?? null,
        }),
      });
    } catch {
      // Silently continue — not blocking UX on placeholder API
    }

    submitEmail(email.trim().toLowerCase(), firstName.trim() || undefined);
    // Persist results to sessionStorage so the results page can read them
    if (results) {
      try {
        sessionStorage.setItem('ps_quiz_results', JSON.stringify(results));
      } catch {
        // Ignore storage errors (private browsing, quota exceeded)
      }
    }
    showResults();
    router.push('/quiz/results');
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-10 pb-8 max-w-xl mx-auto w-full">
      {/* Headline */}
      <h2 className="text-30px font-display text-ink leading-tight mb-3 animate-fade-in-up">
        Your personalised peptide <em>protocol is waiting.</em>
      </h2>

      {/* Value proposition */}
      <div className="bg-canvas border border-gray-300 rounded-xl px-5 py-4 mb-6 animate-fade-in-up animate-delay-1">
        <p className="text-14px font-body text-gray-700 leading-relaxed mb-3">
          Enter your email to receive:
        </p>
        <ul className="space-y-1.5">
          {[
            'Your personalised peptide match (with the science behind why)',
            'A full protocol guide — dosing, timing, what to expect',
            'A $15 first-order discount code',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-brand font-bold text-14px leading-tight mt-0.5">✦</span>
              <span className="text-14px font-body text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-12px text-muted mt-3 font-body">
          We&apos;ll never spam you. One email, your results, done.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="animate-fade-in-up animate-delay-2">
        {/* First name (optional) */}
        <div className="mb-3">
          <label
            htmlFor="quiz-firstname"
            className="block text-13px font-body font-medium text-ink mb-1.5"
          >
            First name <span className="text-muted font-normal">(optional)</span>
          </label>
          <input
            id="quiz-firstname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            autoComplete="given-name"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-body text-14px text-ink placeholder-muted focus:border-brand focus:outline-none transition-colors duration-150 bg-white"
          />
        </div>

        {/* Email (required) */}
        <div className="mb-4">
          <label
            htmlFor="quiz-email"
            className="block text-13px font-body font-medium text-ink mb-1.5"
          >
            Email address <span className="text-brand">*</span>
          </label>
          <input
            id="quiz-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-body text-14px text-ink placeholder-muted focus:border-brand focus:outline-none transition-colors duration-150 bg-white"
          />
          {error && (
            <p className="mt-1.5 text-12px text-error font-body">{error}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-8 rounded-full font-body font-semibold text-14px uppercase tracking-wide-md text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            backgroundImage: loading
              ? undefined
              : 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%), linear-gradient(135deg, #e0453c 0%, #C0392B 50%, #992D22 100%)',
            backgroundColor: loading ? '#9ca3af' : undefined,
            boxShadow: loading
              ? 'none'
              : '0 2px 8px rgba(192,57,43,0.25), 0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {loading ? 'Sending…' : 'Send Me My Results →'}
        </button>
      </form>

      {/* Trust line */}
      <div className="flex items-center justify-center gap-4 mt-4 animate-fade-in-up animate-delay-3">
        <span className="flex items-center gap-1.5 text-12px text-muted font-body">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          No spam. Unsubscribe anytime.
        </span>
        <span className="text-gray-300">|</span>
        <span className="text-12px text-muted font-body">Used by 3,000+ protocol-seekers</span>
      </div>

      <p className="text-center text-11px text-muted mt-3 font-body">
        By continuing you agree to our{' '}
        <a href="/privacy" className="underline hover:text-ink transition-colors duration-150">
          Privacy Policy
        </a>
        . We handle your data with care.
      </p>
    </div>
  );
}
