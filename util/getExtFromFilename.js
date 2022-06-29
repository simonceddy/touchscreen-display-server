function getExtFromFilename(filename = '') {
  return filename.split('.').pop();
}

module.exports = getExtFromFilename;
