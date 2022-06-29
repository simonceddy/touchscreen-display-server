const { snakeCase } = require('lodash');
const getFlakeId = require('./getFlakeId');

function getSafeFilename(filename = '') {
  const bits = filename.split('.');
  bits.pop();
  return `${snakeCase(bits.join(''))}-${getFlakeId()}`;
}

module.exports = getSafeFilename;
