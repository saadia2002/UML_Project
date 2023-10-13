const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Exemple d'utilisation
router.post('/create1',questionController.ajouterQuestionALaCategorie);
module.exports = router;