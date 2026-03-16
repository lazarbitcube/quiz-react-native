import { fetchQuizzes } from "@/api/quizApi";
import { QuizResponse } from "@/types/types";
import { queryOptions } from "@tanstack/react-query";

export function createQuizDetailsOptions(id: string, numberOfQuizes: number) {
  return queryOptions({
    queryKey: ["quizes", numberOfQuizes],
    queryFn: () => fetchQuizzes(numberOfQuizes),
    select: (response: QuizResponse) => {
      return response.data.find((q) => q.id.toString() === id.toString());
    },
  });
}
