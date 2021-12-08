import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Greeter from '../src/artifacts/contracts/Greeter.sol/Greeter.json';
import { Container, Link as ChakraLink, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <VStack mt="50">
        <ChakraLink as={Link} href="/mint">
          Mint here
        </ChakraLink>
      </VStack>
    </Container>
  );
}
