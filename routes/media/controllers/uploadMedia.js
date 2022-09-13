const convertToBool = require('../../../util/convertToBool');
const { failResponse, getSuccessResponse, successResponse } = require('../../../util/httpUtils');
const writeFilesToStorage = require('../../../util/storage/writeFilesToStorage');

function uploadMedia(req, res) {
  // console.log(req.body, req.files);
  if (!req.files) return res.json(failResponse('No files!'));

  const makeThumbs = req.query.makeThumbnails
    ? convertToBool(req.query.makeThumbnails)
    : true;
  // Attempt to write all uploaded files to storage
  const { filepaths, errors } = writeFilesToStorage(
    Object.values(req.files),
    makeThumbs !== false
  );

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
}

module.exports = uploadMedia;
