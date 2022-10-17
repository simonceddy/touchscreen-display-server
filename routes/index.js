const express = require('express');
const displayConfig = require('../support/displayConfig');
const updateDisplayConf = require('../util/updateDisplayConf');
const categories = require('./categories');
const mediaRouter = require('./media');

const router = express.Router();
router.use('/api/category', categories);
router.use('/media', mediaRouter);
router.use(express.static('./client'));

router.use('/admin', express.static('./admin'));

router.get('/api/display-conf', (_req, res) => res.json(displayConfig));
router.put('/api/display-conf/update', (req, res) => res.json(updateDisplayConf(req.body)));

module.exports = router;
