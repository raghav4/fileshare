const multer = require('multer');

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        console.log('File name is ', file.originalname);
        cb(null, file.originalname);
    }
});