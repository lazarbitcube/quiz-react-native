import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet } from "react-native";

export default function QuizDetails() {
  const { id, title, description, difficulty, questionCount } =
    useLocalSearchParams();

  const handleRedirect = (id: string) => {
    router.push({
      pathname: `/questions/[id]`,
      params: {
        id: id,
        title: title,
        questionCount: questionCount,
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: title as string }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.subContainer}>
          <ThemedView style={styles.fieldContainer}>
            <ThemedText style={styles.subHeader}>Description</ThemedText>
            <ThemedText>{description}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedText style={styles.subHeader}>Difficulty</ThemedText>
            <ThemedText>{difficulty}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedText style={styles.subHeader}>
              Number of questions
            </ThemedText>
            <ThemedText>{questionCount}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/quizimage.jpg")}
              style={styles.image}
            />
          </ThemedView>
        </ThemedView>
        <Button
          onPress={() => {
            handleRedirect(id.toString());
          }}
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
