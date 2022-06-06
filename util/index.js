const getKeyFromTitle = require('./getKeyFromTitle');

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
  populateKeys
};
