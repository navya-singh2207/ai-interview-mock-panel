"use client";

import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    title: "AI Mock Interviews",
    description:
      "Practice with a structured panel that mirrors real hiring conversations.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 10h8M8 14h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect
          x="3.75"
          y="4.75"
          width="16.5"
          height="14.5"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Multi-Perspective Feedback",
    description:
      "Hear from HR, Technical, and Hiring Manager voices on the same answer.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="8" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="15.5" r="2.25" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Real-Time Scoring",
    description:
      "Get clear 10-point scores as each interviewer finishes their review.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 16V8M12 16V5M19 16v-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Personalized Improvement",
    description:
      "Leave with specific guidance on what to strengthen before your next interview.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
];

export default function Features() {
  return (
    <section className="section-light bg-[#F7F6F2] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="section-eyebrow">Why teams practice here</p>
          <h2 className="light-heading mt-3 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
            Built for serious interview preparation.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <article className="group h-full rounded-[1.25rem] border border-[rgba(17,17,17,0.1)] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300"
                  style={{
                    border: "1px solid rgba(17,17,17,0.12)",
                    background: "#F7F6F2",
                    color: "#111111",
                  }}
                >
                  {feature.icon}
                </span>
                <h3 className="light-heading mt-5 font-serif text-xl">
                  {feature.title}
                </h3>
                <p className="light-body mt-3 font-sans text-sm leading-relaxed">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
