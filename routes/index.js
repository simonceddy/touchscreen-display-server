const { Router } = require('express');
const { Category } = require('../db/models');

const router = Router();

// List all categories
router.get('/categories', (req, res) => Category.find(null, 'title media')
  .exec()
  .then((results) => res.json(results))
  .catch(console.error));

// Get data for specific category
router.get('/category/:key', (req, res) => Category.findOne({
  key: req.params.key
})
  .exec()
  .then((result) => {
    // console.log({ ...result });
    res.json(result);
  })
  .catch(console.error));

// Get data for specific item from the given category
// TODO query from category item subdocuments
// TODO broken at present due to errors from subdocument slug generation
// At present just use category data and route items in frontend
// router.get('/category/:slug/item/:itemSlug', (req, res) => Item.findOne({
//   slug: req.params.itemSlug
// })
//   .exec()
//   .then((result) => res.json(result))
//   .catch(console.error));

// TODO Handle optional sub-category routes

module.exports = router;
