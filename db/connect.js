const config = require('../config');
const db = require('./db');

async function connect() {
  const connectString = `${config.db.uri}/${config.db.collection}`;
  console.log(`Using collection '${config.db.collection}'`);
  await db.connect(connectString);
}

module.exports = connect;
