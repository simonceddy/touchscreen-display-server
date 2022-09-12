/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { Category } = require('../../db/models');
const findAndMakeItemResponse = require('../../util/findAndMakeItemResponse');
// const getCategoryQuery = require('../../util/getCategoryQuery');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  archiveCategory,
  unarchiveCategory,
  unpublishCategory,
  publishCategory,
  getCategories,
  getCategory
} = require('./controllers');

const updateOpts = { returnDocument: 'after' };

// CATEGORY API ROUTES
//
// TODO move item category route
// TODO move subcategory route

// Lower priority:

// Quality of life routes - existing routes can be worked to do these tasks
// TODO archive subcategory
// TODO archive item
// TODO delete subcategory
// TODO delete item

const router = Router();

// Create a new category
router.post('/create', createCategory);

// Update category
router.put('/update/:key', updateCategory);

// Delete category - cannot be undone
router.delete('/destroy/:key', deleteCategory);

// Archive a category to non-destructively remove it from the current display
router.put('/archive/:key', archiveCategory);

// Unarchive a category, returning it to the current display
router.put('/unarchive/:key', unarchiveCategory);

router.put('/publish/:key', publishCategory);

// Unpublish a category
router.put('/unpublish/:key', unpublishCategory);

// List all categories
router.get('/', getCategories);

// Get data for given category
router.get('/:key', getCategory);

// Direct route to given subcategory
// Returns object with a 'parent' property containing the parent category key
router.get('/:key/subCategory/:subKey', (req, res) => Category.findOne({
  key: req.params.key,
  categories: { $elemMatch: { key: req.params.subKey } }
})
  .exec()
  .then((result) => {
    console.log(req.params);
    if (!result) return res.json('Not found!');

    return res.json({
      parent: req.params.key,
      ...result.categories.find((i) => i.key === req.params.subKey).toObject()
    });
  })
  .catch(console.error));

router.put('/:key/item/update/:itemKey', (req, res) => Category
  .findOneAndUpdate({
    key: req.params.key,
    items: { $elemMatch: { key: req.params.itemKey } }
  }, {
    // TODO
    $set: {
      'items.$.title': req.body.title,
      'items.$.body': req.body.body,
      'items.$.media': req.body.media,
      'items.$.thumbnail': req.body.thumbnail
    }
  }, updateOpts)
  .exec()
  .then((result) => {
    res.json('updated');
    console.log(result);
  })
  .catch(console.error));

// DIRECT SUB UPDATE
router.put('/:key/subCategory/update/:sub', (req, res) => {
  console.log(req.body);
  Category
    .findOneAndUpdate({
      key: req.params.key,
      categories: { $elemMatch: { key: req.params.sub } }
    }, {
      $set: {
        'categories.$.title': req.body.title,
        'categories.$.items': req.body.items,
        'categories.$.thumbnail': req.body.thumbnail
      }
    }, updateOpts)
    .exec()
    .then((result) => {
      console.log(result);
      res.json('updated');
    })
    .catch(console.error);
});

// Direct route to given item
// Returns object with a 'category' property containing the parent category key
router.get('/:key/item/:itemKey', (req, res) => Category.findOne({
  key: req.params.key,
  items: { $elemMatch: { key: req.params.itemKey } }
})
  .exec()
  .then((result) => {
    if (!result) return res.json('Not found!');
    // console.log(result);
    const item = findAndMakeItemResponse(
      req.params.itemKey,
      result.items
    );
    console.log(item);
    return res.json({
      category: req.params.key,
      ...findAndMakeItemResponse(
        req.params.itemKey,
        result.items
      )
    });
  })
  .catch(console.error));
// And for sub-category items
router.get('/:key/subCategory/:subKey/item/:itemKey', (req, res) => Category.findOne({
  key: req.params.key,
  categories: {
    $elemMatch: {
      key: req.params.subKey,
      items: {
        $elemMatch: {
          key: req.params.itemKey
        }
      }
    }
  }
})
  .exec()
  .then((result) => {
    if (!result) return res.json('Not found!');
    return res.json({
      category: req.params.key,
      subCategory: req.params.subKey,
      ...findAndMakeItemResponse(
        req.params.itemKey,
        result.categories.find((s) => s.key === req.params.subKey).items
      )
    });
  })
  .catch(console.error));

router.put('/:key/addItem', (req, res) => {
  // Add item to the given category
  // TODO use $push mongo operator
  const { key } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }
  return Category.findOneAndUpdate(
    { key },
    { $push: { items: { ...req.body } } },
    { new: true, safe: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch(console.error);
});

router.put('/:key/addSubCategory', (req, res) => {
  const { key } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }
  return Category.findOneAndUpdate(
    { key },
    { $push: { categories: { ...req.body } } },
    { new: true, safe: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch(console.error);
});

router.delete('/:key/removeItem/:itemKey', (req, res) => {
  const { itemKey, key } = req.params;
  Category.findOneAndUpdate({ key }, {
    $pull: {
      items: { key: itemKey }
    }
  }, updateOpts)
    .exec()
    .then((result) => {
      console.log(result);
      res.json(`Deleted ${itemKey} from ${key}`);
    })
    .catch(console.error);
});

router.delete('/:key/removeSubCategory/:subCategoryKey', (req, res) => {
  const { subCategoryKey, key } = req.params;
  Category.findOneAndUpdate({ key }, {
    $pull: {
      categories: { key: subCategoryKey }
    }
  }, updateOpts)
    .exec()
    .then((result) => {
      console.log(result);
      res.json(`Deleted ${subCategoryKey} from ${key}`);
    })
    .catch(console.error);
});

module.exports = router;
