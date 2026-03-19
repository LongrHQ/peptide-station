import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import HeroBlock from 'containers/banner/hero-block';
import Products from 'containers/products';
import HomepageStatement from 'containers/homepage/HomepageStatement';
import HomepageFeatures from 'containers/homepage/HomepageFeatures';
import HomepageBanner from 'containers/homepage/HomepageBanner';
import HomepageComparison from 'containers/homepage/HomepageComparison';
import HomepageTestimonials from 'containers/homepage/HomepageTestimonials';
import { getProducts } from 'helpers/get-products';
import { useRefScroll } from 'helpers/use-ref-scroll';
import { useSearch } from 'contexts/search/use-search';

export default function Home({ products }) {
  const { elRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -100,
  });
  const { searchTerm } = useSearch();

  useEffect(() => {
    if (searchTerm) return scroll();
  }, [scroll, searchTerm]);

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Peptide Station — Pen-First Peptide Therapy</title>
        <meta name="description" content="Shop BPC-157, TB-500, GHK-Cu, Sermorelin and more — pre-mixed, precision-dosed peptide pens. US third-party tested. No syringes, no vials. Free shipping on orders over $100." />
        <meta property="og:title" content="Peptide Station — Pen-First Peptide Therapy" />
        <meta property="og:description" content="Shop BPC-157, TB-500, GHK-Cu, Sermorelin and more — pre-mixed, precision-dosed peptide pens. US third-party tested." />
        <meta property="og:url" content="https://peptide-station.web.app" />
        <link rel="canonical" href="https://peptide-station.web.app" />
      </Head>

      {/* 1 ── Hero carousel */}
      <HeroBlock />

      {/* 2 ── Brand statement */}
      <HomepageStatement />

      {/* 3 ── Feature pillars */}
      <HomepageFeatures />

      {/* 4 ── Mid-page banner */}
      <HomepageBanner />

      {/* 5 ── Product grid headline */}
      <div
        style={{
          paddingLeft: 'clamp(16px, 5vw, 48px)',
          paddingRight: 'clamp(16px, 5vw, 48px)',
          paddingTop: '80px',
          paddingBottom: '0',
          borderTop: '1px solid var(--ps-border)',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ps-muted)',
            marginBottom: '12px',
          }}
        >
          Peptide Station Products
        </p>
        <h2
          className="font-body"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--ps-ink)',
          }}
        >
          No Needles. No Mixing. No Excuses.
        </h2>
      </div>

      {/* 6 ── Product grid */}
      <Products items={products} ref={elRef} />

      {/* 7 ── Comparison table */}
      <HomepageComparison />

      {/* 8 ── Testimonials + ticker */}
      <HomepageTestimonials />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const products = await getProducts();
    console.log(`[getStaticProps] Fetched ${products.length} products`);
    return { props: { products } };
  } catch (err) {
    console.error('[getStaticProps] Failed to fetch products:', err);
    return { props: { products: [] } };
  }
}
