const { Category } = require('../../../db/models');

function deleteCategory(req, res) {
  const { key } = req.params;

  // TODO media cleanup
  return Category.findOneAndDelete({ key })
    .exec()
    .then((result) => res.json({
      result,
      message: 'Deleted category',
      success: true
    }))
    .catch((e) => res.json({
      message: e.message,
      success: false,
      error: e,
    }));
}

module.exports = deleteCategory;
