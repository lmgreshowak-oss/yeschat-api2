import OpenAI from "openai";

export default async function handler(req, res) {
  // CORS (required for GHL)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET → simple check
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "YES Chat™ API is live." });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const userText = req.body?.text || "";

    // ⭐ Correct Responses API call using assistant_id
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      assistant_id: "asst_kA8SVGnVDwzVRu6uSP2e27PP",  // your assistant
      input: userText
    });

    // Extract text
    const aiReply =
      response.output?.[0]?.content?.[0]?.text ||
      "No response received.";

    return res.status(200).json({ reply: aiReply });

  } catch (err) {
    console.error("❌ YES CHAT ERROR:", err);
    return res.status(500).json({ reply: "Server Error" });
  }
}
