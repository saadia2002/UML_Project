// controllers/entrepriseController.js
const mongoose = require('mongoose');
const Entreprise = require('../models/Entreprise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Fonction pour créer une nouvelle entreprise
exports.createEntreprise = async (req, res) => {
  try {
    const saltRounds = 10; // Le nombre de "salts" à utiliser

    const entreprisesFictives = [
      {
        email: 'entreprise3@example.com',
        nom: 'Entreprise 3',
        adresse: 'Adresse 3',
        contact: 'Contact 3',
        motDePasse: 'MotDePasse3',
        diagnostique: '652332b13a8de367d1281c52'
      },
      {
        email: 'entreprise4@example.com',
        nom: 'Entreprise 4',
        adresse: 'Adresse 4',
        contact: 'Contact 4',
        motDePasse: 'MotDePasse4',
        diagnostique: '652332b13a8de367d1281c52'
      },
      // Ajoutez d'autres entreprises fictives au besoin
    ];

    // Hasher les mots de passe pour chaque entreprise fictive
    const entreprisesAvecMotDePasseHache = await Promise.all(
      entreprisesFictives.map(async (entrepriseFictive) => {
        const motDePasseHache = await bcrypt.hash(entrepriseFictive.motDePasse, saltRounds);
        return {
          ...entrepriseFictive,
          motDePasse: motDePasseHache, // Remplacez le mot de passe en clair par le haché
        };
      })
    );

    // Insérer les entreprises fictives dans la base de données
    await Entreprise.insertMany(entreprisesAvecMotDePasseHache);
    console.log('Les entreprises ont été insérées avec succès dans la base de données.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des entreprises :', error);
  }

};
exports.getEntreprises = async (req, res) => {
  try {
    const entreprises = await Entreprise.find();
    res.status(200).json(entreprises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la liste des entreprises' });
  }
};
exports.login = async (req, res) => {
  const email= 'entreprise3@example.com';

  const motDePasse= 'MotDePasse3';

  try {
    // Recherchez l'entreprise par e-mail dans la base de données
    const entreprise = await Entreprise.findOne({ email });

    if (!entreprise) {
      return res.status(401).json({ message: 'Identifiants  incorrects' });
    }

    // Vérifiez le mot de passe
    const isPasswordValid = await entreprise.comparePassword(motDePasse);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants nnnnnnnnnnnnnnnnn incorrects' });
    }

    // Créez un token JWT
    res.json({ message: 'Authentification réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};
