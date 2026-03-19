import React from 'react';
import Link from 'next/link';
import Button from 'components/button';
import ArrowRight from 'assets/icons/arrow-right';

interface SlideProps {
  badge?: string;
  heading: string;
  headingItalic?: string;
  subheading: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  theme?: 'dark' | 'light';
}

const SliderComponent: React.FC<SlideProps> = ({
  badge,
  heading,
  headingItalic,
  subheading,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full lg:w-6/12 flex flex-col items-start text-left">
      {badge && (
        <span
          className="inline-flex items-center mb-6 animate-fade-in-up animate-delay-1"
          style={{
            fontSize: '11px',
            fontFamily: 'var(--ps-font-body)',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--ps-muted)',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.20)' : 'var(--ps-border)'}`,
            paddingBottom: '8px',
          }}
        >
          {badge}
        </span>
      )}

      <h1
        className="font-body font-bold mb-6 animate-fade-in-up animate-delay-2"
        style={{
          fontSize: 'clamp(32px, 5.5vw, 76px)',
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
          color: isDark ? '#FFFFFF' : 'var(--ps-ink)',
        }}
      >
        {heading}
        {headingItalic && (
          <>
            <br />
            <span style={{ color: 'var(--ps-brand)' }}>
              {headingItalic}
            </span>
          </>
        )}
      </h1>

      <p
        className="mb-10 animate-fade-in-up animate-delay-3"
        style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          lineHeight: 1.65,
          maxWidth: '460px',
          color: isDark ? 'rgba(255,255,255,0.65)' : 'var(--ps-muted)',
        }}
      >
        {subheading}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-4">
        <Link href={ctaPrimaryHref}>
          <Button variant="elevation" size="big">
            <span className="mr-2">{ctaPrimaryLabel}</span>
            <ArrowRight width="13px" />
          </Button>
        </Link>

        {ctaSecondaryLabel && ctaSecondaryHref && (
          <Link
            href={ctaSecondaryHref}
            className="inline-flex items-center justify-center h-12 px-30px font-body font-medium rounded-pill transition duration-200"
            style={{
              fontSize: '15px',
              color: isDark ? 'rgba(255,255,255,0.85)' : 'var(--ps-ink)',
              border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.30)' : 'var(--ps-ink)'}`,
            }}
          >
            {ctaSecondaryLabel}
          </Link>
        )}
      </div>

      <p
        className="mt-8 animate-fade-in-up animate-delay-4"
        style={{
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: isDark ? 'rgba(255,255,255,0.28)' : 'var(--ps-muted)',
        }}
      >
        Research use only · US lab tested · Free shipping $100+
      </p>
    </div>
  );
};

export default SliderComponent;
