const express = require('express');
const router = express.Router();

router.post('/transfer', (req, res) => {
    const file = req.file;
    console.log('File path is ');
    console.log(file.path);
    console.log(req.body);
    cloudinary.uploader.upload(file.path, (err, result) => {
        console.log(result);
    });
    res.json({
        'File': req.file.originalname,
        'Sender': req.body.sender,
        'Receiver': req.body.primaryEmail
    });
});

module.exports = router;