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
          content: userText
        }
      ]
    });

    // 🔥 NEW CORRECT RESPONSE PARSER
    let aiReply = "No response received.";

    if (
      response.output &&
      response.output.length > 0 &&
      response.output[0].content &&
      response.output[0].content.length > 0 &&
      response.output[0].content[0].text
    ) {
      aiReply = response.output[0].content[0].text;
    }

    res.status(200).json({ reply: aiReply });

  } catch (err) {
    console.error("YES CHAT API ERROR →", err);
    res.status(500).json({ reply: "Server Error" });
  }
}
