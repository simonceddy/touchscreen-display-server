const db = require('../db');
const baseMedia = require('./baseMedia');
const commonSchemaProps = require('./commonSchemaProps');

const itemSchema = new db.Schema({
  ...commonSchemaProps,
  body: String,
  media: [baseMedia],
  category: { type: String, default: null },
  subCategory: { type: String, default: null }
});

module.exports = itemSchema;
