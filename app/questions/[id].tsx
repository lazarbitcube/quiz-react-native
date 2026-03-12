import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import createQuestionsQueryOptions from "@/queryOptions/createQuestionsQueryOptions";
import { Answer } from "@/types/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  router,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function QuizQuestions() {
  const { id, title, questionCount } = useLocalSearchParams();
  const navigation = useNavigation();
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

  const { data, isError, isPending } = useSuspenseQuery(
    createQuestionsQueryOptions(id.toString()),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      Alert.alert(
        "Quit Quiz?",
        "Are you sure you want to leave? Your progress will be lost.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "Leave",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });

    return unsubscribe;
  }, [navigation]);

  const getBackgroundColor = (item: Answer) => {
    if (!selectedAnswerId) return "#f0f0f0";

    if (item.isCorrect) return "#4caf50";

    if (item.id === selectedAnswerId && !item.isCorrect) return "#f44336";

    return "#f0f0f0";
  };

  const nextQuestion = () => {
    setSelectedAnswerId(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const finish = () => {
    router.push({
      pathname: `/questions/finish`,
      params: {
        numberOfCorrectAnswers: numberOfCorrectAnswers,
      },
    });
  };

  if (isError)
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.errorText}>Something went wrong.</Text>
      </ThemedView>
    );

  return (
    <>
      <Stack.Screen options={{ title: title as string }} />
      {!isPending ? (
        <ThemedView style={styles.container}>
          <ThemedText
            style={styles.text}
          >{`Question ${currentQuestionIndex + 1} / ${questionCount}`}</ThemedText>
          <ThemedText>{data[currentQuestionIndex].text}</ThemedText>
          <FlatList
            style={styles.list}
            data={data[currentQuestionIndex].answers}
            extraData={selectedAnswerId}
            numColumns={1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedAnswerId(item.id);
                  if (item.isCorrect)
                    setNumberOfCorrectAnswers((prev) => prev + 1);
                }}
                disabled={selectedAnswerId !== null}
                style={[
                  styles.answer,
                  { backgroundColor: getBackgroundColor(item) },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        selectedAnswerId &&
                        (item.isCorrect || item.id === selectedAnswerId)
                          ? "white"
                          : "black",
                    },
                  ]}
                >
                  {item.text}
                </Text>
              </Pressable>
            )}
            contentContainerStyle={styles.listContainer}
          />
          {selectedAnswerId && (
            <>
              {currentQuestionIndex + 1 === Number(questionCount) ? (
                <Pressable onPress={finish} style={styles.actionButton}>
                  <ThemedText style={styles.buttonText}>Finish</ThemedText>
                </Pressable>
              ) : (
                <Pressable onPress={nextQuestion} style={styles.actionButton}>
                  <ThemedText style={styles.buttonText}>Next</ThemedText>
                </Pressable>
              )}
              {selectedAnswerId && data[currentQuestionIndex].explanation && (
                <Pressable
                  style={styles.explanationButton}
                  onPress={() => setIsExplanationVisible(true)}
                >
                  <Text style={styles.explanationButtonText}>
                    Show Explanation
                  </Text>
                </Pressable>
              )}
            </>
          )}
        </ThemedView>
      ) : (
        <ActivityIndicator style={styles.container} size="large" />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isExplanationVisible}
        onRequestClose={() => setIsExplanationVisible(false)} // Handles hardware back button on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Explanation</Text>

            <Text style={styles.modalText}>
              {data[currentQuestionIndex].explanation}
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setIsExplanationVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  list: {
    width: "100%",
    flexGrow: 0,
  },
  errorText: {
    color: "red",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  answer: {
    width: "100%",
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    textAlign: "center",
    fontWeight: "700",
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#2196F3",
    borderColor: "#5e9cff",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
  },
  explanationButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#5e9cff",
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  explanationButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "auto",
  },
  closeButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
