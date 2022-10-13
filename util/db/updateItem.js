const { Item } = require('../../db/models');

async function updateItem(key, category, subCategory = null, data = {}) {
  const result = await Item.findOneAndUpdate({
    key, category, subCategory
  }, data, {
    new: true
  }).exec();

  return result;
}

module.exports = updateItem;
