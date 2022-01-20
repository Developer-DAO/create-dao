import {
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useContract, useWallet } from '@web3-ui/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import NFT_ABI from '../src/artifacts/contracts/NFT.sol/NFT.json';
import { SEO } from '../components/SEO';
import { CONFIG } from '../config';

const { NFT_ADDRESS } = CONFIG;

// Update with the contract address logged out to the CLI when it was deployed
const NFTContractAddress = NFT_ADDRESS;

export default function Mint() {
  const toast = useToast();
  const { connected, provider, correctNetwork } = useWallet();
  const [nftContract, isReady] = useContract(NFTContractAddress, NFT_ABI.abi);
  const [maxSupply, setMaxSupply] = useState('-');
  const [totalSupply, setTotalSupply] = useState('-');
  const [mintPrice, setMintPrice] = useState();
  const [mintLoading, setMintLoading] = useState(false);
  const [mintError, setMintError] = useState(null);

  const fetchData = async () => {
    const [maxSupply, totalSupply, mintPrice] = await Promise.all([
      await nftContract.maxSupply(),
      await nftContract.totalSupply(),
      await nftContract.cost(),
    ]);
    setMaxSupply(maxSupply.toString());
    setTotalSupply(totalSupply.toString());
    setMintPrice(ethers.utils.formatEther(mintPrice.toString()));
  };

  useEffect(() => {
    if (
      connected &&
      provider &&
      isReady &&
      correctNetwork &&
      Object.entries(nftContract).length > 0
    ) {
      fetchData();
    }
  }, [nftContract]);

  const handleMint = async () => {
    try {
      const response = await nftContract.mint(1, {
        value: ethers.utils.parseEther(mintPrice),
      });
      // wait for the transaction to be confirmed
      await response.wait();
      setMintError(null);
      setMintLoading(false);
      toast({
        title: 'Minting',
        description: 'Minting your token',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to mint your NFT',
        description: error.message,
        status: 'error',
      });
    } finally {
      await fetchData();
    }
  };

  return (
    <>
      <SEO title="Mint NFT" />
      <Container padding="10">
        <VStack>
          <Heading style={{ marginTop: '40px' }}>Mint NFT</Heading>
          <Text>
            Minted {totalSupply}/{maxSupply}
          </Text>
          <Button
            onClick={() => handleMint()}
            isLoading={mintLoading}
            isDisabled={!correctNetwork || !connected}
          >
            Mint Ξ{mintPrice}
          </Button>
          {mintError && <Text color="red">{mintError.message}</Text>}
        </VStack>
      </Container>
    </>
  );
}
