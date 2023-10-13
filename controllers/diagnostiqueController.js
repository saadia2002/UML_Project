// controllers/diagnostiqueController.js
const Diagnostique = require('../models/Diagnostique');
const Question = require('../models/Question');

// Fonction pour ajouter des questions à un diagnostic
exports.addQuestionsToDiagnostique = async (req, res) => {
  try {
    // IDs des questions à ajouter au diagnostic
    const questionIds = ['6523203f92a73ba3e4d229cf', '6523207d04db237dee90dcd6', '652320afe86bb5f154436d18','652320ee9fe511e040bf4078','652321186de8db3bec4f8a00','6523213b739a946b50dbc48a'];

    // Créez un nouveau diagnostic lié à l'entreprise de l'utilisateur authentifié
    const diagnostic = new Diagnostique();

    // Recherchez les questions par leurs IDs
    const questions = await Question.find({ _id: { $in: questionIds } });

    // Associez les questions au diagnostic
    diagnostic.questions = questions.map(question => question.id);

    await diagnostic.save();

    res.status(201).json({ message: 'Diagnostic créé avec succès', diagnostic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du diagnostic' });
  }
};
