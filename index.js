require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('./config');
const routes = require('./routes');
const connect = require('./db/connect');
const logger = require('./support/logger');
const displayConfig = require('./support/displayConfig');

// TODO handle app while/if fails connecting
connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(console.error);

// TODO add authentication for admin client
const app = express();
console.log(displayConfig);
// Register middleware
app.use(logger(config.logger()));
app.use(cors(config.cors));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use((req, _res, next) => {
  console.log(req.url);
  next();
});

// Register routes
app.use(routes);

// Start app
app.listen(
  config.port,
  () => console.log(`App running at ${config.host}:${config.port}`)
);
