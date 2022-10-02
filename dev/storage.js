require('dotenv').config();
const fs = require('fs');
const path = require('path');
const auditStorage = require('../util/storage/auditStorage');
const connect = require('../db/connect');
const { STORAGE_DIR } = require('../support/consts');
const config = require('../config');

connect()
  .then(() => {
    console.log('Connected to MongoDB');

    if (process.argv[2].toLowerCase() === 'audit') {
      console.log('Audit storage');
      auditStorage()
        .then((result) => {
          const fn = path.resolve(
            STORAGE_DIR,
            `${config.db.collection}.json`
          );
          fs.writeFile(fn, JSON.stringify(result, null, '\t'), {}, (err) => {
            if (err) console.error(err);
            process.exit(1);
          });
        });
    }
  });
