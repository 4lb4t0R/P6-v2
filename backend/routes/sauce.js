// Implémente Express
const express = require('express');

// Crée le routeur, permettant créa de routes
const router = express.Router();

// Implémente la fonction de sécu, dans /middlewares, avec token et tout
const auth = require('../middlewares/auth');

// Implémente multer
const multer = require('../middlewares/multer-config');

// Implémente modele de sauce fabriqué
const Sauce = require('../models/sauce');

// Implémente le controller
const sauceCtrl = require('../controllers/sauce');

// Création d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce); 
// Affichage d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce); 
// Modification sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); 
// Suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce); 
// Affichage de toutes les sauces
router.get('/' + '', auth, sauceCtrl.getAllSauces); 
// Like / Dislike
router.post('/:id/like', auth, sauceCtrl.likeSauce); 

module.exports = router;