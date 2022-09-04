const convertToBool = require('./convertToBool');

function getCategoryQuery(q = {}) {
  if (Object.keys(q).length === 0) return null;
  const query = {};
  if (q.published !== undefined) {
    query.published = convertToBool(q.published);
  }
  if (q.archived !== undefined) {
    query.archived = convertToBool(q.archived);
  }
  console.log(query);
  return query;
}

module.exports = getCategoryQuery;
