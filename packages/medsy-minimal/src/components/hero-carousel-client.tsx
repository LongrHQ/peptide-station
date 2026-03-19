'use client';
import React, { useState } from 'react';
import MultiCarousel from 'react-multi-carousel';

import ChevronLeft from 'assets/icons/chevron-left';
import ChevronRight from 'assets/icons/chevron-right';

type CustomButtonProp = {
  onClick?: (e: any) => void;
  children: React.ReactNode;
};

type ButtonGroupProps = {
  next?: Function;
  previous?: Function;
};

interface CarouselItemProps {
  background?: string;
  theme?: 'dark' | 'light';
  children: React.ReactNode | undefined;
}

export type CarouselProps = {
  data: CarouselItemProps[];
  autoPlay?: boolean;
  infinite?: boolean;
  itemClass?: string;
  className?: string;
  containerClass?: string;
};

const AUTO_PLAY_SPEED = 5000; // ms per slide

const ArrowBtn: React.FC<CustomButtonProp & { dir: 'prev' | 'next' }> = ({ onClick, children, dir }) => (
  <button
    onClick={(e) => { e.preventDefault(); onClick(e); }}
    aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
    style={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [dir === 'prev' ? 'left' : 'right']: '28px',
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff',
      backdropFilter: 'blur(8px)',
      transition: 'background-color 200ms ease',
      zIndex: 10,
    }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
  >
    {children}
  </button>
);

const ButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous }) => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
    <div style={{ pointerEvents: 'all' }}>
      <ArrowBtn onClick={() => previous()} dir="prev">
        <ChevronLeft height="14px" />
      </ArrowBtn>
      <ArrowBtn onClick={() => next()} dir="next">
        <ChevronRight height="14px" />
      </ArrowBtn>
    </div>
  </div>
);

// Progress-bar dot indicators
const ProgressDots: React.FC<{ total: number; current: number; autoPlay: boolean }> = ({
  total,
  current,
  autoPlay,
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: '28px',
      left: '112px',
      display: 'flex',
      gap: '10px',
      zIndex: 20,
    }}
  >
    {Array.from({ length: total }).map((_, i) => {
      const isActive = i === current;
      return (
        <div
          key={i}
          style={{
            width: '36px',
            height: '3px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,255,255,0.25)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Fill bar */}
          <div
            key={isActive ? `active-${i}` : `idle-${i}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              width: isActive ? '100%' : i < current ? '100%' : '0%',
              transition: isActive && autoPlay
                ? `width ${AUTO_PLAY_SPEED}ms linear`
                : 'width 200ms ease',
            }}
          />
        </div>
      );
    })}
  </div>
);

const responsive = {
  desktop: { breakpoint: { max: 3600, min: 0 }, items: 1 },
};

const HeroCarouselClient = ({
  data,
  autoPlay = true,
  infinite = true,
  itemClass,
  className = '',
  containerClass,
  ...props
}: CarouselProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div style={{ position: 'relative' }}>
      <MultiCarousel
        arrows={false}
        responsive={responsive}
        ssr={false}
        showDots={false}
        slidesToSlide={1}
        infinite={infinite}
        containerClass={containerClass}
        itemClass={itemClass}
        autoPlay={autoPlay}
        autoPlaySpeed={AUTO_PLAY_SPEED}
        renderButtonGroupOutside={true}
        additionalTransfrom={0}
        customButtonGroup={<ButtonGroup />}
        className={className}
        afterChange={(_, { currentSlide: s }) => setCurrentSlide(s % data.length)}
        {...props}
      >
        {data.map((item, index) => {
          const isDark = item.theme !== 'light';
          return (
            <div
              key={index}
              className="hero-carousel-item-base"
              style={{
                backgroundImage: item.background ? `url(${item.background})` : undefined,
                backgroundColor: isDark ? '#1a1a1a' : 'var(--ps-surface-alt)',
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                minHeight: '580px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Dark overlay for readability */}
              {isDark && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              {/* Content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  paddingLeft: '112px',
                  paddingRight: '56px',
                  paddingTop: '72px',
                  paddingBottom: '96px', // extra space for dots
                }}
              >
                {item.children}
              </div>
            </div>
          );
        })}
      </MultiCarousel>

      {/* Progress dots — rendered outside carousel so they don't clip */}
      <ProgressDots
        total={data.length}
        current={currentSlide}
        autoPlay={autoPlay}
      />
    </div>
  );
};

export default HeroCarouselClient;
