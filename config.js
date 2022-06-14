const config = {
  port: process.env.APP_PORT || 3030,
  host: process.env.APP_HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ALLOW_ORIGIN || 'http://localhost'
  },
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/display'
  }
};

module.exports = config;
