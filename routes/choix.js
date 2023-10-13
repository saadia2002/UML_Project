// routes/choix.js
const express = require('express');
const router = express.Router();
const choixController = require('../controllers/choixController');

// Route pour créer une choix
router.post('/createchoix', choixController.createChoix);

router.get('/listchoix', choixController.getChoixs);

module.exports = router;
