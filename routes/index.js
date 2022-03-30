const { Router } = require('express');
// const { Category, Item } = require('../db/models');

const router = Router();

router.get('/categories', (req, res) => res.json('categories'));

router.get('/category/:slug', (req, res) => (
  res.json(`category ${req.params.slug}`)
));

router.get('/category/:slug/item/:itemSlug', (req, res) => (
  res.json(`item ${req.params.itemSlug}`)
));

// TODO Handle optional sub-category routes

module.exports = router;
