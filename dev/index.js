/* eslint-disable no-unused-vars */
require('dotenv').config();
const db = require('../db/db');
const setupDataset = require('./setupDataset');
const data = require('./vstDataset.json');
const { Category } = require('../db/models');
const connect = require('../db/connect');
// const getFlakeId = require('../util/getFlakeId');

// console.info(getFlakeId());

function populateDb() {
  connect()
    .then(() => {
      console.log('Connected to MongoDB');
      // TODO remove dropCollection for production
      return db.connection.dropCollection('categories');
    })
    .then(() => {
      console.log('db reset');
      return setupDataset(Object.values(data.categories));
    })
    .then((r) => Promise.all(r.map(async (c) => {
      const {
        title, categories, items, thumbnail
      } = c;

      const newCategory = new Category({
        title,
        categories: categories || [],
        items: items || [],
        thumbnail: thumbnail || null,
      });

      const result = await newCategory.save();
      return result;
    })))
    // .then((r) => console.log(r))
    .then(() => process.exit(0))
    .catch(console.error);
}

populateDb();
