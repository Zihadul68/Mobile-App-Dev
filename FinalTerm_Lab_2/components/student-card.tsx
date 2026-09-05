import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from "../constants/students";

type Props = {
  student: Student;
  onRemove: (id: string) => void;
};

export default function StudentCard({ student, onRemove }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.content} accessible accessibilityLabel={`${student.name}, ${student.email}`}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.email}>{student.email}</Text>
        <Text style={styles.skills}>{student.skills.join(" • ")}</Text>
      </View>

      <Pressable
        style={styles.removeButton}
        onPress={() => onRemove(student.id)}
        accessibilityRole="button"
        accessibilityLabel={`Remove ${student.name}`}
        accessibilityHint="Removes this student from the directory"
      >
        <Text style={styles.removeText}>Remove</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  content: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700", color: "#0f172a" },
  email: { marginTop: 4, color: "#64748b" },
  skills: { marginTop: 8, color: "#334155" },
  removeButton: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
  },
  removeText: { color: "#b91c1c", fontWeight: "600" },
});
