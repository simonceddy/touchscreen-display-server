const { Category } = require('../../../db/models');

function addSubCategory(req, res) {
  const { key } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }
  return Category.findOneAndUpdate(
    { key },
    { $push: { categories: { ...req.body } } },
    { new: true, safe: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch(console.error);
}

module.exports = addSubCategory;
