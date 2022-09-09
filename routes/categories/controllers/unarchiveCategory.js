const { Category } = require('../../../db/models');

function unarchiveCategory(req, res) {
  return Category
    .findOneAndUpdate(
      { key: req.params.key },
      { archived: false },
      { returnDocument: 'after' }
    )
    .exec()
    .then((result) => res.json({
      message: 'Category unarchived',
      result,
      success: true
    }))
    .catch((e) => res.json({
      message: e.message,
      e,
      success: false
    }));
}

module.exports = unarchiveCategory;
