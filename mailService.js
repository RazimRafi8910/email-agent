import { createTransport } from 'nodemailer';


const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'gadgetstorewebsite@gmail.com',
        pass: process.env.EMAIL_PASS_KEY
    }
});

async function sendEmail(emailTo, subject, body) {
    try {
        const response = await transporter.sendMail({
            to: emailTo,
            subject: subject,
            text: body,
        });
        console.log(response.messageId);
        return true
    } catch (error) {
        console.error(error);
    }
}


export { sendEmail }
