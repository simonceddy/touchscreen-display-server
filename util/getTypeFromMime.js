/**
 * Get the media type for the given mime type.
 *
 * Only used for thumbnail generation.
 *
 * Fairly pointless at the moment. Likely will just switch to using mime type
 * directly.
 * @param {string} mimeType Given mime type
 * @returns {string|null}
 */
function getTypeFromMime(mimeType = '') {
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  return null;
}

module.exports = getTypeFromMime;
