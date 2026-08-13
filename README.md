# AI Interview Mock Panel

An AI-powered interview practice platform that simulates realistic interview panels and provides structured feedback to help candidates improve their interview performance.

## Live Demo

[AI Interview Mock Panel](https://ai-interview-mock-panel.vercel.app/)

## Features

- AI-powered mock interviews
- HR, Technical and Hiring Manager interview perspectives
- Realistic interview questions
- AI-generated feedback
- Candidate performance scoring
- Final interview verdict
- Structured interview workflow
- Responsive modern UI
- Voice-ready interview experience

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Groq API
- AI/LLM Integration
- Vercel

## Project Structure

```text
ai-interview-mock-panel/
├── app/
│   └── page.tsx
│
├── components/
│   ├── Features.tsx
│   ├── HeroMockup.tsx
│   ├── HowItWorks.tsx
│   ├── InterviewWorkspace.tsx
│   ├── PanelFlow.tsx
│   ├── ReasoningTrail.tsx
│   ├── Reveal.tsx
│   ├── ScoreIndicator.tsx
│   ├── TrustStrip.tsx
│   └── VerdictShowcase.tsx
│
├── lib/
│   ├── gemini.ts
│   ├── llm.ts
│   ├── personas.ts
│   ├── questions.ts
│   └── scoring.ts
│
├── types/
│   └── index.ts
│
├── public/
├── .gitignore
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```


## How It Works

1. Start a mock interview
2. Answer realistic interview questions
3. AI interviewers evaluate the response
4. Different interviewer perspectives are combined
5. Candidate receives scores and feedback
6. Final verdict highlights strengths and improvement areas

## Interview Perspectives

### HR

Evaluates:
- Communication
- Confidence
- Culture fit

### Technical

Evaluates:
- Technical depth
- Problem solving
- Technical judgment

### Hiring Manager

Evaluates:
- Ownership
- Impact
- Decision making

## Environment Variables

Create a `.env.local` file in the project root:

GROQ_API_KEY=your_api_key_here

Never commit your actual API key to GitHub.

## Local Development

Clone the repository:

git clone https://github.com/navya-singh2207/ai-interview-mock-panel.git

Go into the project:

cd ai-interview-mock-panel

Install dependencies:

npm install

Create `.env.local` and add your API key.

Run the development server:

npm run dev

Open:

http://localhost:3000

## Deployment

The application is deployed using Vercel.

Live application:

YOUR_VERCEL_LINK

## Author

Navya Singh

B.Tech Computer Science
Bennett University

GitHub:
https://github.com/navya-singh2207

Repository:
https://github.com/navya-singh2207/ai-interview-mock-panel
