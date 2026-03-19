import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from 'assets/icons/social-icons';

const social = [
  { id: 0, link: 'https://instagram.com/smilepeptides', Icon: Instagram, className: 'instagram', title: 'Instagram' },
  { id: 1, link: 'https://twitter.com/smilepeptides',   Icon: Twitter,   className: 'twitter',   title: 'X (Twitter)' },
  { id: 2, link: 'https://youtube.com/@smilepeptides',  Icon: Youtube,   className: 'youtube',   title: 'YouTube' },
  { id: 3, link: 'https://facebook.com/smilepeptides',  Icon: Facebook,  className: 'facebook',  title: 'Facebook' },
];

const legalLinks = [
  { href: '/terms',    label: 'Terms & Conditions' },
  { href: '/privacy',  label: 'Privacy Policy' },
  { href: '/shipping', label: 'Shipping Policy' },
  { href: '/cookies',  label: 'Cookie Policy' },
];

const Footer = () => (
  <footer
    className="w-full py-12"
    style={{
      backgroundColor: 'var(--ps-surface)',
      borderTop: '1px solid var(--ps-border)',
      paddingLeft: 'clamp(16px, 5vw, 48px)',
      paddingRight: 'clamp(16px, 5vw, 48px)',
    }}
  >
    {/* Top row — wordmark + social */}
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-0 mb-8">
      <Link href="/" className="flex items-center gap-0">
        <span
          className="font-body font-semibold"
          style={{ fontSize: '22px', letterSpacing: '-0.03em', color: 'var(--ps-ink)' }}
        >
          Peptide
        </span>
        <span
          className="font-body font-semibold"
          style={{ fontSize: '22px', letterSpacing: '-0.03em', color: 'var(--ps-brand)' }}
        >
          Station
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {social.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className={`social ${item.className}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">{item.title}</span>
            <item.Icon />
          </a>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="divider mb-8" />

    {/* Research disclaimer */}
    <p
      className="text-center mb-8 max-w-2xl mx-auto"
      style={{ fontSize: '13px', color: 'var(--ps-muted)', lineHeight: 1.7 }}
    >
      All products are sold strictly for <strong>research purposes only</strong> and are not intended for human consumption,
      diagnosis, treatment, or prevention of any disease. By purchasing, you confirm you are 18+ and agree to our Terms & Conditions.
      Consult a qualified healthcare professional before use.
    </p>

    {/* Legal links + copyright */}
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {legalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors duration-200 hover:text-brand"
            style={{ fontSize: '13px', color: 'var(--ps-muted)' }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <p style={{ fontSize: '13px', color: 'var(--ps-muted)' }}>
        &copy; {new Date().getFullYear()} Peptide Station. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
