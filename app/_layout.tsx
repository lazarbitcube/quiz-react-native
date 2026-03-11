import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Lazar's Quiz", headerBackVisible: false }}
        />
        <Stack.Screen
          name="quizzes/quiz"
          options={{ headerTitle: "Quiz selector" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
