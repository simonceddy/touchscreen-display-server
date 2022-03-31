const db = require('../db');

const itemSchema = new db.Schema({
  title: String,
  body: String,
  media: [{ src: String, alt: String }],
  // TODO slugs for subdocuments
  // slug: { type: String, slug: 'title', unique: true },
});

module.exports = itemSchema;
