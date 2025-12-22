
// Minimal types for the simplified app
export type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED';

// Fix: Subject enum for JEE subjects, matching constants.tsx keys for styling
export enum Subject {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  MATHEMATICS = 'Mathematics',
}

// Fix: QuestionStatus enum for marking results of individual question attempts
export enum QuestionStatus {
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
  SKIPPED = 'SKIPPED',
}

// Fix: QuestionRecord interface for tracking individual question timing and outcomes
export interface QuestionRecord {
  questionNumber: number;
  timeInSeconds: number;
  status: QuestionStatus;
}

// Fix: Session interface for storing the full data of a study session
export interface Session {
  subject: Subject;
  chapter: string;
  records: QuestionRecord[];
}
