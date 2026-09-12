import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from "../constants/students";

type Props = { student: Student; onPress: (student: Student) => void };

export default function StudentCard({ student, onPress }: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(student)}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`${student.name}, ${student.department}`}
      accessibilityHint="Opens the student profile"
    >
      <Image source={{ uri: student.avatarUrl }} style={styles.avatar} accessibilityLabel={`Profile photo of ${student.name}`} />
      <View style={styles.content}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.meta}>{student.studentId} · {student.department}</Text>
        <Text style={styles.email}>{student.email}</Text>
        <Text style={styles.skills}>{student.skills.join(" • ")}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#e2e8f0", flexDirection: "row", gap: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  content: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700", color: "#0f172a" },
  meta: { marginTop: 3, color: "#475569", fontWeight: "600", fontSize: 12 },
  email: { marginTop: 3, color: "#64748b", fontSize: 12 },
  skills: { marginTop: 7, color: "#334155", fontSize: 12 },
});
