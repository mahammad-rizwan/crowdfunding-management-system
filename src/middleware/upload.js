const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'F:/crowdfunnding project/public/uploads/gallery');  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: function (req, file, cb) {

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);  
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);  
    }
  }
});

module.exports = upload;  
