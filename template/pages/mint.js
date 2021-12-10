import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import NFT from '../src/artifacts/contracts/NFT.sol/NFT.json';
import {
  Button,
  Container,
  VStack,
  HStack,
  Heading,
  Link as ChakraLink,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';

// Update with the contract address logged out to the CLI when it was deployed
const NFTContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const initialState = {
  totalSupply: '-',
  mintPrice: 0,
  isMintPaused: true,
  maxMintAmount: 1,
  maxSupply: 10000,
};

export default function Mint() {
  // store contract info in local state
  const [
    { totalSupply, mintPrice, isMintPaused, maxMintAmount, maxSupply },
    setMintState,
  ] = useState(initialState);
  const [mintAmount, setMintAmount] = useState(1);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isLoading, setIsLoading] = useState('');

  const toast = useToast();

  const successToast = () => {
    toast({
      title: 'Congratulations',
      description: 'Your minting was successful.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const errorToast = () => {
    toast({
      title: 'Something went wrong',
      description: 'Please, try again.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have metamask!');
        return;
      }

      //Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);
      }
    } catch (err) {
      console.log('Error: ', err);
      errorToast();
    }
  };

  // Connect to users wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log('Error: ', err);
      errorToast();
    }
  };

  // Call the smart contract, read total supply
  async function fetchTotalSupply() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTContractAddress, NFT.abi, signer);
      try {
        const contractTotalSupply = await contract.totalSupply();

        setMintState((oldState) => ({
          ...oldState,
          totalSupply: parseInt(contractTotalSupply, 10),
        }));
      } catch (err) {
        console.log('Error: ', err);
        errorToast();
      }
    }
  }

  // Call the smart contract, read basic information
  async function fetchInitialInformation() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTContractAddress, NFT.abi, signer);
      try {
        const contrcatIsMintPaused = await contract.paused();
        const contractMintPrice = await contract.cost();
        const contractTotalSupply = await contract.totalSupply();
        const contractMaxMintAmount = await contract.maxMintAmount();
        const contractMaxMaxSupply = await contract.maxSupply();

        setMintState((oldState) => ({
          ...oldState,
          isMintPaused: contrcatIsMintPaused,
          mintPrice: contractMintPrice,
          totalSupply: parseInt(contractTotalSupply, 10),
          maxMintAmount: parseInt(contractMaxMintAmount, 10),
          maxSupply: parseInt(contractMaxMaxSupply, 10),
        }));
      } catch (err) {
        console.log('Error: ', err);
        errorToast();
      }
    }
  }

  // Call the smart contract, mint a token
  async function mintToken() {
    if (isMintPaused) return;
    try {
      if (window.ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          NFTContractAddress,
          NFT.abi,
          signer
        );

        const transaction = await contract.mint(mintAmount, {
          gasLimit: 300000,
          value: mintPrice.mul(mintAmount),
        });
        await transaction.wait();
        fetchTotalSupply();
        successToast();
      }
    } catch (err) {
      console.log('Error: ' + err);
      errorToast();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      fetchInitialInformation();
    }
  }, [currentAccount]);

  return (
    <Container>
      <VStack mt="50" spacing={4}>
        <ChakraLink as={Link} href="/">
          Return home
        </ChakraLink>
        <Heading>NFT Name</Heading>
        <Text>
          Minted {totalSupply}/{maxSupply}
        </Text>
        <NumberInput
          onChange={(valueString) => setMintAmount(parseInt(valueString, 10))}
          value={mintAmount}
          defaultValue={1}
          min={1}
          max={maxMintAmount}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <HStack>
          {!currentAccount ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <Button
              disabled={isMintPaused}
              isLoading={isLoading}
              onClick={mintToken}
            >{`Mint NFT (${ethers.utils.formatEther(mintPrice)} Ξ)`}</Button>
          )}
        </HStack>
      </VStack>
    </Container>
  );
}
