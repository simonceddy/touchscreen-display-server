const { Category } = require('../../../db/models');

function addItemToCategory(req, res) {
  // Add item to the given category
  // TODO use $push mongo operator
  const { key } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }
  return Category.findOneAndUpdate(
    { key },
    { $push: { items: { ...req.body } } },
    { new: true, safe: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch(console.error);
}

module.exports = addItemToCategory;
