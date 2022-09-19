const winston = require('winston');

const config = {
  port: process.env.APP_PORT || 3030,
  host: process.env.APP_HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ALLOW_ORIGIN || 'http://localhost:3000'
  },
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017',
    collection: process.env.DB_NAME || 'display'
  },
  logger: {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'storage/logs/app.log',
        maxsize: 20000
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    // meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    // expressFormat: true,
    colorize: true,
  }
};

module.exports = config;
