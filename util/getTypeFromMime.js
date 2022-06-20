function getTypeFromMime(mimeType = '') {
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  return null;
}

module.exports = getTypeFromMime;
