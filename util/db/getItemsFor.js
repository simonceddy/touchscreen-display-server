const { Item } = require('../../db/models');

async function getItemsFor(category, subCategory = null) {
  const results = await Item.find({
    category,
    subCategory
  }).exec();

  return results;
}

module.exports = getItemsFor;
