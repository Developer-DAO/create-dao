require('@nomiclabs/hardhat-waffle');
require('solidity-coverage');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.9',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      chainId: 4,
      url: 'https://rinkeby.infura.io/v3/YOUR_PROJECT_ID',
      // UNCOMMENT THIS AND ADD YOUR PRIVATE KEY IF YOU WANT TO DEPLOY TO THE RINKEBY TESTNET
      // accounts: ['YOUR_PRIVATE_KEY'],
    },
    mainnet: {
      chainId: 1,
      url: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
      // UNCOMMENT THIS AND ADD YOUR PRIVATE KEY IF YOU WANT TO DEPLOY TO THE ETHEREUM MAINNET
      // accounts: ['YOUR_PRIVATE_KEY'], 
    },
  },
};
