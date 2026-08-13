"use client";

import Reveal from "@/components/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Answer",
    description: "Answer a realistic interview question in your own words.",
  },
  {
    number: "02",
    title: "Get reviewed",
    description:
      "Three AI interviewers evaluate your response from different perspectives.",
  },
  {
    number: "03",
    title: "Get your verdict",
    description:
      "A moderator combines the feedback and gives you a final assessment.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-light bg-[#F7F6F2] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="section-eyebrow">How it works</p>
          <h2 className="light-heading mt-3 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
            From answer to verdict in three clear steps.
          </h2>
        </Reveal>

        <div className="relative mt-12 grid gap-5 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16%] right-[16%] top-[2.35rem] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(17,17,17,0.18), transparent)",
            }}
          />
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.12}>
              <article
                className="relative h-full rounded-[1.25rem] bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift"
                style={{ border: "1px solid rgba(17,17,17,0.1)" }}
              >
                <p
                  className="font-mono text-sm tracking-[0.08em]"
                  style={{ color: "#6C63FF" }}
                >
                  {step.number}
                </p>
                <h3 className="light-heading mt-4 font-serif text-2xl">
                  {step.title}
                </h3>
                <p className="light-body mt-3 font-sans text-sm leading-relaxed">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
