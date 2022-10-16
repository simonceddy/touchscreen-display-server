const { Category } = require('../../../db/models');

function updateSubCategory(req, res) {
  // console.log(req.body);
  const { key, subKey } = req.params;
  if (!key || !subKey) {
    return res.json('an error has occurred');
  }
  console.log(key);
  return Category
    .findOneAndUpdate({
      key,
      categories: { $elemMatch: { key: subKey } }
    }, {
      $set: {
        'categories.$.title': req.body.title,
        'categories.$.thumbnail': req.body.thumbnail
      }
    }, { returnDocument: 'after' })
    .exec()
    .then((result) => {
      console.log(result);
      if (!result) {
        console.log('error!');
        return res.json('error!');
      }
      return res.json('updated');
    })
    .catch(console.error);
}

module.exports = updateSubCategory;
