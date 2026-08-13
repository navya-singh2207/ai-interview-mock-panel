"use client";

import { useEffect, useState } from "react";

type ScoreSize = "sm" | "lg";

interface ScoreIndicatorProps {
  score: number;
  size?: ScoreSize;
  animate?: boolean;
  track?: "light" | "dark";
}

function clampScore(score: number): number {
  if (Number.isNaN(score)) return 0;
  return Math.min(10, Math.max(0, score));
}

export function getScoreColor(score: number): string {
  const value = clampScore(score);
  if (value <= 4) return "#E5484D";
  if (value <= 7) return "#F5A623";
  return "#16A34A";
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ScoreIndicator({
  score,
  size = "sm",
  animate = true,
  track = "light",
}: ScoreIndicatorProps) {
  const value = clampScore(score);
  const color = getScoreColor(value);
  const shouldAnimate = animate && !prefersReducedMotion();
  const [fill, setFill] = useState(shouldAnimate ? 0 : value);
  const [display, setDisplay] = useState(shouldAnimate ? 0 : value);

  useEffect(() => {
    if (!shouldAnimate) {
      setFill(value);
      setDisplay(value);
      return;
    }

    setFill(0);
    setDisplay(0);

    const duration = 650;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setFill(current);
      setDisplay(Math.round(current));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setFill(value);
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, shouldAnimate]);

  const isLarge = size === "lg";

  return (
    <div
      className={`inline-flex items-center ${isLarge ? "gap-2.5" : "gap-2"}`}
      aria-label={`Score ${value} out of 10`}
    >
      <div
        className="overflow-hidden rounded-full"
        style={{
          width: isLarge ? "5.25rem" : "3.25rem",
          height: isLarge ? "0.35rem" : "0.22rem",
          background:
            track === "dark" ? "rgba(255,255,255,0.12)" : "rgba(17,17,17,0.08)",
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${(fill / 10) * 100}%`,
            background: color,
          }}
        />
      </div>
      <span
        className={`font-mono tabular-nums tracking-tight ${
          isLarge ? "text-base" : "text-xs"
        }`}
        style={{ color }}
      >
        {display}/10
      </span>
    </div>
  );
}
