import { VStack, Text } from '@chakra-ui/react';
import { useWallet, ConnectWallet as ConnectWalletBtn } from '@web3-ui/core';

export const ConnectWallet = () => {
  const { correctNetwork, connected } = useWallet();

  return (
    <VStack>
      <ConnectWalletBtn />
      {connected && !correctNetwork && (
        <Text color="red">Please switch to the correct network.</Text>
      )}
    </VStack>
  );
};
