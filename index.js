#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const { Command } = require('commander');
const path = require('path');
const prompts = require('prompts');
const { init } = require('./create-app');
const validated = require('./helpers/validate-pkg');
const packageJson = require('./package.json');

let projectPath = '';

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments('[project-directory]')
  .action((name) => {
    projectPath = name;
    console.log(`projectPath: ${projectPath}`);
  })
  //   .option(
  //     '--ts, --typescript',
  //     `
  //   Initialize as a TypeScript project.
  // `
  //   )
  .option(
    '--use-npm',
    `
  Explicitly tell the CLI to bootstrap the app using npm
`
  )
  .allowUnknownOption()
  .parse(process.argv);

async function run() {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }
  if (!projectPath) {
    const res = await prompts({
      type: 'text',
      name: 'path',
      message: 'What is your DAO named?',
      initial: 'my-dao',
      validate: (name) => {
        const validation = validated.validateNpmName(
          path.basename(path.resolve(name))
        );
        if (validation.valid) {
          return true;
        }
        console.log(validation);
        return 'Invalid Name: ' + validation.problems[0];
      },
    });

    if (typeof res.path === 'string') {
      projectPath = res.path.trim();
    }
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validated.validateNpmName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    problems.forEach((p) => console.error(`    ${chalk.red.bold('*')} ${p}`));
    process.exit(1);
  }

  try {
    await init({
      appPath: resolvedProjectPath,
      useNpm: !!program.opts().useNpm,
      typescript: program.opts().typescript,
    });
  } catch (error) {
    console.log(error);
  }
}

run()
  .then()
  .catch(async (reason) => {
    console.log();
    console.log('Aborting installation.');
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red('Unexpected error. Please report it as a bug:'));
      console.log(reason);
    }
    console.log();

    process.exit(1);
  });
