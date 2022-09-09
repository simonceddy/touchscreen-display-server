const { Category } = require('../../../db/models');

function updateCategory(req, res) {
  const { key } = req.params;
  Category.findOneAndUpdate({ key }, {
    ...req.body
  }, { returnDocument: 'after' }).exec().then((result) => res.json({
    result,
    message: 'Updated category',
    success: true
  }))
    .catch((e) => res.json({
      message: e.message,
      success: false,
      error: e,
    }));
}

module.exports = updateCategory;
