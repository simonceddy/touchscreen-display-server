const { Item } = require('../../db/models');

async function deleteItem(key, category, subCategory = null) {
  const result = await Item.findOneAndDelete({
    key, category, subCategory
  }).exec();

  return result;
}

module.exports = deleteItem;
