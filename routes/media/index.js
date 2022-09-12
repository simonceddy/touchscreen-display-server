/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deleteMedia, uploadMedia, getMedia } = require('./controllers');

const mediaRouter = Router();

// Upload files route
// Accepts compressed images and mp4 videos at present
// TODO more file validation
mediaRouter.post('/upload', uploadMedia);

// Temp file upload
mediaRouter.post('/temp', (req, res) => {

});

// TODO validate or change how this works
mediaRouter.delete('/destroy/:filename(*)', deleteMedia);

// Fetch the requested file from storage
mediaRouter.get('/:filename(*)', getMedia);

module.exports = mediaRouter;
