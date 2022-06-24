const { Router } = require('express');
const { getTestData, storeTestData } = require('../dev/setupTestData');
const { failResponse, successResponse } = require('../util/httpUtils');

const testData = Router();

function findDataByKey(key) {
  return getTestData().find((i) => i.key === key);
}

testData.put('/update/:key', (req, res) => {
  const r = findDataByKey(req.params.key);
  if (!r) return res.json(failResponse('Data not found'));
  const { title, body } = req.body;
  const newData = {
    title: title || r.title,
    body: body || r.body,
    key: r.key
  };
  const data = getTestData();
  data[r.key] = newData;
  storeTestData(data);
  return res.json(successResponse('Data updated!', {
    data: newData
  }));
});

testData.post('/create', (req, res) => {
  const { title, body } = req.body;
  if (!title) return res.json(failResponse('Title is required'));
  const oldData = getTestData();
  const newItem = {
    title, body, key: String(oldData.length)
  };
  const data = [...oldData, newItem];
  storeTestData(data);
  return res.json(successResponse('New data created!', {
    data: newItem
  }));
});

testData.delete('/destroy/:key', (req, res) => {
  const newData = getTestData().filter((i) => i.key !== req.params.key);
  storeTestData(newData);
  return res.json(successResponse('Deleted data'));
});

testData.get('/', (req, res) => res.json(getTestData()));

testData.get('/:key', (req, res) => {
  console.log(req.params);
  const r = findDataByKey(req.params.key);
  if (!r) return res.json(failResponse('Data not found'));
  return res.json(successResponse(null, { data: r }));
});

module.exports = testData;
