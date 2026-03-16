import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { createQuizDetailsOptions } from "@/queryOptions/createQuizDetailsOptions";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Button, StyleSheet, Text } from "react-native";

export default function QuizDetails() {
  const { id, numberOfQuizes } = useLocalSearchParams();

  const {
    data: quiz,
    isPending,
    isError,
  } = useQuery(createQuizDetailsOptions(id.toString(), Number(numberOfQuizes)));

  const handleRedirect = (quizId: string) => {
    if (!quiz) return;
    router.push({
      pathname: `/questions/[id]`,
      params: {
        id: quizId,
        title: quiz.title,
        questionCount: quiz.questionCount,
      },
    });
  };

  if (isPending) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  if (isError || !quiz) {
    return (
      <ThemedView style={styles.container}>
        <Text>Quiz not found!</Text>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: quiz.title }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.subContainer}>
          <ThemedView style={styles.fieldContainer}>
            <ThemedText style={styles.subHeader}>Description</ThemedText>
            <ThemedText>{quiz.description}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedText style={styles.subHeader}>Difficulty</ThemedText>
            <ThemedText>{quiz.difficulty}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedText style={styles.subHeader}>
              Number of questions
            </ThemedText>
            <ThemedText>{quiz.questionCount}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/quizimage.jpg")}
              style={styles.image}
            />
          </ThemedView>
        </ThemedView>
        <Button
          onPress={() => handleRedirect(id.toString())}
          title="Start Quiz"
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  subContainer: {
    gap: 30,
  },
  fieldContainer: {
    alignItems: "flex-start",
    gap: 5,
  },
  subHeader: {
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
});
