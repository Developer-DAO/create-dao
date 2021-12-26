import { HStack, IconButton } from '@chakra-ui/react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { CONFIG } from '../config';

const { TWITTER, DISCORD } = CONFIG;

export const Footer = () => {
  return (
    <HStack justify="center" mt="0">
      <IconButton icon={<FaTwitter />} onClick={() => window.open(TWITTER)} />
      <IconButton icon={<FaDiscord />} onClick={() => window.open(DISCORD)} />
    </HStack>
  );
};
