const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const storage = require('./routes/multer');
const SendEmail = require('./routes/mail');

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    storage: storage
}).single('file'));

app.post('/transfer', async (req, res) => {
    console.log('In the transfer route...');
    const file = req.file;
    const result = await cloudinary.uploader.upload(file.path);
    const ans = {
        'message': req.body.message,
        'from': req.body.sender,
        'to': req.body.primaryEmail,
        'url': result.secure_url,
        'file_name': req.file.filename
    }
    await SendEmail(ans);
    res.send(`File Sent Successfully to ${ans.to}!`);
});

const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on port ${PORT}...`));