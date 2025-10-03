
const token = process.env.API_KEY;

async function sendWelcomeMessage() {
    const payload = {
		messaging_product: "whatsapp",
		to: process.env.PHONE_NO,
		type: "text",
		text: {
			body: "welcome to Email Ai Agent \n you can generate and send email by just messaging here \n formate: \n subject,reciver email,sender name,reciver name or possition,format:(formal/casual) prompt for generating email \n "
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