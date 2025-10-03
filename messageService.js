
const token = process.env.API_KEY;

async function sendWelcomeMessage() {
    const payload = {
		messaging_product: "whatsapp",
		to: process.env.PHONE_NO,
		type: "text",
		text: {
			body: "Welcome to Email AI Agent!\n\nI can help you generate and send emails directly from this chat.\n\nTo create an email, send a single message with these fields separated by commas:\nsubject, recipient email, sender name, recipient name/position, tone (formal/casual), and your prompt or details.\n\nExample:\nOrder delay refund,customer@example.com,Alex Gomez,Customer Support Manager,formal,Please write a polite refund request mentioning order #12345.\n\nI'll generate the email text and send it for you. Reply with 'help' to see this again."
		},
    };
	const result =await fetch(
		"https://graph.facebook.com/v22.0/836345549557531/messages",
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

async function sendMessage(content) {
	try {
		const payload = {
		messaging_product: "whatsapp",
		to: process.env.PHONE_NO,
		type: "text",
		text: {
			body: content,
			},
		}

		const result =await fetch(
			"https://graph.facebook.com/v22.0/836345549557531/messages",
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
	} catch (error) {
		console.error(error)
	}
}

export { sendWelcomeMessage, sendMessage }