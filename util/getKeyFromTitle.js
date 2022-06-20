const { camelCase } = require('lodash');

/**
 * Get a keyified string from the given title.
 *
 * Currently just transforms to camel-case with lodash.
 * @param {string} title The title to be keyified
 * @returns {string} The keyified title
 */
function getKeyFromTitle(title) {
  return camelCase(title);
}

module.exports = getKeyFromTitle;
