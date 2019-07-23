const nodemailer = require('nodemailer');

function SendEmail(ans) {
    let message = ans.message;
    let sender = ans.from;
    let url = ans.url;
    let sendTo = ans.to;
    let file_name = ans.file_name;
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'enter-your-email-here@gmail.com',
            pass: 'password-here'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: '"File Sharer" <enter-your-email-here@gmail.com>',
        to: `${sendTo}`,
        subject: 'Download your files',
        text: `Hello ${sendTo}! ${sender} has sent you these files, Download it from here : ${url} and the message send is : "${message}"`,
        html: `<p>Hello ${sendTo} 👋, <br> <b>${sender}</b> has sent you a <b>file</b> : "${file_name}" 📁 via <a href="https://github.com/raghav4/file-transfer">File Transfer</a> 😀 <br> You can download it from <a href="${url}"> here</a>. <br><b>Message Included </b> 💬 : "${message}"<br><blockquote><p>Thank you and do checkout <a href="https://github.com/raghav4/file-transfer">File Transfer</a></p></blockquote></p>`
    };
    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) return console.log(error);
        console.log(`Email sent to ${sender}...`);
    });
}

module.exports = SendEmail;