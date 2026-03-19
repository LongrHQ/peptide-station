import { useContext } from 'react';
import Link from 'next/link';
import { Scrollbar } from 'components/scrollbar';
import ActiveLink from 'components/active-link';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import CloseIcon from 'assets/icons/close';
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from 'assets/icons/social-icons';

const menus = [
  { id: 1, pathname: '/',          title: 'Shop All Peptides' },
  { id: 2, pathname: '/learn',     title: 'Learn' },
  { id: 3, pathname: '/faq',       title: 'FAQ' },
  { id: 4, pathname: '/terms',     title: 'Terms & Conditions' },
  { id: 5, pathname: '/privacy',   title: 'Privacy Policy' },
  { id: 6, pathname: '/shipping',  title: 'Shipping Policy' },
  { id: 7, pathname: '/cookies',   title: 'Cookie Policy' },
];

const social = [
  { id: 0, link: 'https://instagram.com/smilepeptides', Icon: Instagram, className: 'instagram', title: 'Instagram' },
  { id: 1, link: 'https://twitter.com/smilepeptides',   Icon: Twitter,   className: 'twitter',   title: 'X / Twitter' },
  { id: 2, link: 'https://youtube.com/@smilepeptides',  Icon: Youtube,   className: 'youtube',   title: 'YouTube' },
  { id: 3, link: 'https://facebook.com/smilepeptides',  Icon: Facebook,  className: 'facebook',  title: 'Facebook' },
];

export default function DrawerMenu() {
  const { dispatch } = useContext(DrawerContext);
  const hideMenu = () => {
    dispatch({ type: 'OPEN_MENU', payload: { menu: false } });
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div
        className="w-full h-90px flex justify-start items-center relative px-30px flex-shrink-0"
        style={{ backgroundColor: 'var(--ps-surface-alt)', borderBottom: '1px solid var(--ps-border)' }}
      >
        <Link href="/" className="flex items-baseline gap-1" onClick={hideMenu}>
          <span
            className="font-display font-normal"
            style={{ fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--ps-ink)' }}
          >
            Peptide
          </span>
          <span
            className="font-display font-normal"
            style={{ fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--ps-brand)' }}
          >
            Station
          </span>
        </Link>

        <button
          className="w-30px h-30px flex items-center justify-center absolute right-25px focus:outline-none cursor-pointer"
          style={{ color: 'var(--ps-muted)' }}
          onClick={hideMenu}
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Nav links */}
      <Scrollbar className="menu-scrollbar flex-grow">
        <div className="flex flex-col py-60px pb-40px lg:pb-60px">
          {menus.map((menu) => (
            <ActiveLink
              key={menu.id}
              href={menu.pathname}
              activeClassName="font-semibold active"
              className="menu-item relative text-gray-900 pl-30px pr-4 mb-8 transition duration-200 ease-in-out last:mb-0 hover:text-gray-900"
              onClick={hideMenu}
            >
              {menu.title}
            </ActiveLink>
          ))}
        </div>

        {/* Research disclaimer in menu */}
        <p
          className="px-30px pb-40px"
          style={{ fontSize: '11px', color: 'var(--ps-muted)', lineHeight: 1.6 }}
        >
          All products are for research use only. Not intended for human consumption.
        </p>
      </Scrollbar>

      {/* Social footer */}
      <div
        className="flex items-center justify-start h-12 px-30px flex-shrink-0 lg:hidden"
        style={{ borderTop: '1px solid var(--ps-border)', backgroundColor: 'var(--ps-surface-alt)' }}
      >
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
  );
}
