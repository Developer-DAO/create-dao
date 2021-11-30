# Contributing
If you have any ideas, want to work on a feature or just want to get in on the conversation — feel free to create an issue for it or say hi in the [Discord thread](https://discord.com/channels/883478451850473483/909505132033626112/910930908033454082).

## Running locally

```bash
# Install dependencies
$ npm install
```
Repeat for the `template` folder.

```bash
# Start local chain (make sure you have cd'd into the `template` folder)
$ npm run chain
```

```bash
# Deploy contracts
$ npm run deploy
```

```bash
# Start the frontend
$ npm run dev
```

If you want to work on the CLI, just edit the `bin/index.js` file. Once you are done, run `npm i -g` and then `npx create-dao` to test out the changes locally.
