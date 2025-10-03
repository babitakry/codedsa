import { Mistral } from '@mistralai/mistralai';
import 'dotenv/config';
import { Problem } from '../models/problem.models.js';

const chatbotController = async (req, res) => {
    console.log("Chatbot Controller called");
    const { prompt, problemId } = req.body;
    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new Mistral({ apiKey });

    try {
        if (!prompt || !problemId) {
            console.log("Please enter your question !!");
            return res.status(400).json({
                message: "Please enter your question !!"
            });
        }

        const problem = await Problem.findById(problemId);
        console.log("Find problem", problem);

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const chatResponse = await client.chat.stream({
            model: 'mistral-large-latest',
            messages: [
                { role: 'system', content: JSON.stringify(problem)},
                { role: 'system', content: "Only answer questions related to the given problem. don't answer the questions out of this or tell i don't know "},
                { role: "system", content: "Strictly return the output in markdown format. For new lines, use <br/>." },
                { role: 'user', content: prompt }
            ],
        });

        for await (const item of chatResponse) {
            const streamText = item.data.choices[0]?.delta?.content;
            if (typeof streamText === "string") {
                res.write(`data: ${streamText}\n\n`);
            }
        }

        res.write("data: [DONE]\n\n");
        res.end();

    } catch (error) {

        console.log("Chatbot Controller: ",error);
        res.status(500).json({
            message: "Failed to fetch data"
        });
    }
};

export default chatbotController;
