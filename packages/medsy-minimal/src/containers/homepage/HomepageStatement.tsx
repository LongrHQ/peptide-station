import Link from 'next/link';
import Image from 'next/image';

export default function HomepageStatement() {
  return (
    <section
      style={{
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: 'var(--ps-canvas)',
        display: 'flex',
        alignItems: 'center',
        gap: '80px',
      }}
    >
      {/* ── Left — editorial text ── */}
      <div style={{ flex: '1 1 0', minWidth: 0 }}>
        {/* Eyebrow */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ps-muted)',
            marginBottom: '28px',
          }}
        >
          The next generation of peptide delivery
        </p>

        {/* Big statement */}
        <h2
          className="font-body"
          style={{
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: 'var(--ps-ink)',
            marginBottom: '48px',
          }}
        >
          Peptide Station is the next
          generation of peptide therapy:{' '}
          <span style={{ color: 'var(--ps-brand)' }}>science-backed</span>,
          precision-dosed, and delivery-optimised.
        </h2>

        {/* CTA pill */}
        <Link
          href="/learn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--ps-ink)',
            border: '1.5px solid var(--ps-ink)',
            borderRadius: '9999px',
            padding: '12px 28px',
            transition: 'all 200ms ease',
            whiteSpace: 'nowrap',
          }}
        >
          Discover our science →
        </Link>
      </div>

      {/* ── Right — pen mechanism diagram ── */}
      <div
        style={{
          flex: '0 0 480px',
          width: '480px',
          aspectRatio: '1 / 1',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: 'var(--ps-surface-alt)',
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/pen-diagram.png"
          alt="Peptide pen diagram — twist to select dose, dose window, ultra-fine needle, pre-mixed cartridge"
          fill
          className="object-cover"
          sizes="480px"
        />
      </div>
    </section>
  );
}
