const { Item } = require('../../db/models');

async function getItem(key, category, subCategory = null) {
  const item = await Item.findOne({
    key, category, subCategory
  }).exec();

  return item;
}

module.exports = getItem;
