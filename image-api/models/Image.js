const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: String,
  author: String,
  width: Number,
  height: Number,
  url: String,
  download_url: String,
  title: String
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
