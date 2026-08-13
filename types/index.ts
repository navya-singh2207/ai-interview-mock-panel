export type Persona = "hr" | "technical" | "hiring_manager";

export type QuestionCategory = "behavioral" | "technical" | "leadership";

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
}

export interface PersonaResponse {
  persona: Persona;
  feedback: string;
  score: number;
}

export interface PanelSession {
  question: Question;
  candidateAnswer: string;
  responses: PersonaResponse[];
  finalVerdict: string;
}
