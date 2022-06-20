const fs = require('fs');
const path = require('path');

/**
 * Recursively make subdirectories in the given root directory.
 *
 * Operates from 'top to bottom', e.g. the first item in the dirs array will
 * be created first, the second will be created inside the first, and so on.
 * @param {string} dirpath Path to root directory
 * @param {array} dirs Array of subdirectories to create.
 */
function recursiveMkdir(dirpath, dirs = []) {
  let lastDir = dirpath;
  dirs.map((dr) => {
    const newPath = path.resolve(lastDir, dr);
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    lastDir = newPath;
    return dr;
  });
}

module.exports = recursiveMkdir;
