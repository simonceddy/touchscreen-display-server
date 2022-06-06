/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./db/db');
const { Category, Item } = require('./db/models');
const routes = require('./routes');

function saveModels() {
  const c = new Category({
    title: 'Test',
    key: 'test',
    items: [
      new Item({
        title: 'Test item',
      }),
      new Item({
        title: 'Another Test item',
      }),
    ]
  });

  async function saveModel() {
    const r = await c.save();
    return r;
  }

  saveModel()
    .then((val) => console.log(val))
    .catch(console.error);
}

async function connect() {
  await db.connect('mongodb://localhost:27017/display');
}

connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Helll'));

app.use('/api', routes);

app.listen(
  config.port,
  () => console.log(`App running at http://localhost:${config.port}`)
);
