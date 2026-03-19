import React from 'react';
import Carousel from 'components/hero-carousel';
import SliderComponent from './slider-component';

export default function HeroBlock() {
  const data = [
    {
      id: 1,
      // Dark gradient mesh — Recovery / Athlete hero
      background: '/images/hero-recovery.png',
      theme: 'dark' as const,
      children: (
        <SliderComponent
          badge="The #1 Recovery Protocol"
          heading="Recover Faster."
          headingItalic="Come Back Stronger."
          subheading="BPC-157 and TB-500 — the two most-researched recovery peptides, pre-mixed and ready in a precision pen. No syringes. No guesswork."
          ctaPrimaryLabel="Shop Recovery Stack"
          ctaPrimaryHref="/?category=recovery"
          ctaSecondaryLabel="How it works"
          ctaSecondaryHref="/learn"
          theme="dark"
        />
      ),
    },
    {
      id: 2,
      // Light warm background — Skin / Anti-aging hero
      background: '/images/hero-skin.jpg',
      theme: 'light' as const,
      children: (
        <SliderComponent
          badge="Explosive Growth · 110K Searches/Month"
          heading="Your Skin Has a New"
          headingItalic="Favourite Peptide."
          subheading="GHK-Cu — the copper peptide behind the biggest glow-up in biohacking. Backed by research. Delivered by pen. Built for you."
          ctaPrimaryLabel="Shop GHK-Cu Pen"
          ctaPrimaryHref="/?category=skin-hair"
          ctaSecondaryLabel="What is GHK-Cu?"
          ctaSecondaryHref="/learn"
          theme="light"
        />
      ),
    },
    {
      id: 3,
      // Dark — Brand / Entry hero
      background: '/images/hero-brand.jpg',
      theme: 'dark' as const,
      children: (
        <SliderComponent
          badge="Pen-First · US Third-Party Tested"
          heading="Peptide Therapy."
          headingItalic="Finally Done Right."
          subheading="Pre-mixed. Pen-delivered. Third-party tested. Everything you need to start your protocol — in one beautifully simple kit."
          ctaPrimaryLabel="Shop Starter Kit"
          ctaPrimaryHref="/?category=kits-accessories"
          ctaSecondaryLabel="Browse all peptides"
          ctaSecondaryHref="/"
          theme="dark"
        />
      ),
    },
  ];

  return (
    /* Outer container — matches product grid 48px padding, adds top gap + bottom gap */
    <div
      style={{
        paddingLeft: 'clamp(16px, 5vw, 48px)',
        paddingRight: 'clamp(16px, 5vw, 48px)',
        paddingTop: '24px',
        paddingBottom: '0px',
      }}
    >
      {/* Inner card — rounded corners, border matching product grid */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid var(--ps-border)',
          overflow: 'hidden',
          minHeight: '560px',
          position: 'relative',
        }}
      >
        <Carousel data={data} />
      </div>
    </div>
  );
}
