// const winston = require('winston');
const expressWinston = require('express-winston');

function logger(config = {}) {
  return expressWinston.logger(config);
}
module.exports = logger;
