const config = {
  port: process.env.APP_PORT || 3030,
  host: process.env.APP_HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ALLOW_ORIGIN || 'http://localhost:3000'
  },
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017',
    collection: process.env.DB_NAME || 'display'
  }
};

module.exports = config;
