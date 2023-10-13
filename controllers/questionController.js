// questionController.js
const Categorie = require('../models/Categorie');
const Question = require('../models/Question');

exports.ajouterQuestionALaCategorie = async (req, res) => { 
  try {
    const categorieId='65228441a0dd1a3bf8a97532'
    const  enonceDeLaQuestion='voila la question 3'
    // Recherchez la catégorie par ID
    const categorie = await Categorie.findById(categorieId);
    console.log(categorie.libelle);

    if (!categorie) {
      console.error(`La catégorie avec l'ID ${categorieId} n'existe pas.`);
      return;
    }

    // Créez une nouvelle question et associez-la à la catégorie
    const nouvelleQuestion = new Question({
      enonce: enonceDeLaQuestion,
      categorie: categorie._id, // Associez la question à la catégorie par ID
    });

    // Enregistrez la question dans la base de données
    await nouvelleQuestion.save();

    console.log(`Question ajoutée à la catégorie "${categorie.libelle}": ${enonceDeLaQuestion}`,nouvelleQuestion);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la question :', error);
  }
}

