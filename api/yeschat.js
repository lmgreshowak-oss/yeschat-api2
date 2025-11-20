
import OpenAI from "openai";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const body = JSON.parse(req.body || "{}");
    const text = body.text || "";

    const client = new OpenAI(); // uses built-in key if provided by Vercel env

    const run = await client.beta.threads.createAndRun({
      assistant_id: "asst_kA8SVGnVDwzVRu6uSP2e27PP",
      thread: {
        messages: [{ role: "user", content: text }]
      }
    });

    const thread = await client.beta.threads.get(run.thread_id);
    const last = thread.messages[thread.messages.length - 1];
    const reply = last.content[0].text.value;

    res.status(200).json({ reply });
  } catch(err) {
    console.error("API error:", err);
    res.status(500).json({ reply: "Server Error" });
  }
}
