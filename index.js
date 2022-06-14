require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('./config');
const db = require('./db/db');
const routes = require('./routes');

async function connect() {
  await db.connect(config.db.uri);
}

// TODO handle app while/if fails connecting
connect()
  .then(() => {
    console.log('Connected to MongoDB');
    // TODO remove dropCollection for production
    // db.connection.dropCollection('categories')
    //   .then(() => console.log('db reset'))
    //   .catch(console.error);
  })
  .catch(console.error);

const app = express();
app.use(cors(config.cors));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/', (req, res) => res.send('Helll'));

app.use('/api', routes);

app.listen(
  config.port,
  () => console.log(`App running at ${config.host}:${config.port}`)
);
