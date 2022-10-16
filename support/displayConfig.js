const fs = require('fs');
const path = require('path');
const config = require('../config');
const { DISPLAY_CONFIG_PATH } = require('./consts');

function displayConfig(collectionName = null) {
  const n = collectionName || config.db.collection;
  const fullpath = path.resolve(DISPLAY_CONFIG_PATH, `${n}-conf.json`);
  if (!fs.existsSync(fullpath)) {
    console.log('no display config found');
    return {};
  }
  const disConf = JSON.parse(fs.readFileSync(fullpath));
  return disConf;
}

module.exports = displayConfig;
