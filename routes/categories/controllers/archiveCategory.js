const { Category } = require('../../../db/models');

function archiveCategory(req, res) {
  return Category
    .findOneAndUpdate(
      { key: req.params.key },
      { archived: true },
      { returnDocument: 'after' }
    )
    .exec()
    .then((result) => res.json({
      message: 'Category archived',
      result,
      success: true
    }))
    .catch((e) => res.json({
      message: e.message,
      e,
      success: false
    }));
}

module.exports = archiveCategory;
