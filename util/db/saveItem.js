const { Item } = require('../../db/models');

async function saveItem(data = {}) {
  if (!data.category || !data.title) {
    // error
  }
  const item = new Item({
    title: data.title,
    body: data.body || null,
    media: data.media || [],
    category: data.category,
    subCategory: data.subCategory || null,
    thumbnail: data.thumbnail || null
  });

  const result = await item.save();

  return result;
}

module.exports = saveItem;
