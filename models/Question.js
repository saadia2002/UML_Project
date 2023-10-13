const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  enonce: String,
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
  },
  diagnostique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagnostique',
  },
});

module.exports = mongoose.model('Question', questionSchema);
