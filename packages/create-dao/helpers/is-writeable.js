const fs = require('fs');

const isWriteable = async (directory) => {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
};

exports.isWriteable = isWriteable;
