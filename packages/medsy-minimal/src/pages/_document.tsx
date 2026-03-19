import Document, { Html, Head, Main, NextScript } from 'next/document';

const SITE_URL = 'https://peptide-station.web.app';
const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;
const SITE_NAME = 'Peptide Station';
const DEFAULT_TITLE = 'Peptide Station — Pen-First Peptide Therapy';
const DEFAULT_DESC =
  'Pre-mixed, precision-dosed, US third-party tested peptide pens. No syringes. No vials. Just dial and inject. Shop BPC-157, TB-500, GHK-Cu, Sermorelin and more.';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          {/* ── Charset & viewport ──────────────────────────── */}
          <meta charSet="utf-8" />

          {/* ── Primary SEO ─────────────────────────────────── */}
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Peptide Station" />
          <meta name="theme-color" content="#F5F4EF" />
          <link rel="canonical" href={SITE_URL} />

          {/* ── Open Graph ──────────────────────────────────── */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:title" content={DEFAULT_TITLE} />
          <meta property="og:description" content={DEFAULT_DESC} />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Peptide Station — Pen-First Peptide Therapy" />
          <meta property="og:locale" content="en_US" />

          {/* ── Twitter / X Card ────────────────────────────── */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@smilepeptides" />
          <meta name="twitter:creator" content="@smilepeptides" />
          <meta name="twitter:title" content={DEFAULT_TITLE} />
          <meta name="twitter:description" content={DEFAULT_DESC} />
          <meta name="twitter:image" content={OG_IMAGE} />

          {/* ── Schema.org JSON-LD ──────────────────────────── */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Organization',
                    '@id': `${SITE_URL}/#organization`,
                    name: 'Peptide Station',
                    url: SITE_URL,
                    logo: {
                      '@type': 'ImageObject',
                      url: OG_IMAGE,
                    },
                    sameAs: [
                      'https://instagram.com/smilepeptides',
                      'https://twitter.com/smilepeptides',
                      'https://youtube.com/@smilepeptides',
                    ],
                    description: DEFAULT_DESC,
                  },
                  {
                    '@type': 'WebSite',
                    '@id': `${SITE_URL}/#website`,
                    url: SITE_URL,
                    name: SITE_NAME,
                    publisher: { '@id': `${SITE_URL}/#organization` },
                    inLanguage: 'en-US',
                  },
                  {
                    '@type': 'Store',
                    '@id': `${SITE_URL}/#store`,
                    name: 'Peptide Station',
                    url: SITE_URL,
                    description: DEFAULT_DESC,
                    currenciesAccepted: 'USD',
                    priceRange: '$34.99 – $159.99',
                    areaServed: 'US',
                    hasMap: SITE_URL,
                  },
                ],
              }),
            }}
          />

          {/* ── Favicons ────────────────────────────────────── */}
          <link rel="icon" href="/favicon.ico" />

          {/* ── Typography ──────────────────────────────────── */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
