import { Mistral } from '@mistralai/mistralai';
import 'dotenv/config';
import { Problem } from '../models/problem.models.js';

const chatbotController = async (req, res) => {
    const { prompt, problemId } = req.body;
    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new Mistral({ apiKey });

    try {
        if (!prompt || !problemId) {
            return res.status(400).json({
                message: "Please enter your question !!"
            });
        }

        const problem = await Problem.findById(problemId);

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const chatResponse = await client.chat.stream({
            model: 'mistral-large-latest',
            messages: [
                { role: 'system', content: JSON.stringify(problem)},
                { role: 'system', content: "Only answer questions related to the given problem. don't answer the questions out of this or tell i don't know "},
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
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch data"
        });
    }
};

export default chatbotController;
