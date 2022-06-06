const { Router } = require('express');
const { Category } = require('../../db/models');
const { getKeyFromTitle, populateKeys } = require('../../util');

const router = Router();

// Placeholder for creating new categories
router.post('/create', (req, res) => {
  const {
    title, categories, items, frontImg
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
    key: getKeyFromTitle(title),
    categories: categories ? populateKeys(...categories) : [],
    items: items ? populateKeys(...items) : [],
    frontImg: frontImg || null,
  });
  console.log(newCategory);
  // TODO persist category

  return res.json({
    message: 'category created',
    success: true,
    category: newCategory
  });
});

// Placeholder for updating categories
router.put('/update/:key', (req, res) => {
  console.log(req.body);
  res.json('update category');
});

// List all categories
router.get('/', (req, res) => Category.find(null, 'title media')
  .exec()
  .then((results) => res.json(results))
  .catch(console.error));

// Get data for specific category
router.get('/:key', (req, res) => Category.findOne({
  key: req.params.key
})
  .exec()
  .then((result) => {
    // console.log({ ...result });
    res.json(result);
  })
  .catch(console.error));

module.exports = router;
