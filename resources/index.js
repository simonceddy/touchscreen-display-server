const fs = require('fs');
const path = require('path');

function getMediaPath(filename) {
  const fn = path.resolve(`${__dirname}/../resources/${filename}`);
  if (!fs.existsSync(fn)) {
    return false;
  }
  return fn;
}

module.exports = getMediaPath;
