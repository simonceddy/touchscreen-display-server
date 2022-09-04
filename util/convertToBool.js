function convertToBool(val) {
  const t = typeof val;
  if (t === 'boolean') return val;
  if (t === 'undefined') return false;
  if (t === 'number') return val > 0;
  if (t === 'string') return val.toLowerCase() === 'true';
  return false;
}

module.exports = convertToBool;
