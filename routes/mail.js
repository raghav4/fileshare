const mailgun = require("mailgun-js");
const api_key = 'your-mailgun-api_key-here';
const DOMAIN = 'mailgun-domain-here';
const mg = mailgun({
    apiKey: api_key,
    domain: DOMAIN
});

async function SendEmail(ans) {
    try {
        let message = ans.message;
        let sender = ans.from;
        let url = ans.url;
        let sendTo = ans.to;
        let file_name = ans.file_name;
        let data = {
            from: 'File Share<me@domain.com>',
            to: `${sendTo}`,
            subject: 'Download your files',
            html: `<p>Hello ${sendTo} 👋, <br> <b>${sender}</b> has sent you a <b>file</b> : "${file_name}" 📁 via <a href="https://github.com/raghav4/file-transfer">File-Transfer</a> 😀 <br> You can download it from <a href="${url}"> here</a>. <br><b>Message Included </b> 💬 : "${message}"<br><Regards, <br> <a href="https://fileshare.now.sh">File Transfer</a></p>`
        };

        const result = await mg.messages().send(data);
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = SendEmail;