const { Category } = require('../../../db/models');
const findAndMakeItemResponse = require('../../../util/findAndMakeItemResponse');

function getItemFromSubCategory(req, res) {
  Category.findOne({
    key: req.params.key,
    categories: {
      $elemMatch: {
        key: req.params.subKey,
        items: {
          $elemMatch: {
            key: req.params.itemKey
          }
        }
      }
    }
  })
    .exec()
    .then((result) => {
      if (!result) return res.json('Not found!');
      return res.json({
        category: req.params.key,
        subCategory: req.params.subKey,
        ...findAndMakeItemResponse(
          req.params.itemKey,
          result.categories.find((s) => s.key === req.params.subKey).items
        )
      });
    })
    .catch(console.error);
}

module.exports = getItemFromSubCategory;
