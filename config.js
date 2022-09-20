const winston = require('winston');
const path = require('path');

const config = {
  port: process.env.APP_PORT || 3030,
  host: process.env.APP_HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ALLOW_ORIGIN || [
      'http://localhost:3000',
      'http://localhost:3001'
    ]
  },
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017',
    collection: process.env.DB_NAME || 'display'
  },
  logger: () => ({
    transports: [
      // new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(__dirname, 'storage/logs/app.log'),
        maxsize: 200000
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    expressFormat: true,
    colorize: true,
  })
};

module.exports = config;
