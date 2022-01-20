import '../styles/globals.css';
import { Provider } from '@web3-ui/core';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { CONFIG } from '../config';

const { NETWORK_ID } = CONFIG;

function MyApp({ Component, pageProps }) {
  return (
    <Provider network={NETWORK_ID}>
      <SEO />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
