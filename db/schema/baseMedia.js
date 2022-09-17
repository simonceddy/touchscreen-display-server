const baseMedia = {
  src: String,
  alt: String,
  type: {
    type: String,
    enum: ['image', 'video', 'audio']
  },
  thumbnail: String
};

module.exports = baseMedia;
