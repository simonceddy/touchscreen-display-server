const db = require('./db');
const { categorySchema, itemSchema } = require('./schema');

const Item = db.model('item', itemSchema);
const Category = db.model('category', categorySchema);

module.exports = {
  Category,
  Item
};
