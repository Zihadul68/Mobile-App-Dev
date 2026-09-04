import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Student } from "../constants/students";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (student: Student) => void;
  existingIds: string[];
};

export default function AddStudentForm({ visible, onClose, onAdd, existingIds }: Props) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setStudentId("");
    setEmail("");
    setSkills("");
    setError("");
  };

  const closeForm = () => {
    resetForm();
    onClose();
  };

  const handleAdd = () => {
    const trimmedName = name.trim();
    const trimmedStudentId = studentId.trim();
    const trimmedEmail = email.trim();
    const parsedSkills = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (!trimmedName || !trimmedStudentId || !trimmedEmail || parsedSkills.length === 0) {
      setError("Please complete all fields and add at least one skill.");
      return;
    }

    if (!/^\d{2}-\d{5}-\d$/.test(trimmedStudentId)) {
      setError("Student ID must follow the format 22-47087-1.");
      return;
    }

    const id = String(Date.now());
    if (existingIds.includes(id)) {
      setError("Please try again.");
      return;
    }

    onAdd({
      id,
      name: trimmedName,
      studentId: trimmedStudentId,
      email: trimmedEmail,
      skills: parsedSkills,
    });
    closeForm();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={closeForm}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Add Student</Text>
          <Text style={styles.subtitle}>Use the local student ID format, e.g. 22-47087-1.</Text>

          <TextInput
            placeholder="Name (e.g. Fahim Ahmed)"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Student ID (22-47087-1)"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Skills (React Native, Firebase)"
            value={skills}
            onChangeText={setSkills}
            style={[styles.input, styles.skillsInput]}
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.actions}>
            <Pressable style={styles.secondaryButton} onPress={closeForm}>
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleAdd}>
              <Text style={styles.primaryText}>Add Student</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  subtitle: { marginTop: 5, marginBottom: 16, color: "#64748b" },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 10,
    color: "#0f172a",
  },
  skillsInput: { minHeight: 46 },
  error: { color: "#dc2626", marginBottom: 10 },
  actions: { flexDirection: "row", gap: 10, justifyContent: "flex-end", marginTop: 4 },
  secondaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  secondaryText: { fontWeight: "700", color: "#334155" },
  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: "#0f172a",
  },
  primaryText: { fontWeight: "700", color: "#fff" },
});
