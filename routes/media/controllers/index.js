/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs');
const { STORAGE_DIR } = require('../../../support/consts');
const { failResponse, successResponse } = require('../../../util/httpUtils');
const deleteMedia = require('./deleteMedia');
const getMedia = require('./getMedia');
const uploadMedia = require('./uploadMedia');

const thumbDir = path.resolve(STORAGE_DIR, 'thumbs');

function uploadThumbnail(req, res) {
  // console.log(req.body, req.files);
  if (!req.files) return res.json(failResponse('No files!'));
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);
  const results = {};
  const errors = {};
  const files = Object.values(req.files);
  files.forEach((f) => {
    console.log(f);
    try {
      fs.writeFileSync(`${thumbDir}/${f.name}`, f.data);
    } catch (e) {
      errors[f.name] = e.message;
    }
    results[f.name] = true;
  });

  return res.json({
    results,
    errors
  });
}

module.exports = {
  deleteMedia,
  getMedia,
  uploadMedia,
  uploadThumbnail,
};
