const { Item } = require('../../db/models');

async function getItemsFor(category, subCategory = null) {
  const q = {
    category
  };

  if (subCategory !== '*') {
    q.subCategory = subCategory;
  }

  const results = await Item.find(q).exec();

  return results;
}

module.exports = getItemsFor;
