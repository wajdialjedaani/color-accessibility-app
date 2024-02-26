import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-ynEYrdDkdRGouaITKiJc2lcw",
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    const body = req.body;
    const completion = await openai.chat.completion.create({
        model: body.model,
        messages: body.messages
    });
    
    return completion;

}

  