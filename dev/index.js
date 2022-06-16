const db = require('../db/db');
const config = require('../config');
const setupDataset = require('./setupDataset');
const data = require('./vstDataset.json');

async function connect() {
  await db.connect(config.db.uri);
}

connect()
  .then(() => {
    console.log('Connected to MongoDB');
    // TODO remove dropCollection for production
    console.log(db.connection.collections);
    return db.connection.dropCollection('categories');
  })
  .then(() => {
    console.log('db reset');
    return setupDataset(Object.values(data.categories));
  })
  .then(() => process.exit(0))
  .catch(console.error);
