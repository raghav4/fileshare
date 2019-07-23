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
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    storage: storage
}).single('file'));

app.get('/api', (req,res)=>{
    res.send('Get is working...')
});
app.post('/transfer', async (req, res) => {
    const file = req.file;
    const result = await cloudinary.uploader.upload(file.path);
    const ans = {
        'message': req.body.message,
        'from': req.body.sender,
        'to': req.body.primaryEmail,
        'url': result.secure_url,
        'file_name': req.file.filename
    }
    SendEmail(ans);
    res.send(`File Sent Successfully to ${ans.to}!`);
});

const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on port ${PORT}...`));