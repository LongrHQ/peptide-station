const rows = [
  { label: 'Onset speed',           ps: 'Fast',                    vial: 'Moderate',      capsule: 'Slow',          powder: 'Slow' },
  { label: 'Absorption',            ps: 'High, consistent',        vial: 'Moderate',      capsule: 'Lower',         powder: 'Lower' },
  { label: 'Dose accuracy',         ps: 'Pre-measured every time', vial: 'Can vary',      capsule: 'Approximate',   powder: 'Often inconsistent' },
  { label: 'Daily consistency',     ps: 'Same experience every use',vial: 'Requires liquid',capsule: 'Needs water',  powder: 'Mixing required' },
  { label: 'Lifestyle fit',         ps: 'No water · no fridge · pocket-size', vial: 'Requires liquid', capsule: 'Tamperless', powder: 'Often unpleasant' },
  { label: 'Shelf life',            ps: '30–60 days refrigerated', vial: 'Bulk bottles',  capsule: 'Portable',      powder: 'Less portable' },
];

const cols = ['Peptide Pen', 'Lyophilised Vial', 'Capsules', 'Powder'];

export default function HomepageComparison() {
  return (
    <section
      style={{
        paddingLeft: 'clamp(16px, 5vw, 48px)',
        paddingRight: 'clamp(16px, 5vw, 48px)',
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: 'var(--ps-canvas)',
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ps-muted)',
            marginBottom: '16px',
          }}
        >
          How we compare
        </p>
        <h2
          className="font-body"
          style={{
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--ps-ink)',
          }}
        >
          Not All Delivery Is Equal
        </h2>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            fontSize: '14px',
          }}
        >
          {/* Header */}
          <thead>
            <tr>
              <th
                style={{
                  width: 'clamp(100px, 20vw, 180px)',
                  textAlign: 'left',
                  paddingBottom: '16px',
                  color: 'var(--ps-muted)',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              />
              {cols.map((col, i) => (
                <th
                  key={col}
                  style={{
                    textAlign: 'center',
                    paddingBottom: '16px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: i === 0 ? '#ffffff' : 'var(--ps-ink)',
                  }}
                >
                  {i === 0 ? (
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--ps-brand)',
                        color: '#fff',
                        borderRadius: '9999px',
                        padding: '6px 18px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--ps-muted)', fontWeight: 500 }}>{col}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={row.label}
                style={{
                  backgroundColor: ri % 2 === 0 ? 'var(--ps-surface-alt)' : 'transparent',
                }}
              >
                {/* Row label */}
                <td
                  style={{
                    padding: '18px 16px',
                    color: 'var(--ps-muted)',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: ri % 2 === 0 ? '8px 0 0 8px' : '0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.label}
                </td>

                {/* Peptide Pen — highlighted */}
                <td
                  style={{
                    padding: '18px 16px',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--ps-ink)',
                    backgroundColor: 'rgba(192,57,43,0.06)',
                    borderLeft: '1px solid rgba(192,57,43,0.15)',
                    borderRight: '1px solid rgba(192,57,43,0.15)',
                  }}
                >
                  {row.ps}
                  {' '}
                  <span style={{ color: 'var(--ps-brand)', fontSize: '14px' }}>✓</span>
                </td>

                {/* Others */}
                {[row.vial, row.capsule, row.powder].map((val, vi) => (
                  <td
                    key={vi}
                    style={{
                      padding: '18px 16px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: 'var(--ps-muted)',
                      borderRadius:
                        ri % 2 === 0 && vi === 2 ? '0 8px 8px 0' : '0',
                    }}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
