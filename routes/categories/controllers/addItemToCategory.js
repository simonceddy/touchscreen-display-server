// const { Category } = require('../../../db/models');
const saveItem = require('../../../util/db/saveItem');

async function addItemToCategory(req, res) {
  // Add item to the given category
  // TODO use $push mongo operator
  const { key, subKey } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }
  const i = await saveItem({
    title: req.body.title,
    body: req.body.body || null,
    media: req.body.media || [],
    category: key,
    subCategory: subKey || null,
    thumbnail: req.body.thumbnail || null
  });

  if (i) {
    return res.json(i);
  }
  return res.json('an error occurred');
  // return Category.findOneAndUpdate(
  //   { key },
  //   {
  //     $push: {
  //       items: {
  //         title: req.body.title,
  //         body: req.body.body || '',
  //         thumbnail: req.body.thumbnail,
  //         media: req.body.media
  //       }
  //     }
  //   },
  //   { new: true, safe: true }
  // )
  //   .exec()
  //   .then((result) => {
  //     console.log(result);
  //     return res.json(result);
  //   })
  //   .catch(console.error);
}

module.exports = addItemToCategory;
