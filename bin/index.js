#!/usr/bin/env node
const child_process = require('child_process');

let args = process.argv;
child_process.spawn(
  'create-next-app',
  [
    ...(args[2] ? [args[2]] : []), // skip the first argument if undefined
    '--example=https://github.com/Developer-DAO/create-dao/tree/main/template',
  ],
  {
    cwd: process.cwd(),
    detached: false,
    stdio: 'inherit',
  }
);
console.log(
  '<TEMP> Before running that, make sure you run and deploy your contract locally. `npm run chain`, then in another terminal run `npm run deploy:local`'
);
