export async function fetchQuizzes(numberOfQuizes: number) {
  const response = await fetch(
    `https://quizapi.io/api/v1/quizzes?limit=${numberOfQuizes}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_QUIZ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch quizzes: ${text}`);
  }

  return response.json();
}

export async function fetchQuestions(id: string) {
  const response = await fetch(
    `https://quizapi.io/api/v1/questions?quiz_id=${id}&include_answers=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_QUIZ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch quizzes: ${text}`);
  }

  return response.json();
}
