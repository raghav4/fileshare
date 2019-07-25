const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('your-api-key-here');

async function SendEmail(ans) {
    try {
        let message = ans.message;
        let sender = ans.from;
        let url = ans.url;
        let sendTo = ans.to;
        let file_name = ans.file_name;
        let data = {
            from: 'File Share<noreply@fileshare.now.sh>',
            to: `${sendTo}`,
            subject: 'Download your files',
            html: `<p>Hello ${sendTo} 👋, <br> <b>${sender}</b> has sent you a <b>file</b> : "${file_name}" 📁 via <a href="https://github.com/raghav4/file-transfer">File-Transfer</a> 😀 <br> You can download it from <a href="${url}"> here</a>. <br><b>Message Included </b> 💬 : "${message}"<br><Regards, <br> <a href="https://fileshare.now.sh">File Transfer</a></p>`
        };
        const result = await sgMail.send(data);
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = SendEmail;