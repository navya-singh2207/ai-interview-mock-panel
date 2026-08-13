const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";

export interface GeminiGenerateOptions {
  model?: string;
  systemInstruction?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GeminiGenerateResult {
  text: string;
  model: string;
  raw: unknown;
}

function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing GEMINI_API_KEY. Add it to your environment or .env.local file."
    );
  }
  return apiKey;
}

export async function generateWithGemini(
  prompt: string,
  options: GeminiGenerateOptions = {}
): Promise<GeminiGenerateResult> {
  const {
    model = "gemini-1.5-flash",
    systemInstruction,
    temperature = 0.7,
    maxOutputTokens = 1024,
  } = options;

  const apiKey = getApiKey();
  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;

  const body: Record<string, unknown> = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gemini API request failed (${response.status}): ${errorText}`
    );
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim() ?? "";

  if (!text) {
    throw new Error("Gemini API returned an empty response.");
  }

  return {
    text,
    model,
    raw: data,
  };
}
