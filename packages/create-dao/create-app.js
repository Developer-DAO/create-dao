const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const cpy = require('cpy');
const checkWriteable = require('./helpers/is-writeable');
const makeDir = require('./helpers/make-dir');
const checkFolder = require('./helpers/is-folder-empty');
const checkYarn = require('./helpers/should-use-yarn');
const checkOnline = require('./helpers/is-online');
const installDep = require('./helpers/install');
const gitInit = require('./helpers/git');

const init = async ({ appPath, useNpm, typescript }) => {
  console.log('running create app');
  const template = typescript ? 'typescript' : 'default';
  const root = path.resolve(appPath);

  if (!(await checkWriteable.isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    );
    console.error(
      'It is likely you do not have write permissions for this folder.'
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir.makeDir(root);
  if (!checkFolder.isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = useNpm ? false : checkYarn.shouldUseYarn();
  const isOnline = !useYarn || (await checkOnline.getOnline());
  const originalDirectory = process.cwd();

  const displayedCommand = useYarn ? 'yarn' : 'npm';
  console.log(`Creating a new DAO app in ${chalk.green(root)}.`);
  console.log();

  process.chdir(root);

  console.log(chalk.bold(`Using ${displayedCommand}.`));
  /**
   * Create a package.json for the new project.
   */
  const packageJson = {
    name: appName,
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      chain: 'npx hardhat node',
      compile: 'npx hardhat compile',
      deploy:
        'npm run compile && npx hardhat run scripts/deploy.js --network localhost',
    },
  };
  /**
   * Write it to disk.
   */
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
  /**
   * These flags will be passed to `install()`.
   */
  const installFlags = { useYarn, isOnline };
  /**
   * Default dependencies.
   */
  const dependencies = [
    '@nomiclabs/hardhat-ethers',
    '@nomiclabs/hardhat-waffle',
    '@openzeppelin/contracts',
    'chai',
    'ethereum-waffle',
    'ethers',
    'react',
    'react-dom',
    'next',
    '@chakra-ui/react',
    '@emotion/react@^11',
    '@emotion/styled@^11',
    'framer-motion@^4',
    'react-icons',
  ];
  /**
   * Default devDependencies.
   */
  const devDependencies = ['eslint', 'eslint-config-next', 'hardhat'];
  /**
   * TypeScript projects will have type definitions and other devDependencies.
   */
  if (typescript) {
    devDependencies.push('typescript', '@types/react', '@types/node');
  }
  /**
   * Install package.json dependencies if they exist.
   */
  if (dependencies.length) {
    console.log();
    console.log('Installing dependencies:');
    for (const dependency of dependencies) {
      console.log(`- ${chalk.cyan(dependency)}`);
    }
    console.log();

    await installDep.install(root, dependencies, installFlags);
  }
  /**
   * Install package.json devDependencies if they exist.
   */
  if (devDependencies.length) {
    console.log();
    console.log('Installing devDependencies:');
    for (const devDependency of devDependencies) {
      console.log(`- ${chalk.cyan(devDependency)}`);
    }
    console.log();

    const devInstallFlags = { devDependencies: true, ...installFlags };
    await installDep.install(root, devDependencies, devInstallFlags);
  }
  console.log();
  /**
   * Copy the template files to the target directory.
   */
  await cpy('**', root, {
    parents: true,
    cwd: path.join(__dirname, 'templates', template), //for seperate templated folders
    // cwd: path.join(__dirname, 'template'), //for single template
    filter: (name) => {
      // console.log('file name : ', name);
      if (name.relativePath === 'package.json') {
        return false;
      }
      return true;
    },
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'eslintrc.json': {
          return '.'.concat(name);
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case 'README-template.md': {
          return 'README.md';
        }
        default: {
          return name;
        }
      }
    },
  });

  if (gitInit.tryGitInit(root)) {
    console.log('Initialized a git repository.');
    console.log();
  }

  let cdpath = '';
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log();
  console.log('We suggest that you begin by, creating 2 terminals.');
  console.log();
  console.log('In one terminal type:');
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}chain`)}`
  );
  console.log();
  console.log('In another terminal type:');
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}deploy`)}`
  );
  console.log(
    '    Change the greeterAddress in pages/index.js to the one your contract was deployed to'
  );
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`
  );
  console.log();
};

module.exports = {
  init,
};
