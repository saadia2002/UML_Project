const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  libelle: String,
});

module.exports = mongoose.model('Categorie', categorieSchema);
