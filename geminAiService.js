import { GoogleGenAI } from '@google/genai';


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINAI_API_KEY,
});

const systemInstruction = `You are a versatile email generator.
 The subject and desired formality (casual/formal) will be provided in the user's prompt.
  Generate an email with an appropriate salutation, a body that clearly addresses the prompt's details, and a suitable closing.
   Include a placeholder for the sender's name. complete email with provided informations. email should be ready to send no placeholders are needed
    - "subject": The subject line of the email.
    - "to": The recipient's email address. If not explicitly provided, infer or use a placeholder like "recipient@example.com".
    - "body": The full content of the email, including salutation and closing remarks, formatted appropriately (e.g., paragraphs, line breaks).
    - "receiver": The recipient's name or position, if provided in the user's prompt. If not provided, omit this field".
    Do NOT include any conversational text outside the JSON object.
   `.trim();


async function generateEmail(content) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        subject: {
                            type: "STRING",
                            description: "The subject line of the email.",
                        },
                        to: {
                            type: "STRING",
                            description: "The recipient's email address.",
                        },
                        body: {
                            type: "STRING",
                            description:"The main content of the email, including salutation and closing.",
                        },
                        reciver: {
                            type: "STRING",
                            description:"The recipient's name or position (optional).",
                        },
                    },
                    required:["to","subject","body"],
                }
            },
            contents: content,
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error(error)
    }
}

export { generateEmail }