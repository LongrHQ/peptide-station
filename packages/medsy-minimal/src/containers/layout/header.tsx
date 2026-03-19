import { useContext } from 'react';
import Link from 'next/link';
import CartIcon from 'assets/icons/cart-icon';
import Search from 'components/search';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import { useCart } from 'contexts/cart/cart.provider';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { dispatch }: any = useContext(DrawerContext);
  const { itemsCount } = useCart();

  const showMenu = () => {
    dispatch({ type: 'OPEN_MENU', payload: { menu: true } });
  };

  const showCart = () => {
    dispatch({ type: 'SLIDE_CART', payload: { open: true } });
    dispatch({ type: 'TOGGLE_CART_VIEW', payload: { showCart: true } });
  };

  const isHome = router.pathname === '/';

  return (
    <header
      className="flex items-center text-gray-700 body-font fixed w-full z-20"
      style={{
        height: '80px',
        backgroundColor: 'var(--ps-canvas)',
        borderBottom: '1px solid var(--ps-border)',
        paddingLeft: '48px',
        paddingRight: '48px',
      }}
    >
      {/* Hamburger */}
      <button
        aria-label="Open menu"
        className="menuBtn flex flex-col items-center justify-center flex-shrink-0 h-full outline-none focus:outline-none mr-6"
        style={{ width: '32px' }}
        onClick={showMenu}
      >
        <span className="menuIcon">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </span>
      </button>

      {/* Wordmark logo — sans serif, larger */}
      <Link href="/" className="flex items-center gap-0 flex-shrink-0 mr-10">
        <span
          className="font-body font-semibold tracking-tight"
          style={{ fontSize: '26px', color: 'var(--ps-ink)', letterSpacing: '-0.03em' }}
        >
          Peptide
        </span>
        <span
          className="font-body font-semibold tracking-tight"
          style={{ fontSize: '26px', color: 'var(--ps-brand)', letterSpacing: '-0.03em' }}
        >
          Station
        </span>
        <span className="sr-only">Peptide Station — Home</span>
      </Link>

      {/* Search — homepage only */}
      <div className="w-full mx-6 lg:flex lg:justify-center">
        {isHome && <Search />}
      </div>

      {/* Research use disclaimer — desktop */}
      <div
        className="hidden items-center mr-8 flex-shrink-0 lg:flex"
        style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ps-muted)', whiteSpace: 'nowrap' }}
      >
        For Research Use Only
      </div>

      {/* Cart */}
      <button
        className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none cursor-pointer"
        onClick={showCart}
        aria-label="Open cart"
      >
        <CartIcon width="22px" height="22px" />
        {itemsCount > 0 && (
          <span
            className="w-18px h-18px flex items-center justify-center text-white absolute rounded-full font-mono"
            style={{
              fontSize: '10px',
              top: '-10px',
              right: '-10px',
              backgroundColor: 'var(--ps-brand)',
            }}
          >
            {itemsCount}
          </span>
        )}
      </button>
    </header>
  );
}
