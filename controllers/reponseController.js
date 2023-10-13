// controllers/reponseController.js
const Diagnostique = require('../models/Diagnostique');
const Question = require('../models/Question');
const Categorie = require('../models/Categorie');
const Entreprise = require('../models/Entreprise');
const Choix = require('../models/Choix');
const Reponse = require('../models/Reponse');


exports.enregistrerReponses = async (req, res) => {
    try {
      const entrepriseId = '6523335f19da005f60a2daf7'; // Remplacez par l'ID réel de l'entreprise
      const diagnostiqueId = '65232f89c5598854327583e8'; // Remplacez par l'ID réel du diagnostic
      const reponses = req.body.reponses; // Un tableau d'objets de réponses
  
      // Enregistrez chaque réponse dans la base de données
      for (const reponse of reponses) {
        const nouvelleReponse = new Reponse({
          entreprise: entrepriseId,
          diagnostique: diagnostiqueId,
          question: reponse.questionId,
          choix: reponse.choixId,
        });
  
        await nouvelleReponse.save();
      }
  
      res.status(200).json({ message: 'Réponses enregistrées avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement des réponses' });
    }
  };



exports.calculerScoreEntreprise = async (req, res) => {
  try {
    const entrepriseId = '6523335f19da005f60a2daf7'; // Remplacez par l'ID réel de l'entreprise
    const diagnostiqueId = '65232f89c5598854327583e8'; // Remplacez par l'ID réel du diagnostic

    // Recherchez l'entreprise par ID
    const entreprise = await Entreprise.findById(entrepriseId);

    if (!entreprise) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }

    // Recherchez le diagnostic par ID
    const diagnostique = await Diagnostique.findById(diagnostiqueId);

    if (!diagnostique) {
      return res.status(404).json({ message: 'Diagnostic non trouvé' });
    }

    let scoreTotal = 0;
    const scoresParCategorie = {};

    // Parcourez les questions du diagnostic
    for (const questionId of diagnostique.questions) {
      const question = await Question.findById(questionId);

      if (question) {
        // Trouvez la réponse de l'entreprise à cette question
        const reponse = await Reponse.findOne({
          entreprise: entreprise._id,
          question: question._id,
        });

        if (reponse) {
          // Trouvez le choix correspondant à la réponse
          const choix = await Choix.findById(reponse.choix);

          if (choix) {
            // Ajoutez le score du choix à la catégorie correspondante
            scoreTotal += choix.point;

            // Obtenez la catégorie de la question
            const categorie = await Categorie.findById(question.categorie);

            if (categorie) {
              // Ajoutez le score du choix à la catégorie correspondante
              if (!scoresParCategorie[categorie.libelle]) {
                scoresParCategorie[categorie.libelle] = 0;
              }
              scoresParCategorie[categorie.libelle] += choix.point;
            }
          }
        }
      }
    }

    // Mettez à jour le score total de l'entreprise
    entreprise.scoreTotal = scoreTotal;

    // Mettez à jour les scores par catégorie de l'entreprise
    entreprise.scoresParCategorie = scoresParCategorie;

    // Enregistrez les modifications dans la base de données
    await entreprise.save();

    // Renvoyez les scores calculés sous forme d'objet JSON
    res.status(200).json({
      message: 'Scores calculés avec succès',
      scoreTotal: entreprise.scoreTotal,
      scoresParCategorie: entreprise.scoresParCategorie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du calcul des scores' });
  }
};



// // {
//     "reponses": [
//       {
//         "questionId": "6523203f92a73ba3e4d229cf",
//         "choixId": "6522899b33711d337ba03591"
//       },
//       {
//         "questionId": "6523207d04db237dee90dcd6",
//         "choixId": "6522899b33711d337ba03590"
//       },
//       {
//         "questionId": "652320afe86bb5f154436d18",
//         "choixId": "6522899b33711d337ba03593"
//       },
//       {
//         "questionId": "652320ee9fe511e040bf4078",
//         "choixId": "6522899b33711d337ba03591"
//       },
//       {
//         "questionId": "652321186de8db3bec4f8a00",
//         "choixId": "6522899b33711d337ba03590"
//       },
//       {
//         "questionId": "6523213b739a946b50dbc48a",
//         "choixId": "6522899b33711d337ba03591"
//       }
//     ]
  