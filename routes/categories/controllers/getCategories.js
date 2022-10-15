const { Category } = require('../../../db/models');
const getCategoryQuery = require('../../../util/getCategoryQuery');

function getCategories(req, res) {
  const { query } = req;
  console.log(query);
  return Category.find(getCategoryQuery(query))
    .exec()
    .then(async (results) => {
      if (!results) {
        return res.json('an error has occurred');
      }
      const data = await Promise.all(results.map(async (c) => {
        const items = await c.getItems();
        return {
          ...c.toObject(),
          items
        };
      }));
      return res.json(data);
    })
    .catch(console.error);
}

module.exports = getCategories;
