const fs = require('fs');
const path = require('path');

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
