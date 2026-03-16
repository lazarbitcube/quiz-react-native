import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { createQuizQueryOptions } from "@/queryOptions/createQuizQueryOptions";
import { QuizData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
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
        numberOfQuizes: numberOfQuizes,
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
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Select a quiz</Text>
      {isPending ? (
        <ActivityIndicator style={styles.container} size="large" />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={data.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuizCard
              key={item.id}
              quiz={item}
              handleRedirect={() => handleRedirect(item)}
            />
          )}
        />
      )}
      {showLoadMore && (
        <Pressable onPress={loadMore}>
          <ThemedView style={styles.loadMoreButton}>
            <ThemedText>Load more</ThemedText>
          </ThemedView>
        </Pressable>
      )}
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
