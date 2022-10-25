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
        filename: path.join(__dirname, 'logs/app.log'),
        maxsize: 2000000
      }),
    ],
    // format: winston.format.combine(
    //   winston.format.colorize(),
    //   winston.format.json()
    // ),
    formatter(options) {
      // - Return string will be passed to logger.
      // - Optionally, use options.colorize(options.level, <string>) to
      //   colorize output based on the log level.
      return `${options.timestamp()} ${
        config.colorize(options.level, options.level.toUpperCase())} ${
        options.message ? options.message : ''
      }${options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : ''}`;
    },
    // meta: true,
    expressFormat: true,
    colorize: true,
  })
};

module.exports = config;
