import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box borderRadius='0.5rem' textAlign='center' margin="auto" bg="brand.900" w="70%" fontSize='xl' p={4} color="white">
      <Text fontSize='2xl'>Chakra UI Frontend</Text>
    </Box>
  );
}
