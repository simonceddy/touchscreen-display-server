const { Category } = require('../../../db/models');

function unpublishCategory(req, res) {
  return Category
    .findOneAndUpdate(
      { key: req.params.key },
      { published: false },
      { returnDocument: 'after' }
    )
    .exec()
    .then((result) => res.json({
      message: 'Category unpublished',
      result,
      success: true
    }))
    .catch((e) => res.json({
      message: e.message,
      e,
      success: false
    }));
}

module.exports = unpublishCategory;
