import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from 'containers/layout/layout';
import ArrowRight from 'assets/icons/arrow-right';

const SITE_URL = 'https://peptide-station.web.app';

// ── Post data ────────────────────────────────────────────
const posts = [
  {
    slug: 'bpc-157-complete-guide',
    category: 'Recovery',
    badge: 'Most Popular',
    title: 'The Complete Guide to BPC-157',
    excerpt:
      'Mechanisms, dosing protocols, and what the research actually says about the most popular recovery peptide in the biohacking community.',
    image: '/images/learn/bpc-157-guide.jpg',
    date: 'March 12, 2026',
    author: 'Dr. Sarah Mitchell',
    readTime: '9 min read',
  },
  {
    slug: 'recovery-stack-bpc-tb500',
    category: 'Recovery',
    badge: null,
    title: 'BPC-157 + TB-500: The Recovery Stack',
    excerpt:
      'Why these two peptides are almost always used together — and how to run the protocol that dominates r/Peptides.',
    image: '/images/learn/recovery-stack.jpg',
    date: 'March 8, 2026',
    author: 'James Hartley',
    readTime: '7 min read',
  },
  {
    slug: 'ghk-cu-copper-peptide-skin',
    category: 'Skin & Hair',
    badge: 'Trending',
    title: 'GHK-Cu: The Copper Peptide Explained',
    excerpt:
      'The science behind the fastest-growing peptide in biohacking. Collagen, hair, and why the research is unusually strong.',
    image: '/images/learn/ghk-cu-skin.jpg',
    date: 'March 5, 2026',
    author: 'Dr. Sarah Mitchell',
    readTime: '8 min read',
  },
  {
    slug: 'sermorelin-vs-hgh',
    category: 'Growth Hormone',
    badge: null,
    title: 'Sermorelin vs Synthetic HGH',
    excerpt:
      'What sermorelin actually does, why it\'s more physiological than HGH, and how telehealth companies price it vs what you pay here.',
    image: '/images/learn/sermorelin-hgh.jpg',
    date: 'February 28, 2026',
    author: 'Tom Archer',
    readTime: '6 min read',
  },
  {
    slug: 'cjc-1295-ipamorelin-stack',
    category: 'Growth Hormone',
    badge: null,
    title: 'CJC-1295 + Ipamorelin: The GH Stack',
    excerpt:
      'The most studied GH optimisation protocol in biohacking. How it works, who it\'s for, and how to dose it correctly.',
    image: '/images/learn/cjc-ipamorelin.jpg',
    date: 'February 22, 2026',
    author: 'James Hartley',
    readTime: '7 min read',
  },
  {
    slug: 'what-are-peptide-pens',
    category: 'Getting Started',
    badge: 'Beginner',
    title: 'What Are Peptide Pens?',
    excerpt:
      'How pen-delivery compares to vials and syringes — and why the format matters for accuracy, safety, and daily convenience.',
    image: '/images/learn/peptide-pens-guide.jpg',
    date: 'February 18, 2026',
    author: 'Dr. Sarah Mitchell',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-use-a-peptide-pen',
    category: 'Getting Started',
    badge: null,
    title: 'How to Use a Peptide Pen',
    excerpt:
      'Step-by-step guide to subcutaneous injection with a peptide pen. Clear, jargon-free, no experience required.',
    image: '/images/learn/how-to-inject.jpg',
    date: 'February 14, 2026',
    author: 'Tom Archer',
    readTime: '4 min read',
  },
  {
    slug: 'how-to-read-a-coa',
    category: 'Quality & Safety',
    badge: null,
    title: 'How to Read a Certificate of Analysis',
    excerpt:
      'What HPLC purity means, what to look for in endotoxin results, and why most vendors fail this test.',
    image: '/images/learn/read-coa.jpg',
    date: 'February 10, 2026',
    author: 'Dr. Sarah Mitchell',
    readTime: '6 min read',
  },
  {
    slug: 'are-peptides-legal-us-2026',
    category: 'Legal & Regulatory',
    badge: '2026 Update',
    title: 'Are Peptides Legal in the US?',
    excerpt:
      'FDA enforcement, research-use framing, WADA status, and everything you need to know before purchasing peptides in 2026.',
    image: '/images/learn/peptides-legal.jpg',
    date: 'February 5, 2026',
    author: 'James Hartley',
    readTime: '8 min read',
  },
];

const categories = ['All', 'Getting Started', 'Recovery', 'Skin & Hair', 'Growth Hormone', 'Quality & Safety', 'Legal & Regulatory'];

// ── Featured post (first) ────────────────────────────────
function FeaturedPost({ post }: { post: typeof posts[0] }) {
  return (
    <Link
      href={`/learn/${post.slug}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--ps-border)',
        backgroundColor: 'var(--ps-surface)',
        marginBottom: '40px',
        textDecoration: 'none',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', minHeight: '360px', overflow: 'hidden' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ transition: 'transform 400ms ease' }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'var(--ps-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--ps-brand)',
            }}
          >
            {post.category}
          </span>
          {post.badge && (
            <span className="badge-trust" style={{ fontSize: '10px' }}>{post.badge}</span>
          )}
        </div>

        <h2
          className="font-body"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--ps-ink)',
            marginBottom: '16px',
          }}
        >
          {post.title}
        </h2>

        <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--ps-muted)', marginBottom: '32px' }}>
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ps-ink)', margin: 0 }}>{post.author}</p>
            <p style={{ fontSize: '12px', color: 'var(--ps-muted)', margin: 0 }}>
              {post.date} · {post.readTime}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1 font-medium"
            style={{ fontSize: '14px', color: 'var(--ps-brand)' }}
          >
            Read article <ArrowRight width="12px" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Post card ────────────────────────────────────────────
function PostCard({ post }: { post: typeof posts[0] }) {
  return (
    <Link
      href={`/learn/${post.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--ps-border)',
        backgroundColor: 'var(--ps-surface)',
        textDecoration: 'none',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(44,44,44,0.10)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'none';
      }}
    >
      {/* Cover image */}
      <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Category chip over image */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#fff',
              backgroundColor: 'var(--ps-brand)',
              borderRadius: '9999px',
              padding: '4px 10px',
            }}
          >
            {post.category}
          </span>
          {post.badge && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ps-ink)',
                backgroundColor: 'rgba(245,244,239,0.92)',
                border: '1px solid var(--ps-border)',
                borderRadius: '9999px',
                padding: '4px 10px',
                backdropFilter: 'blur(6px)',
              }}
            >
              {post.badge}
            </span>
          )}
        </div>
      </div>

      {/* Text content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          className="font-body"
          style={{
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            color: 'var(--ps-ink)',
            marginBottom: '10px',
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'var(--ps-muted)',
            marginBottom: '20px',
            flex: 1,
          }}
        >
          {post.excerpt}
        </p>

        {/* Author + meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid var(--ps-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Avatar initial */}
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--ps-surface-alt)',
                border: '1px solid var(--ps-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--ps-ink)',
                flexShrink: 0,
              }}
            >
              {post.author[0]}
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ps-ink)', margin: 0, lineHeight: 1.2 }}>
                {post.author}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--ps-muted)', margin: 0, lineHeight: 1.2 }}>
                {post.date}
              </p>
            </div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ps-muted)', whiteSpace: 'nowrap' }}>
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────
export default function LearnPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Learn | Peptide Station — Science-Backed Peptide Guides</title>
        <meta
          name="description"
          content="Research-backed guides on BPC-157, TB-500, GHK-Cu, Sermorelin and more. Dosing protocols, safety, COA reading, and the latest from the peptide science world."
        />
        <meta property="og:title" content="Learn | Peptide Station — Science-Backed Peptide Guides" />
        <meta property="og:description" content="Research-backed guides on BPC-157, TB-500, GHK-Cu, Sermorelin and more." />
        <meta property="og:image" content={`${SITE_URL}/images/learn/bpc-157-guide.jpg`} />
        <meta property="og:url" content={`${SITE_URL}/learn`} />
        <link rel="canonical" href={`${SITE_URL}/learn`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Peptide Station Learn Library',
              description: 'Science-backed guides on therapeutic peptides.',
              url: `${SITE_URL}/learn`,
              publisher: {
                '@type': 'Organization',
                name: 'Peptide Station',
                url: SITE_URL,
              },
            }),
          }}
        />
      </Head>

      {/* ── Hero slider ───────────────────────────────── */}
      <div
        style={{
          paddingLeft: '48px',
          paddingRight: '48px',
          paddingTop: '24px',
          paddingBottom: '0',
        }}
      >
        <div
          style={{
            borderRadius: '16px',
            border: '1px solid var(--ps-border)',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '400px',
            backgroundImage: 'url(/images/learn/recovery-stack.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
            }}
          />
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, paddingLeft: '112px', paddingRight: '56px', paddingTop: '72px', paddingBottom: '72px' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.18)',
                paddingBottom: '8px',
                display: 'inline-block',
              }}
            >
              Education Library
            </p>
            <h1
              className="font-body"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#ffffff',
                marginBottom: '20px',
                maxWidth: '560px',
              }}
            >
              The science of peptides.{' '}
              <span style={{ color: 'var(--ps-brand)' }}>Made simple.</span>
            </h1>
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.65)',
                marginBottom: '36px',
                maxWidth: '440px',
              }}
            >
              Research-backed guides on every compound we carry. No hype, no bro-science — just what the studies actually say.
            </p>
            <Link
              href="#articles"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.35)',
                borderRadius: '9999px',
                padding: '12px 28px',
                textDecoration: 'none',
              }}
            >
              Browse all guides <ArrowRight width="12px" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div
        id="articles"
        style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '56px', paddingBottom: '80px' }}
      >
        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                border: '1px solid var(--ps-border)',
                backgroundColor: cat === 'All' ? 'var(--ps-ink)' : 'var(--ps-surface)',
                color: cat === 'All' ? '#fff' : 'var(--ps-muted)',
                transition: 'all 150ms ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <FeaturedPost post={featured} />

        {/* Post grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Subscribe CTA */}
        <div
          style={{
            borderRadius: '16px',
            border: '1px solid var(--ps-border)',
            backgroundColor: 'var(--ps-surface-alt)',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--ps-muted)',
            }}
          >
            New guides weekly
          </p>
          <h2
            className="font-body"
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--ps-ink)',
              margin: 0,
            }}
          >
            Stay ahead of the science.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ps-muted)', maxWidth: '440px', margin: 0 }}>
            Get new peptide guides, protocol updates, and lab-verified research delivered to your inbox every week.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                height: '44px',
                padding: '0 16px',
                borderRadius: '9999px',
                border: '1.5px solid var(--ps-border)',
                backgroundColor: 'var(--ps-surface)',
                fontSize: '14px',
                color: 'var(--ps-ink)',
                outline: 'none',
                width: '240px',
              }}
            />
            <button
              style={{
                height: '44px',
                padding: '0 24px',
                borderRadius: '9999px',
                backgroundColor: 'var(--ps-ink)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
