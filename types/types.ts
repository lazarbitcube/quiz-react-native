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
