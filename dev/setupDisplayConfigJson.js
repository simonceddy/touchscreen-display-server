/* eslint-disable no-unused-vars */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const connect = require('../db/connect');
const { DISPLAY_CONFIG_PATH } = require('../support/consts');

connect()
  .then(() => {
    console.log('connected to mongo');
    if (!fs.existsSync(DISPLAY_CONFIG_PATH)) {
      console.log('no config found');
    }
  })
  .then(() => {
    process.exit(1);
  })
  .catch(console.error);
