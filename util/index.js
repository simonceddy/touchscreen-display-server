const getExtFromMime = require('./getExtFromMime');
const getFlakeId = require('./getFlakeId');
const getKeyFromTitle = require('./getKeyFromTitle');
const getMediaPath = require('./getMediaPath');
const getTypeFromMime = require('./getTypeFromMime');

function populateKeys(...items) {
  return items.map((item) => {
    if (!item.title) return false;
    return {
      ...item,
      key: getKeyFromTitle(item.title)
    };
  });
}

module.exports = {
  getFlakeId,
  getExtFromMime,
  getTypeFromMime,
  getKeyFromTitle,
  populateKeys,
  getMediaPath,
};
