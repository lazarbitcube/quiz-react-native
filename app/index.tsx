import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Button, StyleSheet } from "react-native";

export default function Index() {
  const handlePress = () => {
    router.push("/quiz");
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Click start</ThemedText>
      <Button onPress={handlePress} title="Start" color="#841584" />
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
});
