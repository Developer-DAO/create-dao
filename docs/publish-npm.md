# Publishing to NPM

This repo uses [Lerna](https://lerna.js.org/) to manage it's packages

Currently there is only one package create-dao. More packages can be created by adding a folder to the /packages folder and to the array in the packages key in the lerna.json file in the root.

- Important - when adding a new package, be sure to remove the private attribute from the package.json file of that package.

## Testing package

In the root directory run `yarn create-dao` to test create dao app locally. This will add a create dao project in the root folder with the folder name of my-dao. Do not commit to the repo, it is for local testing only.

## Version Updating and Publishing

1.  Run `yarn update-version` and follow commands to update version
2.  Then run `yarn publish-latest` to update packages to npm
