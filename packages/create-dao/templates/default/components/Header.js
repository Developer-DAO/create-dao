import {
  Container,
  HStack,
  Link as ChakraLink,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useWallet } from '@web3-ui/core';
import { ConnectWallet } from './ConnectWallet';
import Link from 'next/link';

export const Header = () => {
  const { connected } = useWallet();

  return (
    <Container mt="4">
      <HStack justify="center" justifyContent="space-between">
        <HStack>
          <ChakraLink as={Link} href="/">
            Home
          </ChakraLink>
          <ChakraLink as={Link} href="/mint">
            Mint
          </ChakraLink>
        </HStack>
        <VStack justify="baseline">
          <ConnectWallet />
          {!connected && <Text color="red">Please connect your wallet</Text>}
        </VStack>
      </HStack>
    </Container>
  );
};
