const { Schema } = require('mongoose');

const itemSchema = new Schema({
  title: String,
  body: String,
  media: [{ src: String, alt: String }],
  slug: { type: String, slug: 'title' }
});

module.exports = itemSchema;
