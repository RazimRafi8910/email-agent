import express from "express";
import { sendMessage, sendWelcomeMessage } from "./messageService.js";
import { configDotenv } from "dotenv";
import { generateEmail } from "./geminAiService.js";
import { sendEmail } from "./mailService.js";

configDotenv();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
	res.send("server is running...");
});

app.get("/webhook", async (req, res) => {
	const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
	const mode = req.query["hub.mode"];
	const token = req.query["hub.verify_token"];
	const challenge = req.query["hub.challenge"];
	if (mode && token === VERIFY_TOKEN) {
		console.log("Webhook verified");
		res.status(200).send(challenge);
	} else {
		console.log("webhook failed");
		res.sendStatus(403);
	}
});

app.post("/webhook", async (req, res) => {
	const body = req.body;
	const entry = req.body.entry?.[0];
	const change = entry?.changes?.[0];
	const message = change?.value?.messages?.[0];

	// for debug
	console.log(body)
	if (message?.from == undefined || message?.from != process.env.PHONE_NO) {
		await sendMessage(`message from unkown ${message?.from}`);
		return res.statusCode(200);
	}

	if (message && message.type === "text") {
		const text = message.text?.body;
		if (text == "Hi" || text == "Hello" || text.length < 15) {
			await sendWelcomeMessage();
		} else {
			//logic for LLM email creation
			const response = await generateEmail(text);
			const status = await sendEmail(response.to, response.subject, response.body);
			if (status) {
				const resultMessage = `email sended to ${response.to} from your email \n email: \n ${response.body}`
				await sendMessage(resultMessage);
			}
		}
		console.log("Received message:", text);
	}

	if (body.object) {
		return res.sendStatus(200);
	} else {
		console.log("done")
		return res.sendStatus(404);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
