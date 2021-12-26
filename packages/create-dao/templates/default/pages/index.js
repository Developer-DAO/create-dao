import {
  Button,
  Container,
  Heading,
  Link as ChakraLink,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { CONFIG } from '../config';

export default function Home() {
  const { DAO_NAME, DESCRIPTION, LONG_DESCRIPTION } = CONFIG;

  return (
    <Container paddingY="10">
      <VStack spacing="4">
        <Heading textAlign="center">{DAO_NAME}</Heading>
        <Text textAlign="center">{DESCRIPTION}</Text>
        <VStack>
          <Button>
            <ChakraLink
              as={Link}
              href="/mint"
              style={{ textDecoration: 'underline' }}
            >
              Join the DAO
            </ChakraLink>
          </Button>
        </VStack>
        <Divider />
        <Heading textAlign="center">About the DAO</Heading>
        <Text textAlign="center">{LONG_DESCRIPTION}</Text>
      </VStack>
    </Container>
  );
}
