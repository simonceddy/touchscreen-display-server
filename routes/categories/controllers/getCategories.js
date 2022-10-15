const { Category } = require('../../../db/models');
const getItemsFor = require('../../../util/db/getItemsFor');
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

        let subs;
        if (c.categories) {
          subs = await Promise.all(c.categories.map(async (s) => {
            const subItems = await getItemsFor(c.key, s.key);
            return {
              ...s.toObject(),
              items: subItems
            };
          }));
        }

        return {
          ...c.toObject(),
          items,
          categories: subs
        };
      }));
      return res.json(data);
    })
    .catch(console.error);
}

module.exports = getCategories;
