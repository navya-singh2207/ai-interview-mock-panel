"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import ReasoningTrail from "@/components/ReasoningTrail";
import Reveal from "@/components/Reveal";
import ScoreIndicator from "@/components/ScoreIndicator";
import {
  CATEGORY_LABELS,
  INTERVIEW_QUESTIONS,
  QUESTION_CATEGORIES,
  getQuestionById,
  getQuestionsByCategory,
} from "@/lib/questions";
import { extractScore, stripScoreLine } from "@/lib/scoring";

interface PanelResult {
  hrResponse: string;
  technicalResponse: string;
  hiringManagerResponse: string;
  finalVerdict: string;
}

type LoadingStage = "hr" | "technical" | "hiring_manager" | "moderator" | null;

type StreamEvent =
  | { type: "status"; stage: Exclude<LoadingStage, null> }
  | {
      type: "persona";
      persona: "hr" | "technical" | "hiring_manager";
      content: string;
    }
  | { type: "verdict"; content: string }
  | { type: "done" }
  | { type: "error"; message: string };

const PERSONA_CARDS = [
  {
    key: "hr" as const,
    label: "HR Interviewer",
    shortLabel: "HR",
    name: "Priya Mehta",
    descriptor: "Culture, communication, and candidate fit.",
    responseKey: "hrResponse" as const,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    key: "technical" as const,
    label: "Technical Interviewer",
    shortLabel: "Technical",
    name: "Arjun Shah",
    descriptor: "Depth, clarity, and engineering judgment.",
    responseKey: "technicalResponse" as const,
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    key: "hiring_manager" as const,
    label: "Hiring Manager",
    shortLabel: "Hiring Manager",
    name: "Neha Kapoor",
    descriptor: "Ownership, impact, and long-term potential.",
    responseKey: "hiringManagerResponse" as const,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=80",
  },
];

const LOADING_COPY: Record<Exclude<LoadingStage, null>, string> = {
  hr: "Priya is reviewing your answer",
  technical: "Arjun is reviewing your answer",
  hiring_manager: "Neha is reviewing your answer",
  moderator: "Moderator is compiling the verdict",
};

const DEFAULT_QUESTION_ID = INTERVIEW_QUESTIONS[0]?.id ?? "";

const EMPTY_RESULT: PanelResult = {
  hrResponse: "",
  technicalResponse: "",
  hiringManagerResponse: "",
  finalVerdict: "",
};

export interface WorkspaceSnapshot {
  overallScore: number | null;
  recommendation: string | null;
  label: string | null;
  metrics: { label: string; value: number }[];
}

interface InterviewWorkspaceProps {
  onSnapshotChange?: (snapshot: WorkspaceSnapshot) => void;
}

export default function InterviewWorkspace({
  onSnapshotChange,
}: InterviewWorkspaceProps) {
  const [questionId, setQuestionId] = useState(DEFAULT_QUESTION_ID);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PanelResult>(EMPTY_RESULT);
  const [visibleCards, setVisibleCards] = useState({
    hr: false,
    technical: false,
    hiring_manager: false,
    verdict: false,
  });
  const [activatedCard, setActivatedCard] = useState<
    "hr" | "technical" | "hiring_manager" | "verdict" | null
  >(null);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [hasStartedReview, setHasStartedReview] = useState(false);

  const selectedQuestion = useMemo(
    () => getQuestionById(questionId) ?? INTERVIEW_QUESTIONS[0],
    [questionId]
  );

  const hasQuestion = Boolean(selectedQuestion?.text.trim());
  const hasAnswer = candidateAnswer.trim().length > 0;
  const canSubmit = hasQuestion && hasAnswer && !isLoading;
  const verdictScore = extractScore(result.finalVerdict);

  function publishSnapshot(next: PanelResult, visibleVerdict: boolean) {
    if (!onSnapshotChange) return;
    const hr = extractScore(next.hrResponse);
    const tech = extractScore(next.technicalResponse);
    const hm = extractScore(next.hiringManagerResponse);
    const overall = extractScore(next.finalVerdict);
    const metrics = [
      hr != null ? { label: "Communication", value: hr } : null,
      tech != null ? { label: "Technical Depth", value: tech } : null,
      overall != null
        ? {
            label: "Confidence",
            value: Number(
              (
                ((hr ?? overall) + (tech ?? overall) + (hm ?? overall)) /
                3
              ).toFixed(1)
            ),
          }
        : null,
      hm != null ? { label: "Role Fit", value: hm } : null,
    ].filter(Boolean) as { label: string; value: number }[];

    const recommendation = visibleVerdict
      ? stripScoreLine(next.finalVerdict)
      : null;
    const label =
      overall == null
        ? null
        : overall >= 8
          ? "Strong Candidate"
          : overall >= 6
            ? "Promising Candidate"
            : "Needs Development";

    onSnapshotChange({
      overallScore: overall,
      recommendation,
      label,
      metrics,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || !selectedQuestion) return;

    const q = selectedQuestion.text.trim();
    const a = candidateAnswer.trim();

    setIsLoading(true);
    setLoadingStage("hr");
    setError(null);
    setResult(EMPTY_RESULT);
    setVisibleCards({
      hr: false,
      technical: false,
      hiring_manager: false,
      verdict: false,
    });
    setActivatedCard(null);
    setSubmittedQuestion(q);
    setSubmittedAnswer(a);
    setHasStartedReview(true);
    onSnapshotChange?.({
      overallScore: null,
      recommendation: null,
      label: null,
      metrics: [],
    });

    try {
      const res = await fetch("/api/interview-panel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, candidateAnswer: a }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to get panel response.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let latest = EMPTY_RESULT;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          const event = JSON.parse(trimmed) as StreamEvent;

          if (event.type === "status") {
            setLoadingStage(event.stage);
          } else if (event.type === "persona") {
            latest = {
              ...latest,
              ...(event.persona === "hr"
                ? { hrResponse: event.content }
                : event.persona === "technical"
                  ? { technicalResponse: event.content }
                  : { hiringManagerResponse: event.content }),
            };
            setResult(latest);
            setVisibleCards((prev) => ({ ...prev, [event.persona]: true }));
            setActivatedCard(event.persona);
            publishSnapshot(latest, false);
          } else if (event.type === "verdict") {
            latest = { ...latest, finalVerdict: event.content };
            setResult(latest);
            setVisibleCards((prev) => ({ ...prev, verdict: true }));
            setActivatedCard("verdict");
            setLoadingStage(null);
            publishSnapshot(latest, true);
          } else if (event.type === "error") {
            throw new Error(event.message);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoadingStage(null);
    } finally {
      setIsLoading(false);
      setLoadingStage(null);
    }
  }

  return (
    <section id="workspace" className="section-light bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="section-eyebrow">Interview panel</p>
          <h2 className="light-heading mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Run a live mock interview with your AI panel.
          </h2>
          <p className="light-body mt-4 max-w-2xl font-sans text-base">
            Choose a question, write your answer, and watch HR, Technical, and
            Hiring Manager personas respond in sequence.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-[1.5rem] border border-line bg-canvas shadow-soft"
          >
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <label htmlFor="question" className="field-label">
                  Interview question
                </label>
                <select
                  id="question"
                  name="question"
                  value={questionId}
                  onChange={(e) => setQuestionId(e.target.value)}
                  className="field-control"
                  disabled={isLoading}
                >
                  {QUESTION_CATEGORIES.map((category) => (
                    <optgroup key={category} label={CATEGORY_LABELS[category]}>
                      {getQuestionsByCategory(category).map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.text}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                {selectedQuestion && (
                  <div className="mt-6 rounded-2xl border border-accent-violet/15 bg-white p-5">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-violet">
                      {CATEGORY_LABELS[selectedQuestion.category]}
                    </p>
                    <p className="light-heading font-serif text-xl leading-snug">
                      {selectedQuestion.text}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <label htmlFor="answer" className="field-label">
                  Your answer
                </label>
                <div className="relative">
                  <textarea
                    id="answer"
                    name="candidateAnswer"
                    value={candidateAnswer}
                    onChange={(e) => setCandidateAnswer(e.target.value)}
                    rows={9}
                    autoComplete="off"
                    spellCheck
                    disabled={isLoading}
                    className="field-control min-h-[220px] resize-y pb-14"
                    placeholder="Write a clear, structured candidate response…"
                  />
                  <button
                    type="button"
                    className="mic-affordance"
                    title="Voice input coming soon"
                    aria-label="Voice input coming soon"
                  >
                    <MicIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-line bg-white px-6 py-5 sm:px-8">
              <button
                type="submit"
                disabled={!canSubmit}
                aria-disabled={!canSubmit}
                className="btn-primary"
              >
                {isLoading ? "Reviewing…" : "Run Panel Review"}
              </button>

              {!canSubmit && !isLoading && (
                <span className="light-muted font-sans text-sm">
                  {!hasAnswer
                    ? "Enter your answer to enable the review."
                    : !hasQuestion
                      ? "Select an interview question to continue."
                      : null}
                </span>
              )}

              {isLoading && loadingStage && (
                <span className="loading-status" aria-live="polite">
                  <span className="loading-dot" />
                  <span className="loading-status-text loading-ellipsis">
                    {LOADING_COPY[loadingStage]}
                  </span>
                </span>
              )}

              {error && (
                <p className="error-banner w-full sm:w-auto" role="alert">
                  {error}
                </p>
              )}
            </div>
          </form>
        </Reveal>

        {(submittedQuestion || hasStartedReview) && (
          <div className="mt-10 rounded-[1.5rem] border border-line bg-canvas p-6 sm:p-8">
            <p className="field-label">The question</p>
            <h3 className="light-heading mt-2 max-w-4xl font-serif text-2xl leading-snug sm:text-3xl">
              {submittedQuestion || selectedQuestion?.text}
            </h3>
            {submittedAnswer && (
              <div className="mt-6">
                <p className="field-label">Candidate answer</p>
                <p className="light-body mt-2 whitespace-pre-wrap font-sans text-base leading-relaxed">
                  {submittedAnswer}
                </p>
              </div>
            )}
          </div>
        )}

        {hasStartedReview && (
          <div className="mt-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="field-label">Evaluator cards</p>
                <h3 className="light-heading mt-1 font-serif text-2xl">
                  Live panel responses
                </h3>
              </div>
              <p className="light-muted font-mono text-[11px] tracking-[0.08em]">
                HR → Technical → Hiring Manager
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {PERSONA_CARDS.map((card, index) => {
                const isVisible = visibleCards[card.key];
                const justActivated = activatedCard === card.key;
                const raw = result[card.responseKey];
                const score = raw ? extractScore(raw) : null;
                const feedback = raw ? stripScoreLine(raw) : "";
                const isCurrent =
                  isLoading &&
                  ((card.key === "hr" && loadingStage === "hr") ||
                    (card.key === "technical" &&
                      loadingStage === "technical") ||
                    (card.key === "hiring_manager" &&
                      loadingStage === "hiring_manager"));
                const isActivePanel = isVisible || isCurrent;

                return (
                  <article
                    key={card.key}
                    className={`evaluator-card ${
                      isActivePanel ? "opacity-100" : "opacity-55"
                    } ${justActivated ? "panel-activate" : ""}`}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-line">
                          <Image
                            src={card.avatar}
                            alt={`${card.name}, ${card.label}`}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="light-heading font-serif text-lg">
                            {card.name}
                          </h4>
                          <p className="light-muted mt-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
                            {card.shortLabel}
                          </p>
                        </div>
                      </div>
                      {typeof score === "number" ? (
                        <ScoreIndicator
                          key={`${card.key}-${score}`}
                          score={score}
                          size="sm"
                          animate={isVisible}
                          track="light"
                        />
                      ) : (
                        <span
                          className="font-mono text-[11px]"
                          style={{ color: "#6C63FF" }}
                        >
                          {isCurrent ? "…" : "—/10"}
                        </span>
                      )}
                    </div>

                    <p className="light-muted mt-4 font-sans text-xs">
                      {card.descriptor}
                    </p>

                    <div className="mt-4 min-h-[6.5rem]">
                      {isVisible ? (
                        <p className="feedback-reveal light-body whitespace-pre-wrap font-sans text-sm leading-relaxed">
                          {feedback}
                        </p>
                      ) : isCurrent ? (
                        <ReasoningTrail active={isCurrent} />
                      ) : (
                        <p className="light-muted font-sans text-sm">
                          Awaiting turn…
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {visibleCards.verdict && result.finalVerdict && (
              <article
                className={`verdict-card mt-6 ${
                  activatedCard === "verdict" ? "panel-activate-verdict" : ""
                }`}
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p
                      className="font-mono text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: "#00A3FF" }}
                    >
                      Final verdict
                    </p>
                    <h4 className="light-heading mt-2 font-serif text-2xl sm:text-3xl">
                      Moderator
                    </h4>
                  </div>
                  {typeof verdictScore === "number" && (
                    <ScoreIndicator
                      key={`verdict-${verdictScore}`}
                      score={verdictScore}
                      size="lg"
                      animate
                      track="light"
                    />
                  )}
                </div>
                <p className="light-body max-w-4xl whitespace-pre-wrap font-sans text-base leading-relaxed sm:text-lg">
                  {stripScoreLine(result.finalVerdict)}
                </p>
              </article>
            )}

            {isLoading && loadingStage === "moderator" && (
              <p className="loading-status mt-6" aria-live="polite">
                <span className="loading-dot" />
                <span className="loading-status-text loading-ellipsis">
                  {LOADING_COPY.moderator}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19 11a7 7 0 0 1-14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
