import OpenAI from "openai";

// 🚀 NEW VERCEL API ROUTE FORMAT (Edge-Compatible)
export async function POST(request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { text = "" } = await request.json();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      assistant_id: "asst_kA8SVGnVDwzVRu6uSP2e27PP",
      input: [
        {
          role: "system",
          content: "You are YES Chat™, respond with emotional precision."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    let reply = "No response received.";

    if (
      response.output?.[0]?.content?.[0]?.text
    ) {
      reply = response.output[0].content[0].text;
    }

    return Response.json({ reply });

  } catch (err) {
    console.error("YES CHAT API ERROR →", err);
    return Response.json({ reply: "Server Error" }, { status: 500 });
  }
}

// Optional GET (for browser check)
export async function GET() {
  return Response.json({ reply: "YES Chat™ API is live." });
}
