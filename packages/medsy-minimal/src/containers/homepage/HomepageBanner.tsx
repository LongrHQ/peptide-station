import Link from 'next/link';

export default function HomepageBanner() {
  return (
    <section
      style={{
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingTop: '48px',
        paddingBottom: '48px',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          minHeight: '420px',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'url(/images/hero-skin.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.30) 55%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            paddingLeft: '64px',
            paddingRight: '64px',
            paddingTop: '72px',
            paddingBottom: '72px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.50)',
              marginBottom: '20px',
            }}
          >
            Clinically-backed benefits
          </p>
          <h2
            className="font-body"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '32px',
              maxWidth: '520px',
            }}
          >
            Science-Backed
            <br />
            Longevity Protocols
          </h2>
          <Link
            href="/learn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.40)',
              borderRadius: '9999px',
              padding: '13px 28px',
              backdropFilter: 'blur(6px)',
              backgroundColor: 'rgba(255,255,255,0.10)',
              transition: 'background-color 200ms ease',
            }}
          >
            Learn the science →
          </Link>
        </div>
      </div>
    </section>
  );
}
