const sharp = require('sharp');

const defaultOpts = {
  left: 0,
  top: 0,
  width: 400,
  height: 300,
};

function createThumb(img, opts = defaultOpts) {
  console.log(sharp, opts);
  return sharp(img)
    .extract({
      top: opts.top || 0,
      left: opts.left || 0,
      width: opts.width || 400,
      height: opts.height || 300,
    });
}

module.exports = createThumb;
