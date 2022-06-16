/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const imageThumbnail = require('image-thumbnail');
const genThumbnail = require('simple-thumbnail');
const { STORAGE_DIR } = require('../../support/consts');

const genVideoThumb = async (mediaPath, thumbPath) => {
  try {
    const thumb = await genThumbnail(mediaPath, thumbPath, '?x300');
    return thumb;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const genImageThumb = async (mediaPath, thumbPath) => {
  try {
    const thumb = await imageThumbnail(mediaPath);
    console.log(thumb);
    return thumb;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// TODO handle media type
async function makeThumbnail(src, type = 'image') {
  const mediaPath = path.resolve(STORAGE_DIR, src);
  const thumbPath = path.resolve(STORAGE_DIR, `thumbs/${src}.png`);
  if (fs.existsSync(mediaPath)) {
    if (!fs.existsSync(thumbPath)) {
      // TODO handle thumbnail generation for images - default for audio
      // TODO validate file type
      try {
        switch (type) {
          case 'video':
            await genVideoThumb(mediaPath, thumbPath);
            break;
          case 'audio':
            break;
          case 'image':
          default:
            console.log('attempt img thumb');
            await genImageThumb(mediaPath, thumbPath);
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    console.log('already done', thumbPath, fs.existsSync(mediaPath));
  }
  return false;
}

module.exports = makeThumbnail;
