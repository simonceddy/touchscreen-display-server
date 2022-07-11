const db = require('./db');
const { categorySchema, /* itemSchema */ } = require('./schema');

// const Item = db.model('Item', itemSchema);
const Category = db.model('Category', categorySchema);

module.exports = {
  Category,
  // Item
};
