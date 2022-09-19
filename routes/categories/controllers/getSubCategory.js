const { Category } = require('../../../db/models');

function getSubCategory(req, res) {
  Category.findOne({
    key: req.params.key,
    categories: { $elemMatch: { key: req.params.subKey } }
  })
    .exec()
    .then((result) => {
      console.log(req.params);
      if (!result) return res.json('Not found!');

      return res.json({
        parent: req.params.key,
        ...result.categories.find((i) => i.key === req.params.subKey).toObject()
      });
    })
    .catch(console.error);
}

module.exports = getSubCategory;
