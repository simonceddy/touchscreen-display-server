const { Router } = require('express');
const fs = require('fs');
const getMediaPath = require('../resources');

const router = Router();

const respondWithFile = (req, res, next, filename) => {
  if (!filename || fs.lstatSync(filename).isDirectory()) {
    return res.sendStatus(404);
  }
  return res.sendFile(filename, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', req.params.filename);
    }
  });
};

router.get('/thumbs/:filename', (req, res, next) => {
  const fn = getMediaPath(`thumbs/${req.params.filename}`);
  return respondWithFile(req, res, next, fn);
});

router.get('/:filename', (req, res, next) => {
  const fn = getMediaPath(req.params.filename);
  return respondWithFile(req, res, next, fn);
});

module.exports = router;
