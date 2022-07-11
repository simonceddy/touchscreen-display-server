require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('./config');
const routes = require('./routes');
const mediaRouter = require('./routes/media');
const connect = require('./db/connect');

// TODO handle app while/if fails connecting
connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(console.error);

// TODO add authentication for admin client
const app = express();
app.use(cors(config.cors));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

app.use((req, _res, next) => {
  console.log(req.url);
  next();
});

// app.get('/', (_req, res) => res.send('api dev'));
app.use(express.static('./client'));

app.use('/api', routes);
app.use('/media', mediaRouter);

app.listen(
  config.port,
  () => console.log(`App running at ${config.host}:${config.port}`)
);
