import { fetchQuestions } from "@/api/quizApi";
import { shuffleArray } from "@/helper-functions/shuffleArray";
import { queryOptions } from "@tanstack/react-query";

export default function createQuestionsQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["questions", id],
    queryFn: () => fetchQuestions(id),

    select: (response) => {
      const shuffledQuestions = shuffleArray(response.data);

      return shuffledQuestions.map((question: any) => ({
        ...question,
        answers: shuffleArray(question.answers),
      }));
    },
  });
}
