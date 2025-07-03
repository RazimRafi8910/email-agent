import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
	res.send("success");
});

app.get("/webhook", async (req, res) => {
	const VERIFY_TOKEN = "emailfromme";
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

app.post("/webhook", (req, res) => {
	const body = req.body;
    
    console.log("Received webhook:", JSON.stringify(body, null, 2));
    
    const data = body[0];

    console.log(data)

	if (body.object) {
		res.sendStatus(200);
	} else {
		res.sendStatus(404);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
