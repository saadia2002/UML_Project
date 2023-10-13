const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const entrepriseSchema = new mongoose.Schema({
  email: String,
  nom: String,
  adresse: String,
  contact: String,
  motDePasse:String,
  diagnostique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagnostique',
  },
});

entrepriseSchema.methods.comparePassword = function (password) {
  console.log(password);
  console.log(this.motDePasse);
  if(password == this.motDePasse)
  return   true;
  else
  return false;
};

module.exports = mongoose.model('Entreprise', entrepriseSchema);
