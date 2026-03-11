export interface QuizData {
  id: string;
  category: string;
  description: string;
  difficulty: string;
  plays: number;
  questionCount: 10;
  tags: string[];
  title: string;
}

export interface QuizMeta {
  limit: number;
  offset: number;
  total: number;
}

export interface QuizResponse {
  data: QuizData[];
  meta: QuizMeta;
  success: boolean;
}

export interface Answer {
  id: string;
  isCorrect: boolean;
  text: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  text: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | string;
  explanation?: string;
  answers: Answer[];

  // Catches any malformed keys from your previous JSON snippet
  // without throwing TS errors
  [key: string]: any;
}
