const fs = require('fs');
const path = require('path');
const { STORAGE_DIR } = require('../support/consts');

const data = [
  { title: 'heaps', body: 'more', key: '0' },
  { title: 'lots', body: 'less', key: '1' },
  { title: 'many', body: 'few', key: '2' },
];

const dataPath = path.resolve(STORAGE_DIR, 'testData.json');

function storeTestData(newData = []) {
  fs.writeFileSync(dataPath, JSON.stringify(newData));
}

function setupTestData() {
  if (!fs.existsSync(dataPath)) storeTestData(data);
}

/**
 * Get all test data
 * @returns {array}
 */
function getTestData() {
  if (!fs.existsSync(dataPath)) setupTestData();
  return JSON.parse(fs.readFileSync(dataPath));
}

module.exports = {
  setupTestData, getTestData, storeTestData
};
