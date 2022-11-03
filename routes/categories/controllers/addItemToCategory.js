/* eslint-disable consistent-return */
// const { Category } = require('../../../db/models');
const saveItem = require('../../../util/db/saveItem');

async function addItemToCategory(req, res) {
  const { key, subKey } = req.params;
  if (!req.body.title) {
    return res.status(500).json({
      success: false,
      message: 'Title is required'
    });
  }
  try {
    const i = await saveItem({
      title: req.body.title,
      body: req.body.body || null,
      media: req.body.media || [],
      category: key,
      subCategory: subKey || null,
      thumbnail: req.body.thumbnail || null
    });

    if (i) {
      return res.json(i);
    }
  } catch (e) {
    return res.json({
      message: `an error occurred: ${e.message}`,
      e
    });
  }
}

module.exports = addItemToCategory;
