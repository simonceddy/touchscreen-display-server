const { Category } = require('../../../db/models');

function removeItemFromCategory(req, res) {
  const { itemKey, key } = req.params;
  Category.findOneAndUpdate({ key }, {
    $pull: {
      items: { key: itemKey }
    }
  }, { returnDocument: 'after' })
    .exec()
    .then((result) => {
      console.log(result);
      res.json(`Deleted ${itemKey} from ${key}`);
    })
    .catch(console.error);
}

module.exports = removeItemFromCategory;
