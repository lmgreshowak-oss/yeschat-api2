import OpenAI from "openai";

export default async function handler(req, res) {
  // ========== CORS (required for GHL) ==========
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Allow GET for "API is live"
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "YES Chat™ API is live." });
  }

  try {
    // ========== OpenAI Client ==========
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Parse message from GHL
    const userText = req.body?.text || "";

    // ========== Responses API Call ==========
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      assistant_id: "asst_kA8SVGnVDwzVRu6uSP2e27PP", // ⭐ YOUR ASSISTANT
      input: [
        {
          role: "system",
          content: "You are YES Chat™, respond with emotional precision.",
        },
        {
          role: "user",
          content: userText,
        }
      ]
    });

    // Extract final assistant message
    const aiReply =
      response.output?.[0]?.content?.[0]?.text || "No response received.";

    console.log("YES CHAT API REPLY:", aiReply);

    return res.status(200).json({ reply: aiReply });

  } catch (err) {
    console.error("❌ YES Chat API Error:", err);
    return res.status(500).json({ reply: "Server Error" });
  }
}
