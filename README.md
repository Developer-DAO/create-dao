# create-dao

## What this is supposed to be

`npx create-dao`

The way [Nader](https://discord.com/channels/883478451850473483/883705562850807808/910908371446673408) sees it:

1. A smart contract that deploys an NFT or ERC20 (or have contracts for both)
2. A front end that describes how the dao works (info pages, etc...)
3. A guide that is built into the README that describes how to token-gate a discord, and the various tradeoffs around decisions when setting up a DAO
4. A user interface that allows members to buy or mint tokens

### How to use the template:

1. Use the cli to generate the scaffold:
`npx create-next-app --example=https://github.com/henripal/create-dao/tree/main/template`
(note that we would need to wrap this using our own CLI)

2. `cd` into your project's directory

3. Compile the existing contract: `npx hardhat compile` (right now this is just a fill-in contract: `template/contracts/Greeter.sol`)

4. Deploy a local network: `npx hardhat node`

5. Deploy your contract to the local network: `npx hardhat run scripts/sample-script.js --network localhost`
Note the address of the contract.

6. Change the `greeterAddress` in `pages/index.js` to the one your contract was deployed to in 5. above.

7. Start your app: `npm run dev`

(except the wrapping of `create-next-app` and a few modifications, this is mostly taken from https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)

### How this template will be used on a livenet:

1. Run `npx create-dao <dao_name>`
2. Answer questions according to your preference.
3. `cd <dao_name>`
4. `yarn deploy:contract`
5. TBD..
## [Contributing](CONTRIBUTING.md)
