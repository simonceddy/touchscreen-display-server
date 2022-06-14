const { getKeyFromTitle } = require('../../util');
const baseMedia = require('./baseMedia');

// eslint-disable-next-line no-unused-vars
function createKey(doc) {
  return getKeyFromTitle(doc.title);
}

const commonSchemaProps = {
  title: { type: String, required: true },
  key: {
    type: String, unique: true, index: true, sparse: true, default: createKey
  },
  thumbnail: baseMedia,
  archived: { type: Boolean, default: false },
};

module.exports = commonSchemaProps;
