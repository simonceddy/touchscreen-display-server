const fs = require('fs');
const { getMediaPath } = require('../../../util');

function deleteMedia(req, res) {
  const fn = getMediaPath(req.params.filename);
  const thumb = getMediaPath(`thumbs/${req.params.filename}`);
  // console.log(fn, thumb);
  let message = '';
  let success = false;
  if (fs.existsSync(fn)) {
    fs.rmSync(fn);
    message = `${fn} deleted`;
    success = true;
  } else {
    message = 'No file found';
  }
  if (fs.existsSync(thumb)) {
    fs.rmSync(thumb);
  }
  return res.json({
    message,
    filename: fn,
    thumb,
    success
  });
}

module.exports = deleteMedia;
