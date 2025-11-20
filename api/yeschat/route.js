import OpenAI from "openai";

// CORS for browsers + GHL
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

// Add a GET so Vercel recognizes the route
export async function GET() {
  return new Response(
    JSON.stringify({ status: "YES Chat™ API online" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}

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
        { role: "system", content: "You are YES Chat™, respond with emotional precision." },
        { role: "user", content: text }
      ]
    });

    const reply =
      response.output?.[0]?.content?.[0]?.text ||
      "YES Chat™ could not generate a reply.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    console.error("YESCHAT API ERROR:", err);
    return new Response(
      JSON.stringify({ error: "Server error", details: err.message }),
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  }
}
