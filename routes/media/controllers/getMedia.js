const { getMediaPath } = require('../../../util');
const respondWithFile = require('./respondWIthFile');

function getMedia(req, res, next) {
  const fn = getMediaPath(req.params.filename);
  return respondWithFile(req, res, next, fn);
}

module.exports = getMedia;
