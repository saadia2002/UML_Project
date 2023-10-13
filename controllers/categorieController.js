// controllers/CategorieController.js
const mongoose = require('mongoose');
const Categorie = require('../models/Categorie');

// Fonction pour créer une nouvelle Categorie
const CategoriesFictives = [
  {
    libelle: 'Categorie 1',
   
  },
  {
    libelle: 'Categorie 2',
   
  },
  {
    libelle: 'Categorie 3',
   
  },
  {
    libelle: 'Categorie 4',
   
  },
  {
    libelle: 'Categorie 5',
   
  },

];

exports.createCategorie = async (req, res) => {
  try {
    await Categorie.insertMany(CategoriesFictives);
    console.log('Les Categories ont été insérées avec succès dans la base de données.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des Categories :', error);
  }

};
exports.getCategories = async (req, res) => {
  try {
    const Categories = await Categorie.find();
    res.status(200).json(Categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la liste des Categories' });
  }
};
