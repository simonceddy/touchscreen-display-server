const fs = require('fs');
const path = require('path');
const { STORAGE_DIR } = require('../support/consts');

/**
 * Find a file in storage and return the full filepath.
 * @param {string} filename Path to file relative to storage dir
 * @returns {string|false} The full filepath or false if file is not found
 */
function getMediaPath(filename) {
  const fn = path.resolve(`${STORAGE_DIR}/${filename}`);
  if (!fs.existsSync(fn)) {
    return false;
  }
  return fn;
}

module.exports = getMediaPath;
