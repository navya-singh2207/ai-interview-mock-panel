"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const AGENTS = [
  {
    label: "HR",
    style: {
      background: "rgba(108,99,255,0.14)",
      color: "#6C63FF",
    } as const,
  },
  {
    label: "Technical",
    style: {
      background: "rgba(0,163,255,0.14)",
      color: "#0080C9",
    } as const,
  },
  {
    label: "Hiring Mgr",
    style: {
      background: "rgba(17,17,17,0.06)",
      color: "#111111",
    } as const,
  },
];

export default function HeroMockup() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <div className="absolute -left-6 top-10 hidden h-40 w-40 rounded-full bg-accent-violet/20 blur-3xl lg:block" />
      <div className="absolute -right-4 bottom-8 hidden h-36 w-36 rounded-full bg-accent-blue/20 blur-3xl lg:block" />

      <div className="product-frame relative overflow-hidden rounded-[1.25rem] border border-white/60 bg-white shadow-product">
        <div className="flex items-center gap-2 border-b border-line px-3.5 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-2.5 font-mono text-[10px]" style={{ color: "#666666" }}>
            mockpanel.app / live session
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[180px] border-b border-line lg:min-h-[270px] lg:border-b-0 lg:border-r">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
              alt="Candidate in a professional interview setting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 420px"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 35%, rgba(11,12,14,0.72) 100%)",
              }}
            />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/15 p-2.5 backdrop-blur-md">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/40">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80"
                    alt="Candidate avatar"
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="font-sans text-xs font-medium"
                    style={{ color: "#F5F5F7" }}
                  >
                    Alex Rivera
                  </p>
                  <p
                    className="font-mono text-[10px]"
                    style={{ color: "#D4D4D8" }}
                  >
                    Product Engineer · Live
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 bg-[#FBFBF8] p-3 sm:p-3.5">
            <div
              className="rounded-xl bg-white px-3 py-2.5 shadow-soft"
              style={{ border: "1px solid rgba(17,17,17,0.1)" }}
            >
              <p
                className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: "#666666" }}
              >
                Interview question
              </p>
              <p
                className="font-serif text-[0.95rem] leading-snug"
                style={{ color: "#111111" }}
              >
                Tell me about a time you owned a difficult technical decision
                end-to-end.
              </p>
            </div>

            <div
              className="rounded-xl bg-white px-3 py-2.5"
              style={{ border: "1px solid rgba(17,17,17,0.1)" }}
            >
              <div className="mb-2 flex items-center justify-between">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: "#666666" }}
                >
                  Live conversation
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-0.5 font-mono text-[10px] font-medium text-red-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  REC
                </span>
              </div>
              <div className="space-y-1.5">
                <div
                  className="max-w-[92%] rounded-xl rounded-tl-md px-2.5 py-1.5 text-xs leading-relaxed"
                  style={{ background: "rgba(17,17,17,0.04)", color: "#111111" }}
                >
                  I led a migration that reduced latency by 38% while keeping the
                  rollout reversible.
                </div>
                <div
                  className="ml-auto max-w-[88%] rounded-xl rounded-tr-md px-2.5 py-1.5 text-xs leading-relaxed"
                  style={{
                    background: "rgba(108,99,255,0.12)",
                    color: "#111111",
                  }}
                >
                  Strong ownership. Walk me through the tradeoffs you rejected.
                </div>
              </div>
              <div
                className="mt-2.5 flex items-center justify-between pt-2"
                style={{ borderTop: "1px solid rgba(17,17,17,0.1)" }}
              >
                <div
                  className="flex items-center gap-2"
                  style={{ color: "#666666" }}
                >
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{
                      border: "1px solid rgba(17,17,17,0.12)",
                      background: "#F7F6F2",
                      color: "#111111",
                    }}
                  >
                    <MicIcon />
                  </span>
                  <span className="font-sans text-[11px]">Voice ready</span>
                </div>
                <div className="flex items-end gap-0.5">
                  {(reduced ? [6, 11, 8, 13, 7] : [5, 11, 7, 14, 9, 12, 6]).map(
                    (h, i) => (
                      <motion.span
                        key={i}
                        className="w-1 rounded-full bg-accent-violet/80"
                        style={{ height: h }}
                        animate={
                          reduced
                            ? undefined
                            : { height: [h, h + 6, h], opacity: [0.55, 1, 0.55] }
                        }
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: i * 0.08,
                          ease: "easeInOut",
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {AGENTS.map((agent, index) => (
                <motion.span
                  key={agent.label}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px] font-medium"
                  style={agent.style}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {agent.label}
                </motion.span>
              ))}
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px]"
                style={{
                  background: "rgba(0,163,255,0.12)",
                  color: "#0080C9",
                }}
              >
                <span className="processing-dot" />
                AI reviewing
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
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
