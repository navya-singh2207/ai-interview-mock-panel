export function extractScore(text: string): number | null {
  const match = text.match(/Score:\s*(\d{1,2})\s*\/\s*10/i);
  if (!match) return null;
  const score = Number(match[1]);
  if (Number.isNaN(score)) return null;
  return Math.min(10, Math.max(0, score));
}

export function stripScoreLine(text: string): string {
  return text.replace(/\n?Score:\s*\d{1,2}\s*\/\s*10\s*$/i, "").trim();
}

export function formatScore(score: number, digits = 1): string {
  return score.toFixed(digits);
}
