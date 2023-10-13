// routes/auth.js
const express = require('express');

const expressJwt = require('express-jwt');
const entrepriseController = require('../controllers/entrepriseController');

const router = express.Router();

// Endpoint pour la création d'un token JWT lors de la connexion
router.post('/login', entrepriseController.login);

// Middleware d'authentification JWT pour les routes sécurisées
// const requireAuth = expressJwt({ secret: 'votre_secret_jwt' });

// // Exemple de route sécurisée
// router.get('/secure-route', requireAuth, (req, res) => {
//   res.send('Cette route est sécurisée');
// });

module.exports = router;
