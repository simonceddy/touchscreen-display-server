function findAndMakeItemResponse(key, items = []) {
  let index = 0;
  const lastKey = items.length - 1;
  if (lastKey < 1) return {};
  const item = items.find((i, id) => {
    if (i.key === key) {
      index = id;
      return true;
    }
    return false;
  });

  const next = index < lastKey && items[index + 1] ? items[index + 1].key : null;
  const prev = index > 0 && items[index - 1] ? items[index - 1].key : null;

  return {
    ...item.toObject(),
    next,
    prev
  };
}

module.exports = findAndMakeItemResponse;
