"use client";

import Reveal from "@/components/Reveal";

const ITEMS = [
  {
    label: "3 AI Interviewers",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="8" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Instant Feedback",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "10-Point Scoring",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 16V9M12 16V6M18 16v-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Final Hiring Verdict",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 12.5 10.2 15.7 17 8.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section className="section-light border-y border-[rgba(17,17,17,0.1)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10 lg:py-7">
        {ITEMS.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.05} y={10}>
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  border: "1px solid rgba(17,17,17,0.12)",
                  background: "#F7F6F2",
                  color: "#111111",
                }}
              >
                {item.icon}
              </span>
              <p className="light-heading font-sans text-sm font-medium tracking-wide">
                {item.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
