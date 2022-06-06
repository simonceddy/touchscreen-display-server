const { camelCase } = require('lodash');

function getKeyFromTitle(title) {
  return camelCase(title);
}

module.exports = getKeyFromTitle;
