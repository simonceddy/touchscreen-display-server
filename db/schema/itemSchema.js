const db = require('../db');
const baseMedia = require('./baseMedia');

const itemSchema = new db.Schema({
  title: { type: String, required: true },
  body: String,
  media: [baseMedia],
  frontImg: baseMedia,
  key: { type: String, unique: true, required: true }
  // TODO slugs for subdocuments
  // slug: { type: String, slug: 'title', unique: true },
});

module.exports = itemSchema;
