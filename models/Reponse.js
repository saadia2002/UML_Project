const mongoose = require('mongoose');

const reponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  choix: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Choix',
  },
  entreprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entreprise',
  },
});

module.exports = mongoose.model('Reponse', reponseSchema);
