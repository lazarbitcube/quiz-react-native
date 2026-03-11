import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useQuizzes } from "@/hooks/useQuizzes";
import { QuizData } from "@/types/types";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function QuizPage() {
  const [numberOfQuizes, setNumberOfQuizes] = useState(5);
  const { quizzes, loading, error } = useQuizzes(numberOfQuizes);

  const handleRedirect = (quiz: QuizData) => {
    router.push({
      pathname: `/quizzes/[id]`,
      params: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty,
        questionCount: quiz.questionCount,
      },
    });
  };

  const loadMore = () => {
    setNumberOfQuizes((prev) => prev + 5);
  };

  if (loading)
    return <ActivityIndicator style={styles.container} size="large" />;

  if (error)
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.errorText}>Something went wrong. {error}</Text>
      </ThemedView>
    );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Quiz selector",
          headerLeft: () => (
            <Pressable
              onPress={() => router.replace("/")}
              style={{ padding: 8, marginRight: 20 }}
            >
              <IconSymbol name="arrow.backward" color="black" />
            </Pressable>
          ),
        }}
      />
      <ThemedView style={styles.container}>
        <Text style={styles.header}>Select a quiz</Text>
        <ScrollView style={styles.quizContainer}>
          {quizzes?.data.map((quiz) => (
            <Pressable onPress={() => handleRedirect(quiz)} key={quiz.id}>
              <ThemedView style={styles.quiz}>
                <ThemedText>{quiz.title}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable onPress={loadMore}>
          <ThemedView style={styles.loadMoreButton}>
            <ThemedText>Load more</ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
    </>
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
    padding: 20,
  },
  quiz: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
  },
  errorText: {
    color: "red",
  },
  header: {
    fontSize: 24,
  },
  loadMoreButton: {
    borderTopWidth: 1,
    padding: 10,
  },
});
