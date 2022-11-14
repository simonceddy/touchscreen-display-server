const express = require('express');
const { flattenDeep } = require('lodash');
const { Item } = require('../db/models');
const displayConfig = require('../support/displayConfig');
const { getThumbnailsForPreload } = require('../util/storage/getMediaForPreload');
const updateDisplayConf = require('../util/updateDisplayConf');
const categories = require('./categories');
const mediaRouter = require('./media');

const router = express.Router();
router.use('/api/category', categories);
router.use('/media', mediaRouter);
router.use(express.static('./client'));

router.use('/admin', express.static('./admin'));

router.get('/api/preload/thumbnails', async (_req, res) => {
  const results = await getThumbnailsForPreload();
  return res.json(results);
});

router.get('/api/preload/all', async (_req, res) => {
  const results = await Item.find(null, ['media']).exec();
  const srcs = flattenDeep(results.map((i) => {
    if (!i.media || i.media.length === 0) return null;
    return i.media
      .map((m) => (m.src ? `http://localhost:3030/media/${m.src}` : null))
      .filter((m) => m !== null);
  })
    .filter((m) => m !== null));
  return res.json(srcs);
});

router.get('/api/display-conf', (_req, res) => res.json(displayConfig));
router.put('/api/display-conf/update', (req, res) => res.json(updateDisplayConf(req.body)));

module.exports = router;
