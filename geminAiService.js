import { GoogleGenAI } from '@google/genai';


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINAI_API_KEY,
});

const systemInstruction = `You are a versatile email generator.
 The subject and desired formality (casual/formal) will be provided in the user's prompt.
  Generate an email with an appropriate salutation, a body that clearly addresses the prompt's details, and a suitable closing.
   Include a placeholder for the sender's name and any other relevant placeholders.
   the response should be in json, here is the formate:
   {
    subject:"subject of the email" - string,
    to:"reciver email address" - string,
    body:"body of the email" - string,
    reciver:"reciver name or possition"(if provided) - string,
   }
   `


async function generateEmail(content) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: systemInstruction,
            },
            contents: content,
        });

        return response;
    } catch (error) {
        console.error(error)
    }
}

export { generateEmail }