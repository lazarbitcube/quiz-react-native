import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { QuizData } from "@/types/types";
import { Suspense } from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  quiz: QuizData;
  handleRedirect: (quiz: QuizData) => void;
};

export default function QuizCard({ quiz, handleRedirect }: Props) {
  return (
    <Suspense fallback={<ThemedText>Loading...</ThemedText>}>
      <Pressable onPress={() => handleRedirect(quiz)} key={quiz.id}>
        <ThemedView style={styles.quiz}>
          <ThemedText>{quiz.title}</ThemedText>
        </ThemedView>
      </Pressable>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  quiz: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
  },
});
