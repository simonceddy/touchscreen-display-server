const baseMedia = require('./baseMedia');
const itemSchema = require('./itemSchema');

const baseCategory = {
  title: String,
  key: String,
  items: [itemSchema],
  frontImg: baseMedia
};

module.exports = baseCategory;
