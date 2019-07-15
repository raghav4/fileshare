const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
// const upload = require('./routes/multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(fileUpload({
    useTempFiles: true
}));

app.post('/transfer', (req, res, next) => {
    const file = req.files;
    console.log(file);
    return res.send(file);
    // cloudinary.uploader.upload(file.tempFilePath,(err, result) => {
    //     console.log(result);
    // })
});

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: false,
//     port: 25,
//     auth: {
//         user: 'raghav@gmail.com',
//         pass: ''
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// let HelperOptions = {
//     from: '"File Transfer Online" <raghav@mail.com>',
//     to: 'raghavsyt@gmail.com',
//     subject: 'Download your files',
//     text: 'Hello there!'   
// };
// transporter.sendMail(HelperOptions, (error, info) => {
//     if(error) return console.log(error);

//     console.log(`Email send and info is ${info}`); 
// })
const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on port ${PORT}...`));

//{ resource_type: "raw" }, 