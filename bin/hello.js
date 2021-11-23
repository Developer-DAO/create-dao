const inquirer = require('inquirer');

const questions = [
  {
    name: 'DAO_name',
    message: 'What is your DAO name?',
    default: 'Developer DAO',
  },
  {
    name: 'DAO_symbol',
    message: 'What is your DAO sybmol?',
    default: 'Dev_DAO',
  },
];

inquirer.prompt(questions).then((answers) => {
  questions.forEach((question) => {
    console.log(`${question.name}: ${answers[question.name]}`);
  });
});
