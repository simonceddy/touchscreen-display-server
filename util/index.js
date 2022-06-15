const getKeyFromTitle = require('./getKeyFromTitle');
const getMediaPath = require('./getMediaPath');

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
  getKeyFromTitle,
  populateKeys,
  getMediaPath,
};
