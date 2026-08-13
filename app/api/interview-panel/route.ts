import { NextRequest, NextResponse } from "next/server";
import { callLLM } from "@/lib/llm";
import {
  HR_PERSONA_PROMPT,
  TECHNICAL_PERSONA_PROMPT,
  HIRING_MANAGER_PERSONA_PROMPT,
  MODERATOR_PROMPT,
} from "@/lib/personas";

export const runtime = "nodejs";

interface InterviewPanelRequestBody {
  question?: string;
  candidateAnswer?: string;
}

type StreamStage = "hr" | "technical" | "hiring_manager" | "moderator";

function buildCandidateMessage(question: string, candidateAnswer: string): string {
  return `Interview Question:\n${question}\n\nCandidate Answer:\n${candidateAnswer}`;
}

function buildModeratorMessage(
  question: string,
  candidateAnswer: string,
  hrResponse: string,
  technicalResponse: string,
  hiringManagerResponse: string
): string {
  return `Interview Question:
${question}

Candidate Answer:
${candidateAnswer}

Panel Feedback:

HR:
${hrResponse}

Technical:
${technicalResponse}

Hiring Manager:
${hiringManagerResponse}

Synthesize the panel feedback into a final verdict.`;
}

export async function POST(request: NextRequest) {
  let body: InterviewPanelRequestBody;

  try {
    body = (await request.json()) as InterviewPanelRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const question = body.question?.trim();
  const candidateAnswer = body.candidateAnswer?.trim();

  if (!question || !candidateAnswer) {
    return NextResponse.json(
      { error: "Both question and candidateAnswer are required." },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(payload)}\n`));
      };

      try {
        const candidateMessage = buildCandidateMessage(
          question,
          candidateAnswer
        );

        send({ type: "status", stage: "hr" satisfies StreamStage });
        const hrResponse = await callLLM(HR_PERSONA_PROMPT, candidateMessage);
        send({ type: "persona", persona: "hr", content: hrResponse });

        send({ type: "status", stage: "technical" satisfies StreamStage });
        const technicalResponse = await callLLM(
          TECHNICAL_PERSONA_PROMPT,
          candidateMessage
        );
        send({
          type: "persona",
          persona: "technical",
          content: technicalResponse,
        });

        send({
          type: "status",
          stage: "hiring_manager" satisfies StreamStage,
        });
        const hiringManagerResponse = await callLLM(
          HIRING_MANAGER_PERSONA_PROMPT,
          candidateMessage
        );
        send({
          type: "persona",
          persona: "hiring_manager",
          content: hiringManagerResponse,
        });

        send({ type: "status", stage: "moderator" satisfies StreamStage });
        const finalVerdict = await callLLM(
          MODERATOR_PROMPT,
          buildModeratorMessage(
            question,
            candidateAnswer,
            hrResponse,
            technicalResponse,
            hiringManagerResponse
          )
        );
        send({ type: "verdict", content: finalVerdict });
        send({ type: "done" });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unexpected server error.";
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
