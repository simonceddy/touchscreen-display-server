/* eslint-disable no-unused-vars */
const { Router } = require('express');
const displayConfig = require('../../support/displayConfig');
const { getMediaPath } = require('../../util');
const {
  deleteMedia,
  uploadMedia,
  getMedia,
  uploadThumbnail
} = require('./controllers');
const respondWithFile = require('./controllers/respondWIthFile');

const mediaRouter = Router();

// Upload files route
// Accepts compressed images and mp4 videos at present
// TODO more file validation
mediaRouter.post('/upload', uploadMedia);

// Temp file upload
mediaRouter.post('/temp', (req, res) => {

});

mediaRouter.post('/thumbnail/upload', uploadThumbnail);

// TODO validate or change how this works
mediaRouter.delete('/destroy/:filename(*)', deleteMedia);

mediaRouter.get('/bgImg', (req, res, next) => {
  if (displayConfig['background-image']) {
    return respondWithFile(
      req,
      res,
      next,
      getMediaPath(displayConfig['background-image'])
    );
  }
  return respondWithFile(req, res, next, getMediaPath('Image2-bright.jpg'));
});

// Fetch the requested file from storage
mediaRouter.get('/:filename(*)', getMedia);

module.exports = mediaRouter;
