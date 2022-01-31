# Contributing

Contributions are welcome!

1. Check the [ISSUES](https://github.com/Developer-DAO/create-dao/issues). Read every issue to understand what's needed and whether it's something you can help with.

2. Ask other contributors to see if no one has taken the issue yet. If you're interested in tackling such a feature and it's still available, we will assign you to the task.

3. Clone the repo and create your own branch using `git checkout -b your_branch_name`. Remember to use a branch name that describes WHAT you're doing/fixing.

4. Setup your local development environment. Instructions [here](#local-development).

5. Once your work is done with the local copy of the repo, don't hesitate to open a pull request. We'll gladly revise and push as deemed fit.

6. Feel free to add new issues as you read the code and find inconsistencies and/or possible features that may add up to the website. Follow the labeling standards to make it easier to understand what you're proposing.

7. Document changes and/or issues clearly. Make it easy for everyone involved to understand your ideas/changes.

## Local development

To setup your local dev environment:

```sh
# Clone the repo
git clone git@github.com:Developer-DAO/create-dao.git
cd create-dao

# yarn install also runs `preconstruct dev`, which dynamically links all
# packages in the monorepo together.
yarn install

# all development can be done from the root folder
# to start a local hardhat chain, in one terminal
yarn chain

# in another terminal, deploy the contract locally with
yarn deploy
# then you can start developing with
yarn dev

```

## Creating a pull request

In order to create a pull request for create-dao, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.
