/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const db = require('../db');
const baseCategory = require('./baseCategory');

const categorySchema = new db.Schema({
  ...baseCategory,
  categories: [baseCategory],
});

module.exports = categorySchema;
