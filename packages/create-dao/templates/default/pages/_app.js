import '../styles/globals.css';
import { NETWORKS, Provider } from '@web3-ui/core';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <Provider network={NETWORKS.hardhat}>
      <SEO />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
