import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function Index() {
  const handlePress = () => {
    router.push("/quizzes/quiz-selector");
  };
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/quizimage.jpg")}
        style={styles.image}
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <ThemedText style={styles.buttonText}>Start</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: "50%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#2196F3",
    borderColor: "#5e9cff",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 250,
    height: 250,
  },
});
