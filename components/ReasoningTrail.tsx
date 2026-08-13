"use client";

import { useEffect, useState } from "react";

const STEPS = [
  {
    id: "thought",
    label: "Thought",
    durationLabel: "3s",
    durationMs: 3000,
    separator: " " as const,
  },
  {
    id: "review",
    label: "Reviewing candidate response",
    durationLabel: "2s",
    durationMs: 2000,
    separator: " · " as const,
  },
  {
    id: "draft",
    label: "Drafting feedback",
    durationLabel: "4s",
    durationMs: 4000,
    separator: " · " as const,
  },
];

const STAGGER_MS = 600;
const REDUCED_STAGGER_MS = 80;

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.25 6.25L4.75 8.75L9.75 3.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <span className="reasoning-spinner" aria-hidden>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle
          cx="6"
          cy="6"
          r="4.25"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <path
          d="M10.25 6A4.25 4.25 0 0 0 6 1.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

interface ReasoningTrailProps {
  active: boolean;
}

export default function ReasoningTrail({ active }: ReasoningTrailProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!active) {
      setVisibleCount(0);
      setCompleted({});
      return;
    }

    const timers: number[] = [];
    const stagger = reducedMotion ? REDUCED_STAGGER_MS : STAGGER_MS;

    STEPS.forEach((step, index) => {
      const appearAt = index * stagger;
      timers.push(
        window.setTimeout(() => {
          setVisibleCount((count) => Math.max(count, index + 1));
        }, appearAt)
      );
      timers.push(
        window.setTimeout(() => {
          setCompleted((prev) => ({ ...prev, [step.id]: true }));
        }, appearAt + step.durationMs)
      );
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [active, reducedMotion]);

  return (
    <ul className="reasoning-trail" aria-live="polite" aria-busy={active}>
      {STEPS.slice(0, visibleCount).map((step) => {
        const done = Boolean(completed[step.id]);
        return (
          <li
            key={step.id}
            className={
              reducedMotion ? "reasoning-step reasoning-step-fade" : "reasoning-step reasoning-step-slide"
            }
          >
            <span
              className={`reasoning-icon ${done ? "is-done" : "is-active"}`}
            >
              {done ? <CheckIcon /> : <SpinnerIcon />}
            </span>
            <span className="reasoning-copy">
              <span className="reasoning-label">{step.label}</span>
              <span className="reasoning-time">
                {step.separator}
                {step.durationLabel}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
