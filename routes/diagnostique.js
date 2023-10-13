// routes/diagnostique.js
const express = require('express');
const router = express.Router();
const diagnostiqueController = require('../controllers/diagnostiqueController');

// Route pour ajouter des questions à un diagnostic
router.post('/addQuestions', diagnostiqueController.addQuestionsToDiagnostique);

module.exports = router;
