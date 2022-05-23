const baseMedia = {
  src: String,
  alt: String,
  type: {
    type: String,
    enum: ['image', 'video', 'audio']
  }
};

module.exports = baseMedia;
