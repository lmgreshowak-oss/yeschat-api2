import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "YES Chat™ API is live." });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const userText = req.body.text || "";

    // --- Correct Responses API call ---
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "You are YES Chat™, respond with emotional precision."
        },
        {
          role: "user",
          content: userText
        }
      ]
    });

    // Safe extraction of output
    const aiReply =
      response.output?.[0]?.content?.[0]?.text ||
      response.output_text ||
      "YES Chat™ is awake but returned no content.";

    res.status(200).json({ reply: aiReply });

  } catch (err) {
    console.error("YES CHAT ERROR:", err);
    res.status(500).json({ reply: "Server Error" });
  }
}
