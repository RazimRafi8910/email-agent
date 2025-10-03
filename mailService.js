import { createTransport } from 'nodemailer';


const transporter = createTransport({
     host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS_KEY
    },
    logger: true,
    debug: true
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
