import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useQuizzes } from "@/hooks/useQuizzes";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

export default function QuizPage() {
  const { quizzes, loading, error } = useQuizzes();
  console.log(quizzes);
  if (loading)
    return <ActivityIndicator style={styles.container} size="large" />;

  if (error)
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.errorText}>Something went wrong. {error}</Text>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Select a quizz</Text>
      <ThemedView style={styles.quizContainer}>
        {quizzes?.data.map((quiz) => (
          <ThemedView style={styles.quiz} key={quiz.id}>
            <ThemedText>{quiz.title}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },
  quizContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  quiz: {
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5, // required for Android
    borderWidth: 1,
  },
  errorText: {
    color: "red",
  },
  header: {
    fontSize: 24,
  },
});
