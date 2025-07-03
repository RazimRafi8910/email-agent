import { configDotenv } from "dotenv";

configDotenv();

const token = process.env.API_KEY;

async function sendWelcomeMessage() {
    const payload = {
		messaging_product: "whatsapp",
		to: "918848764715",
		type: "template",
		template: {
			name: "hello_world",
			language: {
				code: "en_US",
			},
		},
    };
	const result =await fetch(
		"https://graph.facebook.com/v22.0/714727608389125/messages",
        {
            method:"POST",
            headers: {
                'Authorization': `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body:JSON.stringify(payload),
		}
    );
    
    const response = await result.json();
    console.log(response);
    return response
}

export {sendWelcomeMessage}