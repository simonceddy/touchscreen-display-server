const db = require('../db');
const baseMedia = require('./baseMedia');
const commonSchemaProps = require('./commonSchemaProps');

const itemSchema = new db.Schema({
  ...commonSchemaProps,
  body: String,
  media: [baseMedia],
  // TODO slugs for subdocuments
  // slug: { type: String, slug: 'title', unique: true },
});

module.exports = itemSchema;
