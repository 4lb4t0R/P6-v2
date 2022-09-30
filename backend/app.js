// Créé + implémente Express au serveur
const express = require('express');
const app = express();

// Implémente mongoose + le link au cluster créé via compte dev créé
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:adminisatroll@cluster0.rfhpjnn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Déclare route pour login/signup
const userRoutes = require('./routes/user');

// Accès chemin serveur
const path = require('path');

// Implémentation CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Ping serveur OK
app.use((req, res, next) => {
  res.status(200).json({ message: 'Hi handsome ETALON DES BOIS (X_x)' }); 
  next();
});

// Implémente route pour signup
app.use ('/api/auth/signup', userRoutes);

// Implémente route pour login
app.use ('/api/auth/login', userRoutes);

// Rend gestion du dossier statique
app.use('/assets/images', express.static(path.join(__dirname, 'images')));

module.exports = app;