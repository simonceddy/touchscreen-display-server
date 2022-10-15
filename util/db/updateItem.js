const { Item } = require('../../db/models');

async function updateItem(key, category, subCategory = null, data = null) {
  const d = (!data && typeof subCategory === 'object') ? subCategory : data;
  const result = await Item.findOneAndUpdate({
    key, category, subCategory
  }, d, {
    new: true
  }).exec();

  return result;
}

module.exports = updateItem;
