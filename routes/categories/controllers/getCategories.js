const { Category } = require('../../../db/models');
const getCategoryQuery = require('../../../util/getCategoryQuery');

function getCategories(req, res) {
  const { query } = req;
  console.log(query);
  return Category.find(getCategoryQuery(query))
    .exec()
    .then((results) => res.json(results))
    .catch(console.error);
}

module.exports = getCategories;
