const { Category } = require('../../../db/models');
const getItemsFor = require('../../../util/db/getItemsFor');

function getCategory(req, res) {
  // if (req.query.subcategory) {
  //   return Category.findOne({
  //     key: req.params.key,
  //     categories: { $elemMatch: { key: req.query.subcategory } }
  //   })
  //     .exec()
  //     .then((result) => res.json(result))
  //     .catch(console.error);
  // }
  return Category.findOne({
    key: req.params.key
  })
    .exec()
    .then(async (result) => {
      if (!result) return res.json('not found');
      const items = await getItemsFor(result.key);

      // if (req.query.itemKeys) {}

      const data = {
        ...result.toObject(),
        items,
      };
      return res.json(data);
    })
    .catch(console.error);
}

module.exports = getCategory;
