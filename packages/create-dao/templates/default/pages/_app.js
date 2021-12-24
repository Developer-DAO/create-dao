import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { NETWORKS, Provider } from '@web3-ui/core';

function MyApp({ Component, pageProps }) {
  return (
    <Provider network={NETWORKS.rinkeby}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
