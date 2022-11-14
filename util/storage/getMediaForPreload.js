const { Item } = require('../../db/models');
const thumbsrc = require('./thumbsrc');

async function getThumbnailsForPreload() {
  const thumbs = await Item.find(null, ['thumbnail']).exec();
  console.log(thumbs);
  return thumbs
    .map((i) => (i.thumbnail ? `http://localhost:3030/media/thumbs/${thumbsrc(i.thumbnail.src)}` : null))
    .filter((t) => t !== null);
}

async function getMediaForPreload(category, subCategory = null) {
  const medias = await Item.find({
    category,
    subCategory
  }, ['media']).exec();
  console.log(medias);
}

module.exports = {
  getMediaForPreload,
  getThumbnailsForPreload
};
