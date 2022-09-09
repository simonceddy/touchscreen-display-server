const { failResponse, getSuccessResponse, successResponse } = require('../../../util/httpUtils');
const writeFilesToStorage = require('../../../util/storage/writeFilesToStorage');

function uploadMedia(req, res) {
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
}

module.exports = uploadMedia;
