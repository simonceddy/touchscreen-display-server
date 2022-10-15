// const { Category } = require('../../../db/models');
const deleteItem = require('../../../util/db/deleteItem');

async function removeItemFromCategory(req, res) {
  const { itemKey, key, subCategory } = req.params;
  const result = await deleteItem(itemKey, key, subCategory || null);
  if (!result) return res.json('Item was not deleted');
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
