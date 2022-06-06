const { Router } = require('express');
const categories = require('./categories');

const router = Router();
router.use('/category', categories);

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
