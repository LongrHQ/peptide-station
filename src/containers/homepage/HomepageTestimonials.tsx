const ticker = [
  '"Pain relief without injections." — Rachel M.',
  '"Finally, peptides made simple." — Daniel F.',
  '"Surprisingly great results." — Natalie S.',
  '"Perfect for life on the go." — Chris H.',
  '"I never miss a dose." — Austin K.',
  '"Noticeable results, fast." — Jennifer L.',
  '"This changed everything." — Marcus T.',
  '"Modern wellness done right." — Sophia R.',
];

const reviews = [
  { quote: '"Pain relief without injections. Game changer."', name: 'Rachel M.', tag: 'BPC-157 Pen', stars: 5 },
  { quote: '"Finally, peptides made simple. I\'ve tried the old way — this is miles better."', name: 'Daniel F.', tag: 'Starter Kit', stars: 5 },
  { quote: '"Surprisingly great results. Noticeable within two weeks."', name: 'Natalie S.', tag: 'GHK-Cu Pen', stars: 5 },
  { quote: '"Perfect for life on the go — no mixing, no mess, no fridge."', name: 'Chris H.', tag: 'Sermorelin Pen', stars: 5 },
  { quote: '"I never miss a dose now. The pen makes it effortless."', name: 'Austin K.', tag: 'Recovery Stack', stars: 5 },
  { quote: '"Noticeable results, fast. I\'ve been recommending this to everyone."', name: 'Jennifer L.', tag: 'TB-500 Pen', stars: 5 },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--ps-brand)', fontSize: '14px' }}>★</span>
      ))}
    </div>
  );
}

export default function HomepageTestimonials() {
  return (
    <section style={{ backgroundColor: 'var(--ps-canvas)' }}>
      {/* ── Scrolling ticker ────────────────────────────────── */}
      <div
        style={{
          borderTop: '1px solid var(--ps-border)',
          borderBottom: '1px solid var(--ps-border)',
          backgroundColor: 'var(--ps-surface-alt)',
          overflow: 'hidden',
          padding: '14px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '64px',
            animation: 'ticker-scroll 32s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: '13px',
                color: 'var(--ps-muted)',
                fontStyle: 'italic',
                flexShrink: 0,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Review grid ─────────────────────────────────────── */}
      <div
        style={{
          paddingLeft: 'clamp(16px, 5vw, 48px)',
          paddingRight: 'clamp(16px, 5vw, 48px)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              style={{
                backgroundColor: 'var(--ps-surface)',
                border: '1px solid var(--ps-border)',
                borderRadius: '12px',
                padding: '28px 28px 24px',
              }}
            >
              <Stars count={r.stars} />
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: 'var(--ps-ink)',
                  marginBottom: '20px',
                  fontStyle: 'italic',
                }}
              >
                {r.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--ps-surface-alt)',
                    border: '1px solid var(--ps-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--ps-ink)',
                  }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ps-ink)', margin: 0 }}>{r.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--ps-muted)', margin: 0 }}>{r.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
