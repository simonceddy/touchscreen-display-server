/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const db = require('../db');
// const baseCategory = require('./baseCategory');
const commonSchemaProps = require('./commonSchemaProps');

const categorySchema = new db.Schema({
  ...commonSchemaProps,
  archived: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  categories: [{
    ...commonSchemaProps,
    parent: {
      type: String,
      default: (doc) => doc.key || null
    }
  }],
}, {
  methods: {
    getItems() {
      return db.model('Item').find({
        category: this.key,
        subCategory: null
      }).exec();
    }
  }
});

module.exports = categorySchema;
