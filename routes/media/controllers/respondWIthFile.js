const fs = require('fs');

/**
 * Convenience method for sending a file response
 * @param {import('express').Request} req HTTP Request
 * @param {import('express').Response} res HTTP Response
 * @param {Function} next middleware that is called if error
 * @param {string} filename path to file to send
 * @returns {*}
 */
const respondWithFile = (_req, res, next, filename) => {
  if (!filename || fs.lstatSync(filename).isDirectory()) {
    res.sendStatus(404);
  } else {
    res.sendFile(filename, (err) => {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', filename);
      }
    });
  }
};

module.exports = respondWithFile;
