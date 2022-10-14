const { Category } = require('../../../db/models');
const getItemsFor = require('../../../util/db/getItemsFor');

function getSubCategory(req, res) {
  Category.findOne({
    key: req.params.key,
    categories: { $elemMatch: { key: req.params.subKey } }
  })
    .exec()
    .then(async (result) => {
      console.log(req.params);
      if (!result) return res.json('Not found!');
      const sub = result.categories.find((i) => i.key === req.params.subKey);
      if (!sub) return res.json('Not found!');
      const itemList = await getItemsFor(result.key, sub.key);
      return res.json({
        parent: result.key,
        ...sub.toObject(),
        itemList,
      });
    })
    .catch(console.error);
}

module.exports = getSubCategory;
