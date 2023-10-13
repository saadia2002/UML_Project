// routes/entreprise.js
const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entrepriseController');

// Route pour créer une entreprise
router.post('/create', entrepriseController.createEntreprise);
router.get('/api/exemple', (req, res) => {
    res.json({ message: 'Ceci est une réponse d\'exemple de l\'API Node.js' });
  });
  
router.get('/list', entrepriseController.getEntreprises);

module.exports = router;
