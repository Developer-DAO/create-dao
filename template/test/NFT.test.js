const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Non Fungible Tokens', function () {
  let contract;
  let deployer, buyer;
  let params;
  const baseURI = 'https://base.uri/';
  const revealURI = 'https://not.reval.uri';

  beforeEach(async () => {
    params = { value: ethers.utils.parseEther('0.05') };

    const Contract = await ethers.getContractFactory('NFT');
    [deployer, buyer] = await ethers.getSigners();
    contract = await Contract.deploy(
      baseURI,
      revealURI,
      0
    );
    await contract.deployed();
  });

  describe('Mintable', () => {
    it('prevents minting when paused', async () => {
      await contract.connect(deployer).pause(true);
      await expect(contract.mint(0, params))
        .to.be.revertedWith('mint is paused');
    });

    it('requires greater than zero amount to mint', async () => {
      await expect(contract.mint(0, params))
        .to.be.revertedWith('mint amount must be greater than 0');
    });

    it('prevents minting more than allowed', async () => {
      await expect(contract.mint(21, params))
        .to.be.revertedWith('mint amount must be less than or equal to max mint amount');
    });

    it('prevents minting for less than allowed', async () => {
      params.value = ethers.utils.parseEther('0.01');
      await expect(contract.mint(1, params))
        .to.be.revertedWith('not enough ether sent');
    });

    it('mints a token', async () => {
      await contract.connect(buyer).mint(1, params);
      expect(await contract.balanceOf(buyer.address)).eq(1);
    });

    it('prevents minting more than max supply', async () => {
      const Contract = await ethers.getContractFactory('NFT');
      contract = await Contract.deploy(
        baseURI,
        revealURI,
        2
      );
      await contract.deployed(); 
      const tx = contract.mint(3, params);
      await expect(tx).to.be.revertedWith('not enough supply');
    });
  });

  describe('tokenURI', () => {
    it('requires token exists', async () => {
      await expect(contract.tokenURI(1))
        .to.be.revertedWith(
          'ERC721Metadata: URI query for nonexistent token'
        )
    });

    it('requires reveal', async () => {
      await contract.connect(buyer).mint(1, params);
      expect(await contract.tokenURI(1)).eq(revealURI);
    });

    it('revealed', async () => {
      await contract.connect(buyer).mint(1, params);
      await contract.connect(deployer).reveal();
      expect(await contract.tokenURI(1)).eq(`${baseURI}1.json`);
    });

    it('prevents others from revealing', async () => {
      await contract.connect(buyer).mint(1, params);
      const tx = contract.connect(buyer).reveal();
      await expect(tx).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('walletOfOwner', () => {
    it('lists tokens of address', async () => {
      await contract.connect(buyer).mint(1, params);
      let wallet = await contract.walletOfOwner(buyer.address);
      expect(wallet.length).eq(1);
    });
  });

  describe('owner', () => {
    it('allows withdraw', async () => {
      await contract.connect(buyer).mint(1, params);
      let balance = await ethers.provider.getBalance(contract.address)
      expect(balance).gt(0);
      await contract.connect(deployer).withdraw();
      balance = await ethers.provider.getBalance(contract.address)
      expect(balance).eq(0);
    });

    it('set cost', async () => {
      expect(await contract.cost()).to.eq(ethers.utils.parseEther('0.05'));
      await contract.connect(deployer).setCost(ethers.utils.parseEther('0.1'));
      expect(await contract.cost()).to.eq(ethers.utils.parseEther('0.1'));
    });

    it('set max mint amount', async () => {
      expect(await contract.maxMintAmount()).to.eq(20);
      await contract.connect(deployer).setMaxMintAmount(2);
      expect(await contract.maxMintAmount()).to.eq(2);
    });

    it('set base extension', async () => {
      expect(await contract.baseExtension()).to.eq('.json');
      await contract.connect(deployer).setBaseExtension('.svg');
      expect(await contract.baseExtension()).to.eq('.svg');
    });

    it('set not revealed uri', async () => {
      expect(await contract.notRevealedUri()).to.eq(revealURI);
      await contract.connect(deployer).setNotRevealedURI('https://other.uri');
      expect(await contract.notRevealedUri()).to.eq('https://other.uri');
    });
  });
});