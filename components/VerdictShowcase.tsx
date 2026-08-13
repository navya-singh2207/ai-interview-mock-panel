"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { formatScore } from "@/lib/scoring";

interface Metric {
  label: string;
  value: number;
}

interface VerdictShowcaseProps {
  overallScore: number | null;
  recommendation: string | null;
  metrics: Metric[];
  label: string | null;
}

const DEMO_METRICS: Metric[] = [
  { label: "Communication", value: 8.8 },
  { label: "Technical Depth", value: 8.1 },
  { label: "Confidence", value: 8.5 },
  { label: "Role Fit", value: 8.2 },
];

export default function VerdictShowcase({
  overallScore,
  recommendation,
  metrics,
  label,
}: VerdictShowcaseProps) {
  const reduced = useReducedMotion();
  const hasLive = typeof overallScore === "number";
  const score = hasLive ? overallScore : 8.4;
  const rows = metrics.length ? metrics : DEMO_METRICS;
  const verdictLabel = label || "Strong Candidate";
  const body =
    recommendation ||
    "Clear structure, strong ownership signals, and credible technical judgment. Ready for onsite rounds with focused follow-ups on system tradeoffs.";

  const [display, setDisplay] = useState(reduced ? score : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(score);
      return;
    }
    const duration = 900;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Number((eased * score).toFixed(1)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score, reduced]);

  const liveHint = useMemo(
    () =>
      hasLive
        ? "Live from your latest panel review"
        : "Sample scorecard — run a panel review to personalize this",
    [hasLive]
  );

  return (
    <section className="section-dark py-20 sm:py-24" style={{ background: "#0B0C0E" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <Reveal>
          <p className="dark-label font-mono text-[11px] uppercase tracking-[0.18em]">
            Final verdict
          </p>
          <h2 className="dark-heading mt-4 font-serif text-3xl leading-tight sm:text-5xl">
            Know exactly where you stand.
          </h2>
          <p className="dark-body mt-5 max-w-lg font-sans text-base leading-relaxed">
            Your moderator scorecard turns three independent reviews into one
            clear hiring signal — with the dimensions that matter most.
          </p>
          <p
            className="mt-6 font-mono text-[11px] tracking-[0.08em]"
            style={{ color: "#00A3FF" }}
          >
            {liveHint}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="rounded-[1.5rem] p-6 shadow-product sm:p-8"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            }}
          >
            <div
              className="flex items-end justify-between gap-4 pb-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div>
                <p className="dark-label font-mono text-[11px] uppercase tracking-[0.14em]">
                  Overall score
                </p>
                <p className="dark-heading mt-2 font-mono text-5xl tracking-tight">
                  {formatScore(display)}
                  <span className="dark-muted text-2xl"> / 10</span>
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1.5 font-sans text-xs font-medium"
                style={{
                  border: "1px solid rgba(108,99,255,0.45)",
                  background: "rgba(108,99,255,0.18)",
                  color: "#C7C3FF",
                }}
              >
                {verdictLabel}
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {rows.map((metric, index) => (
                <li key={metric.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="dark-body font-sans text-sm">
                      {metric.label}
                    </span>
                    <span className="dark-heading font-mono text-sm">
                      {formatScore(metric.value)}
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full"
                    style={{ background: "rgba(255,255,255,0.14)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #6C63FF 0%, #00A3FF 100%)",
                      }}
                      initial={reduced ? false : { width: 0 }}
                      whileInView={{ width: `${(metric.value / 10) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <p
              className="dark-body mt-7 pt-5 font-sans text-sm leading-relaxed"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
            >
              {body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
