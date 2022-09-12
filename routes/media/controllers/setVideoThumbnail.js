function setVideoThumbnail(req, res) {
  const { frame } = req.params;
  return res.json({
    frame
  });
}

module.exports = setVideoThumbnail;
