const deleteMediaFile = require('./deleteMediaFile');

/**
 * Delete the media associated with the given Item model
 * @param {import('../../db/models').Item} item The Item model
 */
function deleteItemMedia(item) {
  if (item.thumbnail && item.thumbnail.src) {
    deleteMediaFile(item.thumbnail.src);
  }
  if (item.media && item.media.length > 0) {
    item.media.forEach((m) => {
      if (m.src) deleteMediaFile(m.src);
    });
  }
}

module.exports = deleteItemMedia;
