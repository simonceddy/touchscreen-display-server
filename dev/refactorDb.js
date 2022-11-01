require('dotenv').config();
const connect = require('../db/connect');
const { Category, Item } = require('../db/models');

async function refactorItem(item, category, subCategory) {
  // console.log(item);
  if (subCategory) console.log(item);
  const i = {
    ...item,
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
  // if (parent) console.log(parent);
  if (category.items && category.items[0]) {
    //
    await Promise.all(
      category.items
        .map((i) => refactorItem(i, parent || category, parent ? category : null))
    );
  }
  if (category.categories && category.categories[0]) {
    console.log('handle sub items');
    await Promise.all(
      category.categories
        .map(async (c) => {
          console.log(c);
          const sub = c.toObject ? c.toObject() : c;
          await refactorItemsFrom(sub, category);
        })
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
    const results = await Category.find(undefined,).exec();
    // console.log(results);
    await Promise.all(results.map(async (c) => {
      // console.log(results);
      // console.log(c.key);
      if (typeof c.toObject !== 'function') {
        console.log(c);
        return false;
      }
      await refactorItemsFrom(c.toObject());
      return c;
    }));
  })
  .then(() => {
    process.exit(1);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
