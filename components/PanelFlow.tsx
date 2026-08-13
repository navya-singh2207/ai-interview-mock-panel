"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";

const AGENTS = [
  { id: "hr", label: "HR", detail: "Culture & communication" },
  { id: "tech", label: "Technical", detail: "Depth & judgment" },
  { id: "hm", label: "Hiring Manager", detail: "Impact & ownership" },
];

export default function PanelFlow() {
  const reduced = useReducedMotion();

  return (
    <section className="section-light bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="section-eyebrow">AI panel visualization</p>
          <h2 className="light-heading mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Three specialists. One moderator. One clear call.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div
            className="overflow-hidden rounded-[1.5rem] p-6 shadow-soft sm:p-10"
            style={{
              border: "1px solid rgba(17,17,17,0.1)",
              background: "linear-gradient(180deg, #FBFBF8 0%, #FFFFFF 100%)",
            }}
          >
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <Node
                label="Candidate answer"
                style={{
                  border: "1px solid rgba(108,99,255,0.28)",
                  background: "rgba(108,99,255,0.12)",
                  color: "#111111",
                }}
              />

              <FlowLine reduced={!!reduced} />

              <div className="grid w-full gap-3 sm:grid-cols-3">
                {AGENTS.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.15 + index * 0.12, duration: 0.4 }}
                    className="rounded-2xl bg-white px-4 py-5 text-center shadow-soft"
                    style={{ border: "1px solid rgba(17,17,17,0.1)" }}
                  >
                    <p className="light-heading font-serif text-lg">
                      {agent.label}
                    </p>
                    <p className="light-muted mt-1 font-sans text-xs">
                      {agent.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              <FlowLine reduced={!!reduced} delay={0.35} />
              <Node
                label="AI moderator"
                style={{
                  border: "1px solid rgba(0,163,255,0.3)",
                  background: "rgba(0,163,255,0.12)",
                  color: "#111111",
                }}
              />
              <FlowLine reduced={!!reduced} delay={0.5} />
              <Node
                label="Final verdict"
                strong
                style={{
                  border: "1px solid #111111",
                  background: "#111111",
                  color: "#F5F5F7",
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Node({
  label,
  style,
  strong = false,
}: {
  label: string;
  style: CSSProperties;
  strong?: boolean;
}) {
  return (
    <div
      className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold ${
        strong ? "shadow-lift" : ""
      }`}
      style={style}
    >
      {label}
    </div>
  );
}

function FlowLine({
  reduced,
  delay = 0.1,
}: {
  reduced: boolean;
  delay?: number;
}) {
  return (
    <div
      className="relative my-3 h-10 w-px overflow-hidden"
      style={{ background: "rgba(17,17,17,0.18)" }}
    >
      {!reduced && (
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background: "linear-gradient(180deg, #6C63FF 0%, #00A3FF 100%)",
          }}
          initial={{ y: "-100%" }}
          whileInView={{ y: "180%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
            delay,
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
        />
      )}
    </div>
  );
}
