import Groq from "groq-sdk";

const MODEL = "llama-3.3-70b-versatile";

function getGroqClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing GROQ_API_KEY. Add it to your environment or .env.local file."
    );
  }

  return new Groq({ apiKey });
}

/**
 * Calls Groq chat completions with a system prompt and user message.
 * Returns the assistant response text.
 */
export async function callLLM(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  try {
    const client = getGroqClient();

    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.7,
      max_tokens: 300,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("Groq API returned an empty response.");
    }

    return content;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("GROQ_API_KEY") ||
        error.message.includes("empty response"))
    ) {
      throw error;
    }

    const detail =
      error instanceof Error ? error.message : "Unknown error occurred.";

    throw new Error(`Groq LLM request failed: ${detail}`);
  }
}
