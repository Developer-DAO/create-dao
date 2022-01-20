const fs = require('fs');
const hre = require('hardhat');
const configFile = fs.readFileSync('config.js', 'utf8');

async function main() {
  const ERC20Token = await hre.ethers.getContractFactory('ERC20Token');
  const token = await ERC20Token.deploy();
  await token.deployed();
  console.log('Token deployed to:', token.address);

  const NFT = await hre.ethers.getContractFactory('NFT');
  const nft = await NFT.deploy('test', 'test', 10000);
  await nft.deployed();
  console.log('NFT deployed to:', nft.address);
  // open config file and replace NETWORK_ID with the user input
  const addNFTToConfig = configFile.replace(
    /(NFT_ADDRESS:)(.*)/g,
    `NFT_ADDRESS: "${nft.address}",`
  );

  fs.writeFileSync('config.js', addNFTToConfig);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
