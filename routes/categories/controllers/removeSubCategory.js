const { Category } = require('../../../db/models');
const deleteItem = require('../../../util/db/deleteItem');
const getItemsFor = require('../../../util/db/getItemsFor');
const deleteItemMedia = require('../../../util/storage/deleteItemMedia');
const deleteMediaFile = require('../../../util/storage/deleteMediaFile');

async function removeSubCategory(req, res) {
  const { subCategoryKey, key } = req.params;
  try {
    const result = await Category.findOneAndUpdate({ key }, {
      $pull: {
        categories: { key: subCategoryKey }
      }
    }, { returnDocument: 'before' })
      .exec();
    const removedSub = result.categories.find((c) => c.key === subCategoryKey);
    if (removedSub && removedSub.thumbnail && removedSub.thumbnail.src) {
      deleteMediaFile(removedSub.thumbnail.src);
    }

    const items = await getItemsFor(key, subCategoryKey);

    await Promise.all(items.map(async (i) => {
      if (i.media) deleteItemMedia(i);
      await deleteItem(i.key, key, subCategoryKey);
    }));

    return res.json(`Deleted ${subCategoryKey} from ${key}`);
  } catch (e) {
    return res.json({
      message: e.message,
      success: false,
      error: e,
    });
  }
}

module.exports = removeSubCategory;
