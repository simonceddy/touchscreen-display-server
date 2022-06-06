const baseMedia = require('./baseMedia');
const itemSchema = require('./itemSchema');

const baseCategory = {
  title: { type: String, required: true },
  key: { type: String, unique: true, required: true },
  items: [itemSchema],
  frontImg: baseMedia
};

module.exports = baseCategory;
