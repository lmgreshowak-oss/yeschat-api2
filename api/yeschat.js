import OpenAI from "openai";

// ✔ Vercel API Route: POST + GET using Web Fetch API
export async function POST(request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { text = "" } = await request.json(); // <-- required on Vercel

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

    // --- SAFE RESPONSE PARSER ---
    let reply = "No response received.";

    if (response.output?.[0]?.content?.[0]?.text) {
      reply = response.output[0].content[0].text;
    }

    return Response.json({ reply });

  } catch (err) {
    console.error("YES CHAT API ERROR →", err);
    return Response.json({ reply: "Server Error" }, { status: 500 });
  }
}

// ✔ Optional browser GET check (works when you visit the URL)
export async function GET() {
  return Response.json({ reply: "YES Chat™ API is live." });
}
