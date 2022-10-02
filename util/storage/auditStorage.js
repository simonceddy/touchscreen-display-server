/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const { Category } = require('../../db/models');
const { STORAGE_DIR } = require('../../support/consts');
const thumbsrc = require('./thumbsrc');

async function scanCategoryFiles() {
  console.log('here');
  const usedMedia = {};
  const addUsedMedia = (src) => {
    usedMedia[src] = src;
  };

  const scanCategory = (c) => {
    // console.log(c);
    if (c.thumbnail && c.thumbnail.src) {
      addUsedMedia(`thumbs/${thumbsrc(c.thumbnail.src)}`);
    }
    if (c.items && c.items.length > 0) {
      c.items.forEach((i) => {
        if (i.thumbnail && i.thumbnail.src) {
          addUsedMedia(`thumbs/${thumbsrc(i.thumbnail.src)}`);
        }
        if (i.media && i.media.length > 0) {
          i.media.forEach((m) => {
            if (m.src) addUsedMedia(m.src);
          });
        }
      });
    }
    if (c.categories) c.categories.map(scanCategory);
    return c;
  };
  try {
    const categories = await Category.find({}).exec();
    (categories.map(scanCategory));
    return usedMedia;
  } catch (e) {
    return console.error(e);
  }
}

const ignoreFiles = {

};

async function auditStorage() {
  const usedFiles = await scanCategoryFiles();
  const scanned = fs.readdirSync(STORAGE_DIR);
  const unusedFiles = {};
  scanned.forEach((fn) => {
    if (!ignoreFiles[fn]
      && !usedFiles[fn]
      && !fs.statSync(path.resolve(STORAGE_DIR, fn)).isDirectory()
    ) {
      unusedFiles[fn] = fn;
    }
  });
  return unusedFiles;
  // TODO placeholder - how to use with multiple collections for dev
}

module.exports = auditStorage;
