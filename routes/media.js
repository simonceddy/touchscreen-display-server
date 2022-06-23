/* eslint-disable no-unused-vars */
const { Router } = require('express');
const fs = require('fs');
const {
  getMediaPath,
} = require('../util');
const {
  failResponse, getSuccessResponse, successResponse
} = require('../util/httpUtils');
const writeFilesToStorage = require('../util/storage/writeFilesToStorage');

const mediaRouter = Router();

/**
 * Convenience method for sending a file response
 * @param {import('express').Request} req HTTP Request
 * @param {import('express').Response} res HTTP Response
 * @param {Function} next middleware that is called if error
 * @param {string} filename path to file to send
 * @returns {*}
 */
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

// Upload files route
// Accepts compressed images and mp4 videos at present
// TODO more file validation
mediaRouter.post('/upload', (req, res) => {
  console.log(req.body, req.files);
  if (!req.files) return res.json(failResponse('No files!'));

  // Attempt to write all uploaded files to storage
  const { filepaths, errors } = writeFilesToStorage(Object.values(req.files));

  // If any errors, respond with error and success details to client
  const eLen = Object.keys(errors).length;
  if (eLen > 0) {
    return res.json(getSuccessResponse(
      'Some errors were generated',
      null,
      { errors, filepaths }
    ));
  }

  // Else respond that all succeeded
  return res.json(successResponse('Files uploaded', { filepaths, errors }));
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

// Fetch the requested file from storage
mediaRouter.get('/:filename(*)', (req, res, next) => {
  const fn = getMediaPath(req.params.filename);
  return respondWithFile(req, res, next, fn);
});

// TODO Fairly certain this route is pointless - kept here just in  case
// mediaRouter.get('/thumbs/:filename(*)', (req, res, next) => {
//   const fn = getMediaPath(`thumbs/${req.params.filename}`);
//   return respondWithFile(req, res, next, fn);
// });

module.exports = mediaRouter;
