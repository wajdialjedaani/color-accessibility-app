
export async function POST( req) {
  const {message} = await req.json();
  const apiKey = process.env.OPENAI_API_KEY
  const url = 'https://api.openai.com/v1/chat/completions'

  const body = JSON.stringify({
    messages: [
      {"role": "system", "content": "You are professional color blindness analyzer. You are helping a client to answer his color blindness questions. You answer questions by one sentence"},
      {"role": "user", "content": message}],
    model: 'gpt-3.5-turbo',
    stream: false,
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body,
    })
    const data = await response.json()
    console.log(data);
    return Response.json(data);
  } catch (error) {
    // res.status(500).json({ error: error.message })
    return Response.json({ error: error.message, "one": "yoasd" });
  }
}