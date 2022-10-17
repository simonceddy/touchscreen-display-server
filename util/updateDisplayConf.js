const fs = require('fs');
const path = require('path');
const { DISPLAY_CONFIG_PATH } = require('../support/consts');
const displayConfig = require('../support/displayConfig');

function updateDisplayConf(data) {
  const newConf = { ...displayConfig, ...data };
  const n = displayConfig.collection;
  const fullpath = path.resolve(DISPLAY_CONFIG_PATH, `${n}-conf.json`);
  fs.writeFileSync(fullpath, JSON.stringify(newConf, null, '\t'));
  return newConf;
}

module.exports = updateDisplayConf;
