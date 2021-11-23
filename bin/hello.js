#! /usr/bin/env node

// console.log('Hello from `create-dao`');
const inquirer = require('inquirer')

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your DAO name?"
  }
]

inquirer.prompt(questions).then(answers => {
  console.log(`${answers['name']} DAO created!`)
})
