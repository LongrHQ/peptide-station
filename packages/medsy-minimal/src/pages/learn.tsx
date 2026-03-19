import Head from 'next/head';
import Layout from 'containers/layout/layout';
import Link from 'next/link';
import ArrowRight from 'assets/icons/arrow-right';

const articles = [
  {
    category: 'Recovery',
    title: 'The Complete Guide to BPC-157',
    description: 'Mechanisms, dosing protocols, and what the research actually says about the most popular recovery peptide.',
    href: '#',
    badge: 'Most Popular',
  },
  {
    category: 'Recovery',
    title: 'BPC-157 + TB-500: The Recovery Stack',
    description: 'Why these two peptides are almost always used together — and how to run the protocol.',
    href: '#',
  },
  {
    category: 'Skin & Hair',
    title: 'GHK-Cu: The Copper Peptide Explained',
    description: 'The science behind the fastest-growing peptide in biohacking. Collagen, hair, and why the research is unusually strong.',
    href: '#',
    badge: 'Trending',
  },
  {
    category: 'Growth Hormone',
    title: 'Sermorelin vs Synthetic HGH',
    description: 'What sermorelin actually does, why it\'s more physiological than HGH, and how telehealth companies price it vs what you pay here.',
    href: '#',
  },
  {
    category: 'Growth Hormone',
    title: 'CJC-1295 + Ipamorelin: The GH Stack',
    description: 'The most studied GH optimisation protocol in biohacking. How it works and who it\'s for.',
    href: '#',
  },
  {
    category: 'Getting Started',
    title: 'What Are Peptide Pens?',
    description: 'How pen-delivery compares to vials and syringes — and why the format matters for accuracy, safety, and convenience.',
    href: '#',
  },
  {
    category: 'Getting Started',
    title: 'How to Use a Peptide Pen',
    description: 'Step-by-step guide to subcutaneous injection with a peptide pen. No experience required.',
    href: '#',
  },
  {
    category: 'Quality & Safety',
    title: 'How to Read a Certificate of Analysis (COA)',
    description: 'What HPLC purity means, what to look for in endotoxin results, and why most vendors fail this test.',
    href: '#',
  },
  {
    category: 'Legal & Regulatory',
    title: 'Are Peptides Legal in the US? (2026 Guide)',
    description: 'FDA enforcement, research-use framing, WADA status, and what you need to know before purchasing.',
    href: '#',
  },
];

const categories = ['All', 'Getting Started', 'Recovery', 'Skin & Hair', 'Growth Hormone', 'Quality & Safety', 'Legal & Regulatory'];

export default function LearnPage() {
  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="The Peptide Station Learn library — science-backed guides on BPC-157, TB-500, GHK-Cu, Sermorelin, and more." />
        <title>Learn | Peptide Station</title>
      </Head>

      {/* Hero */}
      <div
        className="w-full px-4 lg:px-35px py-16 lg:py-20"
        style={{ backgroundColor: 'var(--ps-surface-alt)', borderBottom: '1px solid var(--ps-border)' }}
      >
        <div className="max-w-2xl">
          <span className="badge-trust mb-6 inline-flex">Education Library</span>
          <h1
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ps-ink)' }}
          >
            The science of peptides,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--ps-brand-mid)' }}>made simple.</em>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ps-muted)', lineHeight: 1.7 }}>
            Research-backed guides on every compound we carry. No hype, no bro-science — just what the studies actually say and how to apply it.
          </p>
        </div>
      </div>

      <div className="w-full px-4 lg:px-35px py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-pill text-13px font-medium transition duration-150 cursor-pointer"
              style={{
                backgroundColor: cat === 'All' ? 'var(--ps-ink)' : 'var(--ps-surface-alt)',
                color: cat === 'All' ? '#fff' : 'var(--ps-muted)',
                border: '1px solid var(--ps-border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <Link
              key={i}
              href={article.href}
              className="group flex flex-col p-6 rounded-12px transition duration-200"
              style={{ border: '1px solid var(--ps-border)', backgroundColor: 'var(--ps-surface)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-11px font-medium uppercase tracking-wide-md"
                  style={{ color: 'var(--ps-brand)' }}
                >
                  {article.category}
                </span>
                {article.badge && (
                  <span className="badge-trust" style={{ fontSize: '10px', padding: '2px 8px' }}>
                    {article.badge}
                  </span>
                )}
              </div>

              <h2
                className="font-display font-normal mb-3 group-hover:text-brand transition duration-150"
                style={{ fontSize: '20px', lineHeight: 1.3, color: 'var(--ps-ink)' }}
              >
                {article.title}
              </h2>

              <p
                className="flex-grow mb-4"
                style={{ fontSize: '14px', color: 'var(--ps-muted)', lineHeight: 1.7 }}
              >
                {article.description}
              </p>

              <span
                className="inline-flex items-center gap-1 text-13px font-medium"
                style={{ color: 'var(--ps-brand)' }}
              >
                Read article <ArrowRight width="10px" />
              </span>
            </Link>
          ))}
        </div>

        {/* Coming soon notice */}
        <div
          className="mt-12 p-6 rounded-12px text-center"
          style={{ backgroundColor: 'var(--ps-surface-alt)', border: '1px solid var(--ps-border)' }}
        >
          <p style={{ fontSize: '14px', color: 'var(--ps-muted)' }}>
            Full articles are being published weekly. Subscribe to our email list to be notified.
          </p>
        </div>
      </div>
    </Layout>
  );
}
