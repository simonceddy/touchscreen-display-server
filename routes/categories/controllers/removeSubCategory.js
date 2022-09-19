const { Category } = require('../../../db/models');

function removeSubCategory(req, res) {
  const { subCategoryKey, key } = req.params;
  Category.findOneAndUpdate({ key }, {
    $pull: {
      categories: { key: subCategoryKey }
    }
  }, { returnDocument: 'after' })
    .exec()
    .then((result) => {
      console.log(result);
      res.json(`Deleted ${subCategoryKey} from ${key}`);
    })
    .catch(console.error);
}

module.exports = removeSubCategory;
