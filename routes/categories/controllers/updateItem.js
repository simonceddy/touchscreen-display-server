// const { Category } = require('../../../db/models');
const dbUpdateItem = require('../../../util/db/updateItem');

async function updateItem(req, res) {
  const { itemKey, key, subKey } = req.params;
  if (!itemKey) {
    return res.json('error! no item key!');
  }

  const result = await dbUpdateItem(itemKey, key, subKey || null, req.body);

  if (!result) {
    return res.json('Error updating!');
  }

  return res.json(result);
  // Category
  //   .findOneAndUpdate({
  //     key: req.params.key,
  //     items: { $elemMatch: { key: req.params.itemKey } }
  //   }, {
  //     // TODO
  //     $set: {
  //       'items.$.title': req.body.title,
  //       'items.$.body': req.body.body,
  //       'items.$.media': req.body.media,
  //       'items.$.thumbnail': req.body.thumbnail
  //     }
  //   }, { returnDocument: 'after' })
  //   .exec()
  //   .then((result) => {
  //     res.json('updated');
  //     console.log(result);
  //   })
  //   .catch(console.error);
}

module.exports = updateItem;
