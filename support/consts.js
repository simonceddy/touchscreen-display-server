const path = require('path');

/**
 * The fully resolved path to the storage directory
 * @var {string} STORAGE_DIR
 */
const STORAGE_DIR = path.resolve(`${__dirname}/../storage`);

const CATEGORY_BASE_URL = '';

module.exports = {
  STORAGE_DIR,
  CATEGORY_BASE_URL
};
