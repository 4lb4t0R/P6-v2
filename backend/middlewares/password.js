// Implémente password-validator
const passwordValidator = require('password-validator');

// Création du schéma de mdp
const passwordSchema = new passwordValidator();

// Schéma/conditions que mdp doit respecter

passwordSchema
// Min 8 caractères
.is().min(8)   
// Max 100 caractères                                 
.is().max(100) 
// Doit contenir des MAJUSCULES                                 
.has().uppercase() 
// Doit contenir des minuscules                            
.has().lowercase()  
// Doit contenir 2 chiffres                            
.has().digits(2)  
// Ne doit pas contenir d'espace                              
.has().not().spaces()                           

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res.status(400).json({error : `Votre mot de passe n'est pas assez fort: ${passwordSchema.validate('req.body.password', { list: true })}`})
    }
}