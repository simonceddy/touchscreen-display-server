// const { Category } = require('../../../db/models');
// const findAndMakeItemResponse = require('../../../util/findAndMakeItemResponse');
const dbGetItem = require('../../../util/db/getItem');

async function getItem(req, res) {
  // Category.findOne({
  //   key: req.params.key,
  //   items: { $elemMatch: { key: req.params.itemKey } }
  // })
  //   .exec()
  //   .then((result) => {
  //     if (!result) return res.json('Not found!');
  //     // console.log(result);
  //     const item = findAndMakeItemResponse(
  //       req.params.itemKey,
  //       result.items
  //     );
  //     console.log(item);
  //     return res.json({
  //       category: req.params.key,
  //       ...findAndMakeItemResponse(
  //         req.params.itemKey,
  //         result.items
  //       )
  //     });
  //   })
  //   .catch(console.error);
  const item = await dbGetItem(req.params.itemKey, req.params.key, req.params.subKey || null);
  if (!item) return res.json('not found!');
  return res.json(item);
}

module.exports = getItem;
