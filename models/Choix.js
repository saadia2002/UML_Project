const mongoose = require('mongoose');

const choixSchema = new mongoose.Schema({
  description: String,
  point: Number,
});

module.exports = mongoose.model('Choix', choixSchema);
