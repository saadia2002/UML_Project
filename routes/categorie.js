// routes/categorie.js
const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// Route pour créer une categorie
router.post('/createCategorie', categorieController.createCategorie);

router.get('/listCategorie', categorieController.getCategories);

module.exports = router;
