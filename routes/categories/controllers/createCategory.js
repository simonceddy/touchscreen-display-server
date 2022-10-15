/* eslint-disable no-unused-vars */
const { Category } = require('../../../db/models');
const getItemsFor = require('../../../util/db/getItemsFor');
const saveItem = require('../../../util/db/saveItem');

function createCategory(req, res) {
  const {
    title, categories, items, thumbnail
  } = req.body;

  // If no title is set return an error message
  if (!title || !title.trim || title.trim().length === 0) {
    return res.json({
      message: 'title is required',
      success: false
    });
  }

  // TODO if set validate categories
  // TODO addItems
  const newCategory = new Category({
    title,
    categories: categories || [],
    // items: items || [],
    thumbnail: thumbnail || null,
  });

  return newCategory.save()
    .then(async (result) => {
      if (!result) {
        return res.json({
          message: 'error creating category',
          success: false
        });
      }

      if (items) {
        await Promise.all(items.map((item) => saveItem({
          title: item.title,
          body: item.body || null,
          media: item.media || [],
          category: result.key,
          subCategory: null,
          thumbnail: item.thumbnail || null
        })));
      }

      return res.json({
        message: 'category created',
        success: true,
        category: {
          ...result.toObject(),
        }
      });
    })
    .catch((e) => {
      console.error(e);
      return res.json({
        message: e.message,
        success: false,
        error: e,
      });
    });
}

module.exports = createCategory;
