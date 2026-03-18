import { CartProvider } from 'contexts/cart/cart.provider';
import { DrawerProvider } from 'contexts/drawer/drawer.provider';
import { StickyProvider } from 'contexts/sticky/sticky.provider';
import { SearchProvider } from 'contexts/search/use-search';
import 'typeface-open-sans';
// import 'react-spring-modal/dist/index.css';
import 'rc-collapse/assets/index.css';
import 'overlayscrollbars/overlayscrollbars.css';
import 'react-multi-carousel/lib/styles.css';

import 'assets/styles/index.css';

export default function CustomApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <StickyProvider>
        <DrawerProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </DrawerProvider>
      </StickyProvider>
    </SearchProvider>
  );
}
