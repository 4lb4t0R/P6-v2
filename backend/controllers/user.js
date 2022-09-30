// Importe + implémente modèle user + package de sécu bcrypt + package de token
const User = require('../models/user');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

// Créa nouveaux user + mise en place sécu
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// Fonction pour se connecter
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        // user pas trouvé
        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        // user trouvé
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                // mauvais mdp
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                }
                // Token + mdp correct
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id }, // payload (données encodées dans token)
                        process.env.ZUCKERBERG_IS_A_FRAUD,
                        { expiresIn: '2h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};