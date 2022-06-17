const intformat = require('biguint-format');
const FlakeId = require('flake-idgen');

function getFlakeId() {
  const flakeIdGen1 = new FlakeId();
  return intformat(flakeIdGen1.next(), 'dec');
}

module.exports = getFlakeId;
