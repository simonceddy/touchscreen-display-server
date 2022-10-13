const { Category } = require('../../../db/models');
const getItemsFor = require('../../../util/db/getItemsFor');

function getCategory(req, res) {
  if (req.query.subcategory) {
    return Category.findOne({
      key: req.params.key,
      categories: { $elemMatch: { key: req.query.subcategory } }
    })
      .exec()
      .then((result) => res.json(result))
      .catch(console.error);
  }
  return Category.findOne({
    key: req.params.key
  })
    .exec()
    .then(async (result) => {
      const items = await getItemsFor(result.key);
      console.log(items);
      // console.log({ ...result });
      res.json(result);
    })
    .catch(console.error);
}

module.exports = getCategory;
