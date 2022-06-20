const exts = {
  'image/png': 'png',
  'video/mp4': 'mp4',
  'image/jpeg': 'jpg',
  'image/gif': 'gif'
};

function getExtFromMime(mimeType) {
  return exts[mimeType] || null;
}

module.exports = getExtFromMime;
