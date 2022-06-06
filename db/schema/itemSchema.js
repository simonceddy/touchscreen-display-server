const db = require('../db');
const baseMedia = require('./baseMedia');

const itemSchema = new db.Schema({
  title: String,
  body: String,
  media: [baseMedia],
  frontImg: baseMedia,
  // TODO slugs for subdocuments
  // slug: { type: String, slug: 'title', unique: true },
});

module.exports = itemSchema;
