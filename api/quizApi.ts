export async function fetchQuizzes() {
  const response = await fetch("https://quizapi.io/api/v1/quizzes?limit=5", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_QUIZ_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch quizzes: ${text}`);
  }

  return response.json();
}
