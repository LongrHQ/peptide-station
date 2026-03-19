import { Pen, Target, Microscope, ShieldOff } from 'lucide-react';

const features = [
  {
    Icon: Pen,
    title: 'Pen-First Delivery',
    desc: 'Pre-mixed, auto-injector pens remove the friction of traditional peptide administration — no vials, no syringes.',
  },
  {
    Icon: Target,
    title: 'Precision Dosed',
    desc: 'Each pen delivers an exact, pre-measured dose every time. Consistent dosing means consistent results.',
  },
  {
    Icon: Microscope,
    title: 'US Third-Party Tested',
    desc: 'Every batch is tested at a US-accredited lab. Published COAs, HPLC purity ≥99%, endotoxin screened.',
  },
  {
    Icon: ShieldOff,
    title: 'Needle-Free Option',
    desc: 'Our pen-format is the most accessible peptide delivery method — minimal needle exposure, maximum confidence.',
  },
];

export default function HomepageFeatures() {
  return (
    <section
      style={{
        backgroundColor: 'var(--ps-surface-alt)',
        borderTop: '1px solid var(--ps-border)',
        borderBottom: '1px solid var(--ps-border)',
        paddingLeft: 'clamp(16px, 5vw, 48px)',
        paddingRight: 'clamp(16px, 5vw, 48px)',
        paddingTop: '64px',
        paddingBottom: '64px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
        }}
      >
        {features.map(({ Icon, title, desc }) => (
          <div key={title}>
            {/* Icon + red rule row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <Icon size={28} color="var(--ps-brand)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <div
                style={{
                  flex: 1,
                  height: '1.5px',
                  backgroundColor: 'var(--ps-brand)',
                  opacity: 0.25,
                }}
              />
            </div>

            <h3
              className="font-body"
              style={{
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--ps-ink)',
                marginBottom: '10px',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--ps-muted)',
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
