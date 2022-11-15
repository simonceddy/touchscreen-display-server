// const { Category } = require('../../../db/models');
const deleteItem = require('../../../util/db/deleteItem');
const deleteItemMedia = require('../../../util/storage/deleteItemMedia');

async function removeItemFromCategory(req, res) {
  const { itemKey, key, subKey } = req.params;
  const result = await deleteItem(itemKey, key, subKey || null);
  if (!result) return res.json('Item was not deleted');
  deleteItemMedia(result);
  console.log(result);

  return res.json(`Deleted ${itemKey} from ${key}`);
  // Category.findOneAndUpdate({ key }, {
  //   $pull: {
  //     items: { key: itemKey }
  //   }
  // }, { returnDocument: 'after' })
  //   .exec()
  //   .then((result) => {
  //     console.log(result);
  //     res.json(`Deleted ${itemKey} from ${key}`);
  //   })
  //   .catch(console.error);
}

module.exports = removeItemFromCategory;
