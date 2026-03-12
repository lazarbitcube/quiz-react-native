import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { createQuizQueryOptions } from "@/queryOptions/createQuizQueryOptions";
import { QuizData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import QuizCard from "./quiz-card";

export default function QuizPage() {
  const [numberOfQuizes, setNumberOfQuizes] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const { data, isError, isPending } = useQuery(
    createQuizQueryOptions(numberOfQuizes),
  );

  const handleRedirect = (quiz: QuizData) => {
    router.push({
      pathname: `/quizzes/quiz-details`,
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
    if (!data?.data) return;
    if (data?.data.length % numberOfQuizes !== 0) {
      setShowLoadMore(false);
      return;
    }
    setNumberOfQuizes((prev) => prev + 1);
  };

  if (isError)
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.errorText}>Something went wrong.</Text>
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
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={styles.quizContainer}
          showsVerticalScrollIndicator={false}
        >
          {isPending ? (
            <ActivityIndicator style={styles.container} size="large" />
          ) : (
            data.data.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                handleRedirect={() => handleRedirect(quiz)}
              />
            ))
          )}
        </ScrollView>
        {showLoadMore && (
          <Pressable onPress={loadMore}>
            <ThemedView style={styles.loadMoreButton}>
              <ThemedText>Load more</ThemedText>
            </ThemedView>
          </Pressable>
        )}
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
