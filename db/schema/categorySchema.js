const { Schema } = require('mongoose');
const itemSchema = require('./itemSchema');

const categorySchema = new Schema({
  title: String,
  items: [itemSchema],
  slug: { type: String, slug: 'title' }
});

module.exports = categorySchema;
