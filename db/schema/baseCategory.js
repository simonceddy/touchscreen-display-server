const commonSchemaProps = require('./commonSchemaProps');
const itemSchema = require('./itemSchema');

const baseCategory = {
  ...commonSchemaProps,
  items: [itemSchema],
};

module.exports = baseCategory;
