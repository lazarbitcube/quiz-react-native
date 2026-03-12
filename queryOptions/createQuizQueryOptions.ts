import { fetchQuizzes } from "@/api/quizApi";
import { queryOptions } from "@tanstack/react-query";

export function createQuizQueryOptions(numberOfQuizes: number) {
  return queryOptions({
    queryKey: ["quizes", numberOfQuizes],
    queryFn: () => fetchQuizzes(numberOfQuizes),
  });
}
