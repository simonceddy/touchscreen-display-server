const express = require('express');
const db = require('./db/db');
const { Category } = require('./db/models');
const routes = require('./routes');

async function connect() {
  await db.connect('mongodb://localhost:27017/display');
}

connect()
  .then(() => {
    console.log('Connected to MongoDB');
    const c = new Category({
      title: 'Test'
    });

    async function saveModel() {
      await c.save();
    }

    saveModel()
      .then((val) => console.log(val))
      .catch(console.error);

    const app = express();

    app.get('/', (req, res) => res.send('Helll'));

    app.use('/api', routes);

    app.listen(3030, () => console.log('App running at http://localhost:3030'));
  })
  .catch(console.error);
