// Importe package multer
const multer = require('multer');

// Indique formats acceptés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Sert à indiquer lieu de save des img reçues
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'backend/images');
  },
  // Garde nom d'origine mais lui rajoute un _ et la date d'upload
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
   // const extension = MIME_TYPES[file.mimetype];
    callback(null, name);
  }
});

module.exports = multer({storage: storage}).single('image');