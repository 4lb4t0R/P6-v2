// Implémentation du package Mongoose + sa fonction d'authentification sécur'
const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const uniqueValidator = require('mongoose-unique-validator');

// Définition des conditions de connexion + sécurisation
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Intégration du plugin de sécu
userSchema.plugin(uniqueValidator);
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);