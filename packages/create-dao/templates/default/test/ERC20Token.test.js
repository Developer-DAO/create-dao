const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ERC20 Token', function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('ERC20Token');
    [deployer, ] = await ethers.getSigners();
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it('has supply', async () => {
    const total = await contract.totalSupply();
    expect(total).eq(ethers.utils.parseEther('10000000'));
  });
});