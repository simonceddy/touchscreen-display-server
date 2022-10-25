const { Category } = require('../../../db/models');
const saveItem = require('../../../util/db/saveItem');

async function addSubCategory(req, res) {
  const { key } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }

  // TODO transform body better
  // TODO addItems
  const result = await Category.findOneAndUpdate(
    { key },
    {
      $push: {
        categories: {
          title: req.body.title,
          thumbnail: req.body.thumbnail || null,
          parent: key
        }
      }
    },
    { new: true, safe: true }
  )
    .exec();
  console.log(result);
  const newSub = result.categories.find((c) => c.title === req.body.title.trim());
  if (!newSub) return res.json('an error occurred!');
  if (req.body.items) {
    await Promise.all(req.body.items.map(async (i) => {
      await saveItem({
        ...i,
        category: key,
        subCategory: newSub.key
      });
    }));
  }

  return res.json(result);
}

module.exports = addSubCategory;
