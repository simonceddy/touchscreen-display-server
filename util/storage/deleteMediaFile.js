const fs = require('fs');
const path = require('path');
const { STORAGE_DIR } = require('../../support/consts');
const thumbsrc = require('./thumbsrc');

function deleteMediaFile(filename) {
  const filepath = path.resolve(STORAGE_DIR, filename);
  const thumbpath = path.resolve(STORAGE_DIR, 'thumbs', thumbsrc(filename));
  if (fs.existsSync(filepath)) {
    fs.rmSync(filepath);
  }
  if (fs.existsSync(thumbpath)) {
    fs.rmSync(thumbpath);
  }
}

module.exports = deleteMediaFile;
