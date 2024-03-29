/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const imageThumbnail = require('image-thumbnail');
const genThumbnail = require('simple-thumbnail');
const { STORAGE_DIR } = require('../../support/consts');
const recursiveMkdir = require('./recusriveMkdir');

const thumbDir = path.resolve(STORAGE_DIR, 'thumbs');

const genVideoThumb = async (mediaPath, thumbPath) => {
  try {
    const thumb = await genThumbnail(mediaPath, `${thumbPath}.png`, '400x300');
    return thumb;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const genImageThumb = async (mediaPath, thumbPath, opts = {}) => {
  try {
    const thumb = await imageThumbnail(mediaPath, {
      fit: 'cover',
      height: opts.height || 300,
      width: opts.width || 400,
    });
    fs.writeFileSync(thumbPath, thumb);
    return thumb;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// TODO handle media type better
/**
 * Make Thumbnail
 * @param {string} src The path to the source file
 * @param {string} type The type of media
 * @return {Promise<boolean>}
 */
async function makeThumbnail(src, type = 'image', opts = {}) {
  const mediaPath = path.resolve(STORAGE_DIR, src);
  const thumbPath = path.resolve(thumbDir, src);
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);
  if (src.includes('/')) {
    const bits = src.split('/');
    bits.pop();
    recursiveMkdir(thumbDir, bits);
  }
  if (fs.existsSync(mediaPath)) {
    if (!fs.existsSync(thumbPath)) {
      // TODO validate file type
      try {
        switch (type) {
          case 'video':
            await genVideoThumb(mediaPath, thumbPath);
            break;
          case 'image':
          default:
            await genImageThumb(mediaPath, thumbPath, opts);
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    // console.log('already done', thumbPath, fs.existsSync(mediaPath));
  }
  return false;
}

module.exports = makeThumbnail;
