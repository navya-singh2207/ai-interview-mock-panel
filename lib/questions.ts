export type QuestionCategory = "behavioral" | "technical" | "leadership";

export interface InterviewQuestion {
  id: string;
  text: string;
  category: QuestionCategory;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "tech-decision-ownership",
    text: "Tell me about a time you owned a difficult technical decision end-to-end.",
    category: "technical",
  },
  {
    id: "scalable-rest-api",
    text: "Walk me through how you'd design a scalable REST API.",
    category: "technical",
  },
  {
    id: "debug-production",
    text: "Describe how you would diagnose and fix a production outage under time pressure.",
    category: "technical",
  },
  {
    id: "teammate-conflict",
    text: "Describe a conflict with a teammate and how you resolved it.",
    category: "behavioral",
  },
  {
    id: "failed-project",
    text: "Tell me about a time a project failed or missed expectations. What did you learn?",
    category: "behavioral",
  },
  {
    id: "hard-feedback",
    text: "Give an example of when you received hard feedback and how you responded.",
    category: "behavioral",
  },
  {
    id: "lead-without-authority",
    text: "Tell me about a time you led a project without formal authority.",
    category: "leadership",
  },
  {
    id: "raise-the-bar",
    text: "Describe a time you raised the bar for quality or process on your team.",
    category: "leadership",
  },
  {
    id: "prioritize-tradeoffs",
    text: "How do you prioritize when everything feels urgent? Walk me through a real example.",
    category: "leadership",
  },
  {
    id: "tell-me-about-yourself",
    text: "Tell me about yourself.",
    category: "behavioral",
  },
  {
    id: "why-work-here",
    text: "Why do you want to work here?",
    category: "behavioral",
  },
  {
    id: "greatest-strength",
    text: "What is your greatest strength?",
    category: "behavioral",
  },
  {
    id: "greatest-weakness",
    text: "What is your greatest weakness?",
    category: "behavioral",
  },
  {
    id: "five-year-vision",
    text: "Where do you see yourself in 5 years?",
    category: "behavioral",
  },
  {
    id: "why-hire-you",
    text: "Why should we hire you?",
    category: "leadership",
  },
  {
    id: "failure-and-learning",
    text: "Describe a time you failed and what you learned from it.",
    category: "behavioral",
  },
  {
    id: "handle-pressure",
    text: "How do you handle working under pressure or tight deadlines?",
    category: "behavioral",
  },
  {
    id: "team-disagreement",
    text: "Tell me about a time you worked in a team and faced a disagreement.",
    category: "behavioral",
  },
  {
    id: "what-motivates-you",
    text: "What motivates you?",
    category: "behavioral",
  },
  {
    id: "explain-complex-concept",
    text: "Explain a complex technical concept to a non-technical person.",
    category: "technical",
  },
  {
    id: "prioritize-urgent-tasks",
    text: "How do you prioritize tasks when everything feels urgent?",
    category: "leadership",
  },
];

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  "behavioral",
  "technical",
  "leadership",
];

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  behavioral: "Behavioral",
  technical: "Technical",
  leadership: "Leadership",
};

export function getQuestionsByCategory(
  category: QuestionCategory
): InterviewQuestion[] {
  return INTERVIEW_QUESTIONS.filter((q) => q.category === category);
}

export function getQuestionById(id: string): InterviewQuestion | undefined {
  return INTERVIEW_QUESTIONS.find((q) => q.id === id);
}
