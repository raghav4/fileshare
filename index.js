const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const storage = require('./routes/multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    storage: storage
}).single('file'));


app.post('/transfer', async(req, res) => {
    const file = req.file;
    const result = await cloudinary.uploader.upload(file.path);
    const ans = {
        'message' : req.body.message,
        'from' : req.body.sender,
        'to' : req.body.primaryEmail,
        'url' : result.secure_url
    }
    //SendEmail(ans);
    res.json(ans);
});

const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on port ${PORT}...`));