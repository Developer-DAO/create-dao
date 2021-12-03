// eslint-disable-next-line import/no-extraneous-dependencies
const validateProjectName = require('validate-npm-package-name');

const validateNpmName = (name) => {
  const nameValidation = validateProjectName(name);
  if (nameValidation.validForNewPackages) {
    return { valid: true };
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ],
  };
};

exports.validateNpmName = validateNpmName;
