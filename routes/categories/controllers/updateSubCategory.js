const { Category } = require('../../../db/models');

function updateSubCategory(req, res) {
  console.log(req.body);
  Category
    .findOneAndUpdate({
      key: req.params.key,
      categories: { $elemMatch: { key: req.params.sub } }
    }, {
      $set: {
        'categories.$.title': req.body.title,
        'categories.$.items': req.body.items,
        'categories.$.thumbnail': req.body.thumbnail
      }
    }, { returnDocument: 'after' })
    .exec()
    .then((result) => {
      console.log(result);
      res.json('updated');
    })
    .catch(console.error);
}

module.exports = updateSubCategory;
