const { Category, /* Item */ } = require('../../../db/models');
const deleteItem = require('../../../util/db/deleteItem');
const getItemsFor = require('../../../util/db/getItemsFor');
const deleteItemMedia = require('../../../util/storage/deleteItemMedia');
const deleteMediaFile = require('../../../util/storage/deleteMediaFile');

async function deleteCategory(req, res) {
  const { key } = req.params;
  try {
    const result = await Category.findOneAndDelete({ key }).exec();
    console.log(result);
    // TODO remove items from category
    if (result.thumbnail && result.thumbnail.src) {
      deleteMediaFile(result.thumbnail.src);
    }
    if (result.categories && result.categories.length > 0) {
      result.categories.forEach((c) => {
        if (c.thumbnail && c.thumbnail.src) deleteMediaFile(c.thumbnail.src);
      });
    }
    const items = await getItemsFor(key, '*');
    // Item.deleteMany({ category: key }).exec();
    console.log(items);
    await Promise.all(items.forEach(async (i) => {
      if (i.media) deleteItemMedia(i);
      await deleteItem(i.key, key);
    }));
    // TODO clean up media
    return res.json({
      result,
      message: 'Deleted category',
      success: true
    });
  } catch (e) {
    return res.json({
      message: e.message,
      success: false,
      error: e,
    });
  }
}

module.exports = deleteCategory;
