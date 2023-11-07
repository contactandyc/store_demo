import '../styles/globals.css'
import { CartProvider } from '../context/CartContext';
import CookieConsent from '../components/CookieConsent';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <CookieConsent />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
