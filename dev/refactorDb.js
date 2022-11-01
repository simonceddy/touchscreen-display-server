require('dotenv').config();
const connect = require('../db/connect');
const { Category, Item } = require('../db/models');

async function refactorItem(item, category, subCategory) {
  const i = {
    ...item.toObject(),
    category: category.key,
    subCategory: subCategory ? subCategory.key : null
  };
  // eslint-disable-next-line no-underscore-dangle
  if (i._id) delete i._id;
  const model = new Item(i);
  // console.log(model);
  try {
    await model.save();
  } catch (e) {
    console.error(e.message, i.key);
  }
  return 1;
}

async function refactorItemsFrom(category, parent) {
  if (category.items && category.items[0]) {
    //
    await Promise.all(
      category.items
        .map((i) => refactorItem(i, parent || category, parent ? category : null))
    );
  }
  if (category.categories && category.categories[0]) {
    await Promise.all(
      category.categories
        .map((c) => refactorItemsFrom(c, category))
    );
  }
  return 1;
}

/**
 * Transform an old category to current db structure
 * @param {Category} category the old category
 */
function transformOldCategory(category) {
  const data = {
    key: category.key,
    title: category.title,
    thumbnail: category.thumbnail,
    archived: category.archived,
    published: category.published,
  };
  if (category.categories && category.categories.length > 0) {
    data.categories = category.categories.map((c) => ({
      thumbnail: c.thumbnail,
      title: c.title,
      parent: category.key,
      key: c.key,
    }));
  }
  return data;
}

connect()
  .then(async () => {
    console.log('connected to mongodb');
    const results = await Category.find().exec();
    // console.log(results);
    await Promise.all(results.map(async (c) => {
      await refactorItemsFrom(c);
      await c.update(transformOldCategory(c)).exec();
      return c;
    }));
  })
  .then(() => {
    process.exit(1);
  })
  .catch(console.error);
