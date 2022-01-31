# Local Development

## create-dao development

1.  Run `yarn` to install packages
2.  In one terminal
3.  Run `yarn chain` for local ETH test accounts
4.  In another terminal
5.  Run `yarn deploy` to deploy the smart contract
6.  Run `yarn dev` for next development

## Workspaces

This project uses workspaces to help keep ongoing development easier. All scripts can be run from the root directory without going into the the individual folders.

### Adding more workspaces

To add another workspace,

1. In the package.json file in the root directory, add the folder that contains the new workspace package.json file to the workspaces array.
2. In the package.json file for the workspace, be sure to add a unique name (ie. @create-dao/next-app)
3. Add scripts in the package.json for the workspace
4. Add scripts in the package.json in the ROOT to refrence that script (ie. "yarn workspace @create-dao/next-app dev" will refernce the dev script in the @create-dao/next-app workspace)
