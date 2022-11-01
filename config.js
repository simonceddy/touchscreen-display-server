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
        level: 'info',
        maxsize: 2000000,
        maxFiles: 20,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        )
      }),
      new winston.transports.File({
        level: 'warn',
        filename: path.join(__dirname, 'logs/error.log'),
        maxsize: 2000000,
        maxFiles: 20,
        handleExceptions: true,
        handleRejections: true,
        // format: winston.format.combine(
        //   winston.format.timestamp(),
        //   winston.format.errors(),
        //   winston.format.metadata()
        // )
      })
    ],
    // format: winston.format.combine(
    //   winston.format.colorize(),
    //   winston.format.json()
    // ),
    // formatter(options) {
    //   // - Return string will be passed to logger.
    //   // - Optionally, use options.colorize(options.level, <string>) to
    //   //   colorize output based on the log level.
    //   return `${options.timestamp()} ${options.level.toUpperCase()} ${
    //     options.message ? options.message : ''
    //   }`;
    // },
    // meta: true,
    expressFormat: true,
    // colorize: true,
  })
};

module.exports = config;
