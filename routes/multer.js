const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../uploads');
        }
    }),
    filename: (req, file, cb) => {
        console.log(file);
    }
});

// ,
// fileFilter: (req, file, cb) => {
//     cb(null, true);
// }