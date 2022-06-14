const { Router } = require('express');
const { Category } = require('../../db/models');
// const { getKeyFromTitle, populateKeys } = require('../../util');

const router = Router();

// Placeholder for creating new categories
router.post('/create', (req, res) => {
  const {
    title, categories, items, thumbnail
  } = req.body;

  // If no title is set return an error message
  if (!title) {
    return res.json({
      message: 'title is required',
      success: false
    });
  }

  // TODO if set validate categories and items
  const newCategory = new Category({
    title,
    categories: categories || [],
    items: items || [],
    thumbnail: thumbnail || null,
  });

  return newCategory.save()
    .then((result) => {
      if (!result) {
        return res.json({
          message: 'error creating category',
          success: false
        });
      }
      return res.json({
        message: 'category created',
        success: true,
        category: newCategory
      });
    })
    .catch((e) => {
      console.error(e);
      return res.json({
        message: e.message,
        success: false,
        error: e,
      });
    });
});

// Placeholder for updating categories
router.put('/update/:key', (req, res) => {
  const { key } = req.params;
  Category.findOneAndUpdate({ key }, {
    ...req.body
  }).exec().then((result) => res.json({
    result,
    message: 'Updated category',
    success: true
  }))
    .catch((e) => res.json({
      message: e.message,
      success: false,
      error: e,
    }));
});

router.delete('/destroy/:key', (req, res) => {
  const { key } = req.params;
  return Category.findOneAndDelete({ key })
    .exec()
    .then((result) => res.json({
      result,
      message: 'Deleted category',
      success: true
    }))
    .catch((e) => res.json({
      message: e.message,
      success: false,
      error: e,
    }));
});

// TODO subcategory routing
// TODO item routing
// TODO move item category
// TODO move subcategory
// TODO archive category
// TODO archive subcategory
// TODO archive item
// TODO delete subcategory
// TODO delete item

router.put('/archive/:key', (req, res) => Category
  .findOneAndUpdate({ key: req.params.key }, { archived: true })
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
  })));

router.put('/unarchive/:key', (req, res) => Category
  .findOneAndUpdate({ key: req.params.key }, { archived: false })
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
  })));

// List all categories
router.get('/', (req, res) => Category.find(null, 'key title media thumbnail items')
  .exec()
  .then((results) => res.json(results))
  .catch(console.error));

// Get data for specific category
router.get('/:key', (req, res) => {
  if (req.query.subcategory) {
    return Category.findOne({
      key: req.params.key,
      categories: { $elemMatch: { key: req.query.subcategory } }
    })
      .exec()
      .then((result) => res.json(result))
      .catch(console.error);
  }
  return Category.findOne({
    key: req.params.key
  })
    .exec()
    .then((result) => {
      // console.log({ ...result });
      res.json(result);
    })
    .catch(console.error);
});

module.exports = router;
