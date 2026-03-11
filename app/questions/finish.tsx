import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function FinishScreen() {
  const { numberOfCorrectAnswers } = useLocalSearchParams();

  const handleRedirect = () => {
    router.push("/quizzes/quiz");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <ThemedText
          style={styles.text}
        >{`${numberOfCorrectAnswers} correct answers!`}</ThemedText>
        <Pressable onPress={handleRedirect} style={styles.button}>
          <ThemedText style={[styles.text, { color: "#ffffff" }]}>
            Back
          </ThemedText>
        </Pressable>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: "50%",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#5e9cff",
    borderColor: "#5e9cff",
  },
});
