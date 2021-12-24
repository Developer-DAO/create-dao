import {
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContract, useTransaction, useWallet } from '@web3-ui/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { ConnectWallet } from '../components/ConnectWallet';
import NFT_ABI from '../src/artifacts/contracts/NFT.sol/NFT.json';

// Update with the contract address logged out to the CLI when it was deployed
const NFTContractAddress = '0xD506BE3aC0345d9FaE8C2A58Ac2F02E582E68781';

export default function Mint() {
  const { connected, provider } = useWallet();
  const nftContract = useContract(NFTContractAddress, NFT_ABI.abi);
  const [maxSupply, setMaxSupply] = useState('-');
  const [totalSupply, setTotalSupply] = useState('-');
  const [mintPrice, setMintPrice] = useState();
  const [execMint, mintLoading, mintError] = useTransaction(nftContract.mint, [
    1,
    {
      value: ethers.utils.parseEther('0.05'),
    },
  ]);

  const fetchData = async () => {
    const [maxSupply, totalSupply, mintPrice] = await Promise.all([
      await nftContract.maxSupply(),
      await nftContract.totalSupply(),
      await nftContract.cost(),
    ]);
    console.log({ maxSupply, totalSupply: totalSupply.toString(), mintPrice });
    setMaxSupply(maxSupply.toString());
    setTotalSupply(totalSupply.toString());
    setMintPrice(ethers.utils.formatEther(mintPrice.toString()));
  };

  useEffect(() => {
    if (
      connected &&
      provider &&
      nftContract &&
      Object.entries(nftContract).length > 0
    ) {
      fetchData();
    }
  }, [nftContract]);

  return (
    <Container padding="10">
      <VStack>
        <ChakraLink as={Link} href="/">
          Return home
        </ChakraLink>
        <ConnectWallet />
        {!connected && <Text color="red">Please connect your wallet</Text>}
        <Heading style={{ marginTop: '40px' }}>Mint NFT</Heading>
        <Text>
          Minted {totalSupply}/{maxSupply}
        </Text>
        <Button
          onClick={async () => {
            await execMint();
            await fetchData();
          }}
          isLoading={mintLoading}
        >
          Mint Ξ{mintPrice}
        </Button>
        {mintError && <Text color="red">{mintError.message}</Text>}
      </VStack>
    </Container>
  );
}
