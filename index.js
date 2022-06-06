const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./db/db');
const routes = require('./routes');

async function connect() {
  await db.connect('mongodb://localhost:27017/display');
}

connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error);

const app = express();
app.use(cors({
  origin: 'http://localhost'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Helll'));

app.use('/api', routes);

app.listen(
  config.port,
  () => console.log(`App running at http://localhost:${config.port}`)
);
