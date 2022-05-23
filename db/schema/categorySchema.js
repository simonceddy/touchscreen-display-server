/* eslint-disable func-names */
const db = require('../db');
const baseCategory = require('./baseCategory');

const categorySchema = new db.Schema({
  ...baseCategory,
  categories: [baseCategory],
});

// categorySchema.methods.getItems = function (cb) {
//   // console.log(this.slug);
//   return db.model('Item').find({ category: this.slug }, cb);
// };

module.exports = categorySchema;
