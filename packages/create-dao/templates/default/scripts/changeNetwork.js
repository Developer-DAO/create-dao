const fs = require('fs');
const { prompt } = require('prompts');

let interval;
(async function () {
  const questions = [
    {
      type: 'select',
      name: 'NETWORK_ID',
      message: `Which network would you like to use, Please select one.`,
      choices: [
        { title: 'Hardhat', description: 'Hardhat Testnet', value: '31337' },
        { title: 'Testnet', description: 'Rinkeby Testnet', value: '4' },
        { title: 'Mainnet', description: 'ETH Mainnet', value: '1' },
      ],
      initial: 0,
    },
  ];

  const answers = await prompt(questions, {
    onCancel: cleanup,
    onSubmit: cleanup,
  });

  // open config file and replace NETWORK_ID with the user input
  const configFile = fs.readFileSync('config.js', 'utf8');
  const newConfigFile = configFile.replace(
    /(NETWORK_ID:)(.*)/g,
    `NETWORK_ID: ${answers.NETWORK_ID},`
  );

  fs.writeFileSync('config.js', newConfigFile);
  console.log('💫 You have successfully changed your network!');
})();

function cleanup() {
  clearInterval(interval);
}
