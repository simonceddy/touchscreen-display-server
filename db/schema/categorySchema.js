/* eslint-disable func-names */
const db = require('../db');
const itemSchema = require('./itemSchema');

const categorySchema = new db.Schema({
  title: String,
  items: [itemSchema],
  slug: { type: String, slug: 'title', unique: true },
  media: [] // placeholder field for front page image
});

// categorySchema.methods.getItems = function (cb) {
//   // console.log(this.slug);
//   return db.model('Item').find({ category: this.slug }, cb);
// };

module.exports = categorySchema;
