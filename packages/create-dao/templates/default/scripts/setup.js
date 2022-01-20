const fs = require('fs');
const { prompt } = require('prompts');
const { CONFIG } = require('../config.js');

let interval;
(async function () {
  const questions = [
    {
      type: 'text',
      name: `DAO_NAME`,
      message: `What would you like to call your DAO?`,
      initial: CONFIG.DAO_NAME,
      format: (v) => `${v}`,
    },
    {
      type: 'text',
      name: 'DESCRIPTION',
      message: `A short description of your DAO`,
      initial: CONFIG.DESCRIPTION,
      format: (v) => `${v}`,
    },
    {
      type: 'text',
      name: 'LONG_DESCRIPTION',
      message: `A longer description of your DAO`,
      initial: CONFIG.LONG_DESCRIPTION,
      format: (v) => `${v}`,
    },
    {
      type: 'text',
      name: 'TWITTER',
      message: `Add your DAO's Twitter handle.`,
      initial: CONFIG.TWITTER,
      format: (v) => `${v}`,
    },
    {
      type: 'text',
      name: 'DISCORD',
      message: `Add your DAO's Discord server.`,
      initial: CONFIG.DISCORD,
      format: (v) => `${v}`,
    },
    {
      type: 'select',
      name: 'NETWORK_ID',
      message: `Which network would you like to use, Please select one.`,
      choices: [
        { title: 'Hardhat', description: 'Hardhat Testnet', value: 31337 },
        { title: 'Testnet', description: 'Rinkeby Testnet', value: 4 },
        { title: 'Mainnet', description: 'ETH Mainnet', value: 1 },
      ],
      initial: 0,
    },
  ];

  const answers = await prompt(questions, {
    onCancel: cleanup,
    onSubmit: cleanup,
  });

  const result = Object.entries(answers);

  const makeChanges = async () => {
    result.forEach(([key, value]) => {
      const configFile = fs.readFileSync('config.js', 'utf8');
      let replaceValue = '';
      let replaceKey = `(${key}: )(.*)`;
      let regEx = new RegExp(replaceKey, 'g');
      if (typeof value === 'number') {
        replaceValue = `${key}: ` + value + `,`;
      } else {
        replaceValue = `${key}: "${value}",`;
      }
      let newConfigFile = configFile.replace(regEx, replaceValue);
      fs.writeFileSync('config.js', newConfigFile);
    });
  };
  await makeChanges();
  console.log('💫 Your DAO setup was successfully!');
})();

function cleanup() {
  clearInterval(interval);
}
