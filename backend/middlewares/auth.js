const jwt = require('jsonwebtoken');
 
// Extraction du token + décodage + extrait ID et le rend exploitable par les routes
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       if (req.body.userId && req.body.userId != userId){ // Verif si userId du token et userId de la requête correspondent
        throw 'User ID invalide !';
    } else {
        req.auth = { // Rajoute userId à la requête pour que les routes puissent l'exploiter
           userId: userId
       };
        next();
    }
   } catch(error) {
       res.status(401).json({ error });
   }
};