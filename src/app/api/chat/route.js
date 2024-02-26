// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-ynEYrdDkdRGouaITKiJc2lcw",
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export async function POST(req) {
//     const body = req.body;
//     const completion = await openai.chat.completion.create({
//         model: body.model,
//         messages: body.messages
//     });
    
//     return completion;

// }

















export default async function handler(req, res) {
    
    const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers
  
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method should be POST' });
    } else if (process.env.NODE_ENV !== "development") {
      if (!referer || referer !== process.env.APP_URL) {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
    else {
      try {
        console.log(req);
        const { body } = req;
        const url = 'https://api.openai.com/v1/chat/completions';
        const headers = {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        };
  
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          const errorData = await response.json();
          res.status(response.status).json(errorData);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
  