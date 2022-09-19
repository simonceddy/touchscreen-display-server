const { Category } = require('../../../db/models');

function updateItem(req, res) {
  Category
    .findOneAndUpdate({
      key: req.params.key,
      items: { $elemMatch: { key: req.params.itemKey } }
    }, {
      // TODO
      $set: {
        'items.$.title': req.body.title,
        'items.$.body': req.body.body,
        'items.$.media': req.body.media,
        'items.$.thumbnail': req.body.thumbnail
      }
    }, { returnDocument: 'after' })
    .exec()
    .then((result) => {
      res.json('updated');
      console.log(result);
    })
    .catch(console.error);
}

module.exports = updateItem;
