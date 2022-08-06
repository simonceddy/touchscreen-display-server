const { getKeyFromTitle } = require('../../util');
const baseMedia = require('./baseMedia');

// eslint-disable-next-line no-unused-vars
function createKey(doc) {
  // console.log(doc);
  const key = getKeyFromTitle(doc.title);
  if (!key || key.trim().length < 1) console.log(doc);
  return key;
}

const commonSchemaProps = {
  title: { type: String, required: true },
  key: {
    type: String, unique: true, index: true, sparse: true, default: createKey
  },
  thumbnail: baseMedia,
  archived: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
};

module.exports = commonSchemaProps;
