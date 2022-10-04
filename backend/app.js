// Implémentation d'outils
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

/* Créa de l'appli + appel d'Express ; 
   prend all request qui ont pour Content application/json et met leur body dans l'objet req
*/
const app = express();

// Implémentation des variables d'environnement
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// Connexion Cluster MongoDB(Z)
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.rfhpjnn.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Implémentation CORS + réponses dans les headers, sur toutes les routes
app.use((req, res, next) => {
  // Toutes origines d'accès sont acceptées
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Tout les headers sont acceptés
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Toutes les requêtes citées sont autorisées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Importation de la route sauce
const sauceRoutes = require('./routes/sauce'); 
// Importation du model de sauce
const Sauce = require('./models/sauce'); 
// Importation du router user
const userRoutes = require('./routes/user'); 
// Accès au path du server, pour les images (dans dossier assets)
const path = require('path'); 



// accès à req.body
app.use(express.json());

/* Met l’en-tête : Content-Security-Policy ; 
   protège contre injection et attaques cross-sites
*/
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

// Spécification des routers/route
// Sauces
app.use('/api/sauces', sauceRoutes); 
// Utilisateurs
app.use('/api/auth', userRoutes); 
// Images
app.use('/images', express.static(path.join(__dirname, 'images'))); 

module.exports = app;