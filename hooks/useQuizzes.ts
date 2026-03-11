import { fetchQuizzes } from "@/api/quizApi";
import { QuizResponse } from "@/types/types";
import { useEffect, useState } from "react";

export function useQuizzes(numberOfQuizes: number) {
  const [quizzes, setQuizzes] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchQuizzes(numberOfQuizes);
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [numberOfQuizes]);

  return { quizzes, loading, error };
}
