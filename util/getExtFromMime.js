// Preferred file extensions for mimetype
const exts = {
  'image/png': 'png',
  'video/mp4': 'mp4',
  'image/jpeg': 'jpg',
  'image/gif': 'gif'
};

/**
 * Get preferred extension for the given mimetype
 * @param {string} mimeType File mimetype
 * @returns {string} The preferred file extension
 */
function getExtFromMime(mimeType) {
  return exts[mimeType] || null;
}

module.exports = getExtFromMime;
