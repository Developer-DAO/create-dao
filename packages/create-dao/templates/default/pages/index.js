import {
  Button,
  Container,
  Heading,
  Link as ChakraLink,
  VStack,
  Text,
  IconButton,
  Image,
  HStack,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { CONFIG } from '../config';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

export default function Home() {
  const { DAO_NAME, DESCRIPTION, TWITTER, DISCORD, LONG_DESCRIPTION } = CONFIG;

  return (
    <Container paddingY="10">
      <Heading textAlign="center">{DAO_NAME}</Heading>
      <Text textAlign="center">{DESCRIPTION}</Text>
      <VStack mt="50">
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
      <HStack justify="center" mt="10">
        <IconButton icon={<FaTwitter />} onClick={() => window.open(TWITTER)} />
        <IconButton icon={<FaDiscord />} onClick={() => window.open(DISCORD)} />
      </HStack>
      <Divider mt="10" />
      <Heading textAlign="center" mt="10">
        About the DAO
      </Heading>
      <Text textAlign="center" mt="10">
        {LONG_DESCRIPTION}
      </Text>
    </Container>
  );
}
