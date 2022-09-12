const { Category } = require('../../../db/models');

function publishCategory(req, res) {
  return Category
    .findOneAndUpdate(
      { key: req.params.key },
      { published: true },
      { returnDocument: 'after' }
    )
    .exec()
    .then((result) => res.json({
      message: 'Category published',
      result,
      success: true
    }))
    .catch((e) => res.json({
      message: e.message,
      e,
      success: false
    }));
}

module.exports = publishCategory;
