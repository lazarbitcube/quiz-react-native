import { fetchQuizzes } from "@/api/quizApi";
import { QuizResponse } from "@/types/types";
import { useEffect, useState } from "react";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      load();
    }, 2000);
  }, []);

  return { quizzes, loading, error };
}
