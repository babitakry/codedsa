import { Mistral } from '@mistralai/mistralai';
import 'dotenv/config';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

const chatbotController = async (req, res) => {
    const  {prompt}  = req.body;

    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new Mistral({apiKey: apiKey});

    try {
        if(!prompt){
            return res.status(400).json({
                message: "Please enter your question !!"
            })
        }
        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [{
                role: 'user', 
                content:  prompt
            }],
        });
        const output = chatResponse.choices[0].message.content;
        // console.log('Chat:', output);
        return res.status(200).json({
            message: "Request send successfully",
            data: output
        })
    } 
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch data" 
        })
    }
};

export default chatbotController;
