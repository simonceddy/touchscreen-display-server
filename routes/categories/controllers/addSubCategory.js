const { Category } = require('../../../db/models');

function addSubCategory(req, res) {
  const { key } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }

  // TODO transform body better
  // TODO addItems
  return Category.findOneAndUpdate(
    { key },
    {
      $push: {
        categories: {
          title: req.body.title,
          thumbnail: req.body.thumbnail || null,
          parent: key
        }
      }
    },
    { new: true, safe: true }
  )
    .exec()
    .then((result) => res.json(result))
    .catch(console.error);
}

module.exports = addSubCategory;
