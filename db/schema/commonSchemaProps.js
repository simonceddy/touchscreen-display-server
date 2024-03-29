const { getKeyFromTitle } = require('../../util');
const baseMedia = require('./baseMedia');

// eslint-disable-next-line no-unused-vars
function createKey(doc, ...args) {
  // console.log('the doc........', args);
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
};

module.exports = commonSchemaProps;
