// Implémente Express
const express = require('express');

// Crée le routeur, permettant créa de routes
const router = express.Router();

// Implémente fonctions créées pour l'utilisateur
const userCtrl = require('../controllers/user');

// Implémente le valideur de mdp
const password = require('../middleware/password');

// Créa de la route s'enregistrer + se connecter
router.post ('/signup', password, userCtrl.signup);
router.post ('/login', userCtrl.login);

module.exports = router;