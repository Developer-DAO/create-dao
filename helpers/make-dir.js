const fs = require('fs');

const makeDir = async (root, options = { recursive: true }) => {
  return fs.promises.mkdir(root, options);
};

exports.makeDir = makeDir;
