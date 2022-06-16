/* eslint-disable no-unused-vars */
const { Router } = require('express');
const fs = require('fs');
const genThumbnail = require('simple-thumbnail');
const { getMediaPath } = require('../util');

const mediaRouter = Router();

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

// TODO File upload and thumb generation
mediaRouter.post('/upload', (req, res) => {
  console.log(req.files);
  // if no files respond with message
  // else Validate files
  // create thumbnail for validated files
  res.json({
    successs: true,
    message: 'upload'
  });
});

// TODO validate or change how this works
mediaRouter.delete('/destroy/:filename(*)', (req, res) => {
  const fn = getMediaPath(req.params.filename);
  const thumb = getMediaPath(`thumbs/${req.params.filename}`);

  return res.json({
    message: 'delete!',
    filename: fn,
    thumb
  });
});

mediaRouter.get('/thumbs/:filename(*)', (req, res, next) => {
  const fn = getMediaPath(`thumbs/${req.params.filename}`);
  return respondWithFile(req, res, next, fn);
});

mediaRouter.get('/:filename(*)', (req, res, next) => {
  const fn = getMediaPath(req.params.filename);
  return respondWithFile(req, res, next, fn);
});

module.exports = mediaRouter;
