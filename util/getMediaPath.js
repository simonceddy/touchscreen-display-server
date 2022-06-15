const fs = require('fs');
const path = require('path');
const { STORAGE_DIR } = require('../support/consts');

function getMediaPath(filename) {
  const fn = path.resolve(`${STORAGE_DIR}/${filename}`);
  if (!fs.existsSync(fn)) {
    return false;
  }
  return fn;
}

module.exports = getMediaPath;
