function findAndMakeItemResponse(key, items = []) {
  let index = 0;
  const lastKey = items.length - 1;
  if (lastKey < 0) return {};
  const item = items.find((i, id) => {
    if (i.key === key) {
      index = id;
      return true;
    }
    return false;
  });

  const next = index < lastKey && items[index + 1] ? items[index + 1].key : items[0].key;
  const prev = index > 0 && items[index - 1] ? items[index - 1].key : items[lastKey].key;

  const result = {
    ...item.toObject(),
    next,
    prev
  };
  // console.log(result);
  return result;
}

module.exports = findAndMakeItemResponse;
