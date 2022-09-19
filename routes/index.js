const express = require('express');
const categories = require('./categories');
const mediaRouter = require('./media');

const router = express.Router();
router.use('/api/category', categories);
router.use('/media', mediaRouter);
router.use(express.static('./client'));

router.use('/admin', express.static('./admin'));

module.exports = router;
