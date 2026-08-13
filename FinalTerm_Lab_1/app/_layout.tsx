import { Stack } from "expo-router";
import { StudentsProvider } from "../context/students-context";

export default function RootLayout() {
  return (
    <StudentsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Student Directory" }} />
        <Stack.Screen name="statistics" options={{ title: "Statistics" }} />
      </Stack>
    </StudentsProvider>
  );
}