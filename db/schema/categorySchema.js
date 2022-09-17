/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const db = require('../db');
const baseCategory = require('./baseCategory');

const categorySchema = new db.Schema({
  ...baseCategory,
  archived: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  categories: [baseCategory],
});

module.exports = categorySchema;
