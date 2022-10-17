const fs = require('fs');
const path = require('path');
const config = require('../config');
const { DISPLAY_CONFIG_PATH } = require('./consts');

function initDisplayConf(collectionName = null) {
  const n = collectionName || config.db.collection;
  const fullpath = path.resolve(DISPLAY_CONFIG_PATH, `${n}-conf.json`);
  let loadedConf;
  if (!fs.existsSync(fullpath)) {
    console.log('no display config found');
    // return {};
    loadedConf = {
      collection: collectionName || config.db.collection
    };
    if (!fs.existsSync(DISPLAY_CONFIG_PATH)) {
      fs.mkdirSync(DISPLAY_CONFIG_PATH);
    }
    fs.writeFileSync(fullpath, JSON.stringify(loadedConf, null, '\t'));
  } else {
    loadedConf = JSON.parse(fs.readFileSync(fullpath));
  }
  return loadedConf;
}
const displayConfig = initDisplayConf();
module.exports = displayConfig;
