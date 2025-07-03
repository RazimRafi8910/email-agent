import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = 3000;

const token = process.env.API_KEY

app.get("/", async (req, res) => {
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
    res.send("success");
});

app.get("/message", async (req, res) => {
    console.log(req.ip)
    res.send("done");
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
