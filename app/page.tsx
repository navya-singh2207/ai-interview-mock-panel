"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Features from "@/components/Features";
import HeroMockup from "@/components/HeroMockup";
import HowItWorks from "@/components/HowItWorks";
import InterviewWorkspace, {
  WorkspaceSnapshot,
} from "@/components/InterviewWorkspace";
import PanelFlow from "@/components/PanelFlow";
import TrustStrip from "@/components/TrustStrip";
import VerdictShowcase from "@/components/VerdictShowcase";

const EMPTY_SNAPSHOT: WorkspaceSnapshot = {
  overallScore: null,
  recommendation: null,
  label: null,
  metrics: [],
};

export default function Home() {
  const reduced = useReducedMotion();
  const [snapshot, setSnapshot] = useState<WorkspaceSnapshot>(EMPTY_SNAPSHOT);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">
          <a
            href="#"
            className="font-sans text-sm font-semibold tracking-tight"
            style={{ color: "#111111" }}
          >
            Interview Panel
            <span className="ml-1 font-normal" style={{ color: "#666666" }}>
              / mock
            </span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#how-it-works"
              className="btn-ghost hidden sm:inline-flex"
              style={{ color: "#111111" }}
            >
              How it works
            </a>
            <a
              href="#workspace"
              className="btn-primary !px-4 !py-2.5 text-sm"
              style={{ background: "#111111", color: "#FFFFFF" }}
            >
              Start mock
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section-light relative overflow-hidden bg-[#F7F6F2] pb-16 pt-12 sm:pb-20 sm:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.12),_transparent_55%)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10">
            <div>
              <motion.span
                className="inline-flex items-center rounded-full bg-white px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] shadow-soft"
                style={{
                  border: "1px solid rgba(108,99,255,0.25)",
                  color: "#6C63FF",
                }}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                AI Interview Coach
              </motion.span>

              <motion.h1
                className="light-heading mt-6 font-serif text-[2.7rem] font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Practice smarter.
                <br />
                Interview with confidence.
              </motion.h1>

              <motion.p
                className="light-body mt-5 max-w-xl font-sans text-base leading-relaxed sm:text-lg"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                Get interviewed by an AI panel of HR, Technical, and Hiring
                Manager personas — then receive detailed feedback and a final
                hiring verdict.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <a
                  href="#workspace"
                  className="btn-primary"
                  style={{ background: "#111111", color: "#FFFFFF" }}
                >
                  Start Mock Interview
                </a>
                <a
                  href="#how-it-works"
                  className="btn-secondary"
                  style={{
                    background: "#FFFFFF",
                    color: "#111111",
                    borderColor: "rgba(17,17,17,0.14)",
                  }}
                >
                  See How It Works
                </a>
              </motion.div>
            </div>

            <HeroMockup />
          </div>
        </section>

        <TrustStrip />
        <HowItWorks />
        <InterviewWorkspace onSnapshotChange={setSnapshot} />
        <PanelFlow />
        <VerdictShowcase
          overallScore={snapshot.overallScore}
          recommendation={snapshot.recommendation}
          metrics={snapshot.metrics}
          label={snapshot.label}
        />
        <Features />

        <section className="section-light border-t border-[rgba(17,17,17,0.1)] bg-white py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-10">
            <div>
              <h2 className="light-heading font-serif text-3xl">
                Ready for your next interview?
              </h2>
              <p className="light-body mt-2 max-w-lg font-sans">
                Run a panel review now and leave with a clearer signal of where
                you stand.
              </p>
            </div>
            <a
              href="#workspace"
              className="btn-primary"
              style={{ background: "#111111", color: "#FFFFFF" }}
            >
              Start Mock Interview
            </a>
          </div>
        </section>
      </main>

      <footer className="section-light border-t border-[rgba(17,17,17,0.1)] bg-[#F7F6F2] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 sm:px-8 lg:px-10">
          <p className="light-muted font-sans text-sm">
            Interview Panel / mock — practice with a premium AI panel.
          </p>
          <p className="light-muted font-mono text-[11px] tracking-[0.08em]">
            HR · Technical · Hiring Manager
          </p>
        </div>
      </footer>
    </div>
  );
}
