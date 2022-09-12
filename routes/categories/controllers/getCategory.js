const { Category } = require('../../../db/models');

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
    .then((result) => {
      // console.log({ ...result });
      res.json(result);
    })
    .catch(console.error);
}

module.exports = getCategory;
