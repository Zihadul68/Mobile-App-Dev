import { Stack } from "expo-router";
import { StudentsProvider } from "../context/students-context";
export default function RootLayout(){return <StudentsProvider><Stack><Stack.Screen name="(tabs)" options={{headerShown:false}}/></Stack></StudentsProvider>}
