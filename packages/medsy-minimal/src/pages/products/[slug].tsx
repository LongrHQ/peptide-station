import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from 'containers/layout/layout';
import Button from 'components/button';
import { getProducts } from 'helpers/get-products';
import { CURRENCY } from 'helpers/constants';
import { useCart } from 'contexts/cart/cart.provider';
import Counter from 'components/counter';
import ArrowRight from 'assets/icons/arrow-right';

export default function ProductPage({ product }) {
  const { addItem, getItem, removeItem } = useCart();
  const count = getItem(product?.id)?.quantity;

  if (!product) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p style={{ color: 'var(--ps-muted)' }}>Product not found.</p>
        </div>
      </Layout>
    );
  }

  const benefits = product.benefits ? product.benefits.split('|') : [];
  const howToUse = product.how_to_use ? product.how_to_use.split('|') : [];
  const warnings = product.warnings ? product.warnings.split('|') : [];

  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content={product.meta_description || product.description} />
        <title>{product.meta_title || `${product.name} | Peptide Station`}</title>
      </Head>

      {/* ── Breadcrumb ── */}
      <div
        className="w-full px-4 lg:px-35px pt-6 pb-2"
        style={{ borderBottom: '1px solid var(--ps-border)' }}
      >
        <nav style={{ fontSize: '13px', color: 'var(--ps-muted)' }}>
          <Link href="/" className="hover:underline" style={{ color: 'var(--ps-muted)' }}>Shop</Link>
          <span className="mx-2">›</span>
          <span style={{ color: 'var(--ps-ink)' }}>{product.name}</span>
        </nav>
      </div>

      <div className="w-full px-4 lg:px-35px py-10 lg:py-16">
        {/* ── Hero section ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">

          {/* Product image */}
          <div
            className="w-full lg:w-5/12 flex-shrink-0 rounded-12px overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: 'var(--ps-surface-alt)', aspectRatio: '1 / 1', maxWidth: '520px' }}
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={520}
                height={520}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ minHeight: '400px', color: 'var(--ps-muted)', fontSize: '14px' }}
              >
                Image coming soon
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-center w-full">
            {/* Badge */}
            {product.badge && (
              <span className="badge-trust mb-4 self-start">{product.badge}</span>
            )}

            {/* Name + tagline */}
            <h1
              className="font-display font-normal mb-3"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ps-ink)' }}
            >
              {product.name}
            </h1>

            {product.tagline && (
              <p
                className="mb-6 font-display"
                style={{ fontSize: '18px', fontStyle: 'italic', color: 'var(--ps-brand-mid)', lineHeight: 1.4 }}
              >
                {product.tagline}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span
                className="font-mono font-medium"
                style={{ fontSize: '32px', color: 'var(--ps-ink)' }}
              >
                {CURRENCY}{product.price}
              </span>
              {product.subscription_price && (
                <span style={{ fontSize: '14px', color: 'var(--ps-muted)' }}>
                  or{' '}
                  <span style={{ color: 'var(--ps-brand)', fontWeight: 500 }}>
                    {CURRENCY}{product.subscription_price}/mo
                  </span>{' '}
                  on subscription
                </span>
              )}
            </div>

            {/* Short description */}
            {product.description && (
              <p className="mb-8" style={{ fontSize: '16px', color: 'var(--ps-muted)', lineHeight: 1.7 }}>
                {product.description}
              </p>
            )}

            {/* Key specs row */}
            <div
              className="grid grid-cols-2 gap-3 p-5 rounded-8px mb-8"
              style={{ backgroundColor: 'var(--ps-surface-alt)', border: '1px solid var(--ps-border)' }}
            >
              {product.substance && product.substance !== 'N/A' && (
                <div>
                  <div className="mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ps-muted)' }}>
                    Active Substance
                  </div>
                  <div className="font-mono" style={{ fontSize: '13px', color: 'var(--ps-ink)' }}>{product.substance}</div>
                </div>
              )}
              {product.dosage && product.dosage !== 'N/A' && (
                <div>
                  <div className="mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ps-muted)' }}>
                    Dosage
                  </div>
                  <div className="font-mono" style={{ fontSize: '13px', color: 'var(--ps-ink)' }}>{product.dosage}</div>
                </div>
              )}
              {product.quantity && (
                <div>
                  <div className="mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ps-muted)' }}>
                    Quantity
                  </div>
                  <div className="font-mono" style={{ fontSize: '13px', color: 'var(--ps-ink)' }}>{product.quantity}</div>
                </div>
              )}
              {product.type && (
                <div>
                  <div className="mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ps-muted)' }}>
                    Format
                  </div>
                  <div className="font-mono" style={{ fontSize: '13px', color: 'var(--ps-ink)', textTransform: 'capitalize' }}>{product.type.replace(/-/g, ' ')}</div>
                </div>
              )}
            </div>

            {/* Add to cart */}
            <div className="flex items-center gap-3">
              {count > 0 ? (
                <Counter
                  value={count}
                  onIncrement={() => addItem(product)}
                  onDecrement={() => removeItem(product)}
                />
              ) : (
                <Button variant="elevation" size="big" onClick={() => addItem(product)}>
                  Add to Cart <span className="ml-2">→</span>
                </Button>
              )}
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                '🧪 US third-party tested',
                '❄️ Cold-chain shipped',
                '🚚 Free shipping over $100',
                '🔒 Research use only',
              ].map((signal) => (
                <span key={signal} style={{ fontSize: '12px', color: 'var(--ps-muted)' }}>
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content sections ── */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left column */}
          <div className="w-full lg:w-7/12">

            {/* Long description */}
            {product.long_description && (
              <section className="mb-12">
                <h2
                  className="font-display font-normal mb-4"
                  style={{ fontSize: '28px', color: 'var(--ps-ink)', letterSpacing: '-0.01em' }}
                >
                  About {product.name}
                </h2>
                <span className="rule-accent mb-6 block" />
                <p style={{ fontSize: '16px', color: 'var(--ps-text)', lineHeight: 1.8 }}>
                  {product.long_description}
                </p>
              </section>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <section className="mb-12">
                <h2
                  className="font-display font-normal mb-4"
                  style={{ fontSize: '28px', color: 'var(--ps-ink)', letterSpacing: '-0.01em' }}
                >
                  Key Benefits
                </h2>
                <span className="rule-accent mb-6 block" />
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 mt-1 rounded-full"
                        style={{ width: '8px', height: '8px', backgroundColor: 'var(--ps-accent)', marginTop: '8px' }}
                      />
                      <span style={{ fontSize: '15px', color: 'var(--ps-text)', lineHeight: 1.6 }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How to use */}
            {howToUse.length > 0 && (
              <section className="mb-12">
                <h2
                  className="font-display font-normal mb-4"
                  style={{ fontSize: '28px', color: 'var(--ps-ink)', letterSpacing: '-0.01em' }}
                >
                  How to Use
                </h2>
                <span className="rule-accent mb-6 block" />
                <ol className="space-y-3">
                  {howToUse.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="flex-shrink-0 flex items-center justify-center rounded-full font-mono font-medium"
                        style={{
                          width: '28px', height: '28px', minWidth: '28px',
                          backgroundColor: 'var(--ps-accent-light)',
                          color: 'var(--ps-brand)',
                          fontSize: '12px',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: '15px', color: 'var(--ps-text)', lineHeight: 1.6, paddingTop: '4px' }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          {/* Right column */}
          <div className="w-full lg:w-5/12">

            {/* Research summary */}
            {product.research_summary && product.research_summary !== 'N/A' && (
              <section
                className="mb-8 p-6 rounded-12px"
                style={{ backgroundColor: 'var(--ps-surface-alt)', border: '1px solid var(--ps-border)' }}
              >
                <h3
                  className="font-display font-normal mb-3"
                  style={{ fontSize: '20px', color: 'var(--ps-ink)' }}
                >
                  Research Context
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ps-muted)', lineHeight: 1.7 }}>
                  {product.research_summary}
                </p>
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-1 mt-4 font-medium"
                  style={{ fontSize: '13px', color: 'var(--ps-brand)' }}
                >
                  Read more in our learn library <ArrowRight width="10px" />
                </Link>
              </section>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <section
                className="mb-8 p-6 rounded-12px"
                style={{ backgroundColor: '#FFF8F0', border: '1px solid rgba(201,150,77,0.3)' }}
              >
                <h3
                  className="font-body font-semibold mb-3"
                  style={{ fontSize: '14px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ps-warm)' }}
                >
                  Important Notices
                </h3>
                <ul className="space-y-2">
                  {warnings.map((w, i) => (
                    <li key={i} style={{ fontSize: '13px', color: '#7A5E35', lineHeight: 1.6 }}>{w}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* COA link */}
            {product.coa_url && (
              <section
                className="p-5 rounded-8px"
                style={{ border: '1px solid var(--ps-border)' }}
              >
                <h3
                  className="font-body font-semibold mb-2"
                  style={{ fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ps-muted)' }}
                >
                  Quality Assurance
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--ps-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
                  Every batch is third-party tested at a US-accredited lab. HPLC purity ≥99%.
                </p>
                <a
                  href={product.coa_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium"
                  style={{ fontSize: '13px', color: 'var(--ps-brand)' }}
                >
                  View Certificate of Analysis <ArrowRight width="10px" />
                </a>
              </section>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const products = await getProducts();
    const paths = products
      .filter((p) => p.slug)
      .map((p) => ({ params: { slug: p.slug } }));
    return { paths, fallback: false };
  } catch {
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  try {
    const products = await getProducts();
    const product = products.find((p) => p.slug === params.slug) || null;
    return { props: { product } };
  } catch {
    return { props: { product: null } };
  }
}
