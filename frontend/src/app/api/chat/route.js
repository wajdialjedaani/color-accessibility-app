import OpenAI from "openai";

const key = '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';

const openai = new OpenAI({
    organization: "org-ynEYrdDkdRGouaITKiJc2lcw",
    apiKey: key,
});

export async function POST(req) {
    const body = req.body;
    const completion = await openai.chat.completion.create({
        model: body.model,
        messages: body.messages
    });
    
    return completion;

}

  