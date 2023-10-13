// routes/reponse.js
const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/reponseController');


router.post('/enregistrer-reponses', reponseController.enregistrerReponses);

// Endpoint pour calculer le score de l'entreprise
router.post('/calculer-score', reponseController.calculerScoreEntreprise);

module.exports = router;
