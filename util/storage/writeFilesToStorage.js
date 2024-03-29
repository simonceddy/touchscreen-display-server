const path = require('path');
const fs = require('fs');
const { STORAGE_DIR } = require('../../support/consts');
const getExtFromMime = require('../getExtFromMime');
const getFlakeId = require('../getFlakeId');
const getTypeFromMime = require('../getTypeFromMime');
const makeThumbnail = require('./makeThumbnail');

/**
 * Attempt to write files from an upload request to storage.
 * Generates thumbnails where appropriate.
 * @param {array} files Array of files from Request
 * @param {boolean} makeThumbnails If true generate thumbnails for files
 * @returns {object} Returns an object containing filepaths and any errors.
 */
function writeFilesToStorage(files = [], makeThumbnails = true) {
  const filepaths = {};
  const errors = {};
  files.map((f) => {
    console.log(f);
    if (f.mimetype) {
      // TODO validate file
      const ext = getExtFromMime(f.mimetype);
      if (ext) {
        const fn = `${getFlakeId()}.${ext}`;
        // TODO validate filepath
        const fullPath = path.resolve(STORAGE_DIR, fn);
        fs.writeFileSync(fullPath, f.data);
        filepaths[f.name] = fn;

        // If file is an image or video then generate a thumbnail
        const mediaType = getTypeFromMime(f.mimetype);
        if (makeThumbnails && mediaType !== null) {
          makeThumbnail(fn, mediaType)
            .then((r) => {
              if (!r) errors[f.name] = 'Error creating thumbnail.';
            })
            .catch((err) => { errors[f.name] = err.message; });
        }
      } else {
        errors[f.name] = 'Invalid file format.';
      }
    }
    return f;
  });
  return {
    filepaths,
    errors
  };
}

module.exports = writeFilesToStorage;
