/* eslint-disable no-unused-vars */
const { Router } = require('express');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  archiveCategory,
  unarchiveCategory,
  unpublishCategory,
  publishCategory,
  getCategories,
  getCategory,
  getSubCategory,
  updateItem,
  updateSubCategory,
  getItem,
  getItemFromSubCategory,
  addItemToCategory,
  addSubCategory,
  removeItemFromCategory,
  removeSubCategory,
} = require('./controllers');

// CATEGORY API ROUTES
//
// TODO move item category route
// TODO move subcategory route

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
router.get('/:key/subCategory/:subKey', getSubCategory);

router.put('/:key/item/update/:itemKey', updateItem);
router.put('/:key/subCategory/:subKey/item/update/:itemKey', updateItem);

// DIRECT SUB UPDATE
router.put('/:key/subCategory/update/:sub', updateSubCategory);

// Direct route to given item
// Returns object with a 'category' property containing the parent category key
router.get('/:key/item/:itemKey', getItem);
// And for sub-category items

// TODO add direct subcategory nested item update route
router.get('/:key/subCategory/:subKey/item/:itemKey', getItem);

router.put('/:key/addItem', addItemToCategory);
router.put('/:key/subCategory/:subKey/addItem', addItemToCategory);

router.put('/:key/addSubCategory', addSubCategory);

router.delete('/:key/removeItem/:itemKey', removeItemFromCategory);

router.delete('/:key/removeSubCategory/:subCategoryKey', removeSubCategory);

module.exports = router;
