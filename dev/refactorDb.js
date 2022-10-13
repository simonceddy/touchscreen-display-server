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

connect()
  .then(() => {
    console.log('connected to mongodb');
    return Category.find().exec()
      .then(async (results) => {
        // console.log(results);
        await Promise.all(results.map((c) => refactorItemsFrom(c)));
      });
  })
  .then(() => {
    process.exit(1);
  })
  .catch(console.error);
