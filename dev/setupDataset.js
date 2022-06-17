const makeThumbnail = require('../util/storage/makeThumbnail');

async function handleCategory(category) {
  if (category.thumbnail && category.thumbnail.src) {
    await makeThumbnail(category.thumbnail.src, 'image');
  }
  if (category.items) {
    await Promise.all(category.items.map(async (i) => {
      if (i.thumbnail && i.thumbnail.src) {
        await makeThumbnail(i.thumbnail.src, 'image');
      }
      if (i.media) {
        await Promise.all(i.media.map(({ src, type }) => makeThumbnail(src, type)));
      }
      return i;
    }));
  }
  if (category.categories) {
    await Promise.all(category.categories.map(handleCategory));
  }
  return category;
}

function setupDataset(categories = []) {
  return Promise.all(categories.map(handleCategory));
}

module.exports = setupDataset;
