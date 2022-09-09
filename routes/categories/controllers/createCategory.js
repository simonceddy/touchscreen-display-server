const { Category } = require('../../../db/models');

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

  // TODO if set validate categories and items
  const newCategory = new Category({
    title,
    categories: categories || [],
    items: items || [],
    thumbnail: thumbnail || null,
  });

  return newCategory.save()
    .then((result) => {
      if (!result) {
        return res.json({
          message: 'error creating category',
          success: false
        });
      }
      return res.json({
        message: 'category created',
        success: true,
        category: newCategory
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
