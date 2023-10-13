// controllers/ChoixController.js
const mongoose = require('mongoose');
const Choix = require('../models/Choix');

// Fonction pour créer une nouvelle Choix
const ChoixsFictives = [
  {
    description:'accord total',
    point:4
   
  },
  {
    description:'accord ',
    point:3
   
  },
  {
    description:'neutre',
    point:2
   
  },
  {
    description:'desaccord ',
    point:1
   
  },
  {
    description:'desaccord total',
    point:0
   
  },
  
];

exports.createChoix = async (req, res) => {
  try {
    await Choix.insertMany(ChoixsFictives);
    console.log('Les Choixs ont été insérées avec succès dans la base de données.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des Choixs :', error);
  }

};
exports.getChoixs = async (req, res) => {
  try {
    const Choixs = await Choix.find();
    res.status(200).json(Choixs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la liste des Choixs' });
  }
};
