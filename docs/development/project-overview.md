# Project Overview

## This project is evolving

To find issues to work on, please refer to [ISSUES](https://github.com/Developer-DAO/create-dao/issues)

For contributing, please refer to [CONTRIBUTING](https://github.com/Developer-DAO/create-dao/blob/main/CONTRIBUTING.md)

## Below is the inital overview for the project

`npx create-dao`

The way [Nader](https://discord.com/channels/883478451850473483/883705562850807808/910908371446673408) sees it:

1. A smart contract that deploys an NFT or ERC20 (or have contracts for both)
2. A front end that describes how the dao works (info pages, etc...)
3. A guide that is built into the README that describes how to token-gate a discord, and the various tradeoffs around decisions when setting up a DAO
4. A user interface that allows members to buy or mint tokens

### ! Important

The project is still early in development and only supports deployment to local chain out of the box. You can of course tweak the code to deploy to Rinkeby, but a low-code solution for that is still in the works.

### How to use the template:

1. Run `npx create-dao`

2. `cd` into your project's directory

3. Start a local Hardhat chain: `npm run chain`

4. Deploy the contracts: `npm run deploy`

5. Change the `greeterAddress` in `pages/index.js` to the one your contract was deployed to in #4 above.

6. Start your app: `npm run dev`

(except the wrapping of `create-next-app` and a few modifications, this is mostly taken from https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)

### How this template will be used on a livenet:

1. Run `npx create-dao <dao_name>`
2. Answer questions according to your preference.
3. `cd <dao_name>`
4. `yarn deploy:contract`
5. TBD..
