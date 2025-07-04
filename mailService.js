import { createTransport } from 'nodemailer';


const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

async function sendEmail(email, subject, body) {
    try {
        
    } catch (error) {
        console.error(error);
    }
}


export { sendEmail }