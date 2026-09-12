import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Student } from "../constants/students";
import { api } from "../services/api";
import { useStudents } from "../context/students-context";

type Props = { visible: boolean; onClose: () => void };

export default function AddStudentForm({ visible, onClose }: Props) {
  const { dispatch } = useStudents();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setName(""); setStudentId(""); setEmail(""); setDepartment("CSE"); setBio(""); setSkills("");
  };

  const close = () => { reset(); onClose(); };

  const handleAdd = async () => {
    if (!name.trim() || !department.trim()) {
      Alert.alert("Missing information", "Name and department are required.");
      return;
    }
    if (studentId.trim() && !/^\d{2}-\d{5}-\d$/.test(studentId.trim())) {
      Alert.alert("Invalid Student ID", "Use the format 22-47087-1.");
      return;
    }

    const payload = {
      name: name.trim(),
      studentId: studentId.trim(),
      email: email.trim(),
      department: department.trim(),
      bio: bio.trim(),
      skills: skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      avatarUrl: `https://i.pravatar.cc/150?u=${encodeURIComponent(name.trim())}`,
    };

    setIsSubmitting(true);
    try {
      // Week 8: POST to the server first. The server assigns the id.
      const { data } = await api.post<Student>("/students", payload);
      dispatch({ type: "ADD_STUDENT", payload: data });
      close();
    } catch (error) {
      console.error("Add student error:", error);
      Alert.alert("Error", "Could not save student. Is the REST server running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Student</Text>
          <Text style={styles.subtitle}>The server will assign the student's record ID.</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} accessibilityLabel="Student name" accessibilityHint="Enter the student's full name" />
          <TextInput value={studentId} onChangeText={setStudentId} placeholder="Student ID (22-47087-1)" style={styles.input} autoCapitalize="none" accessibilityLabel="Student ID" accessibilityHint="Enter the student ID in the required format" />
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} keyboardType="email-address" autoCapitalize="none" accessibilityLabel="Student email" accessibilityHint="Enter the student's email address" />
          <TextInput value={department} onChangeText={setDepartment} placeholder="Department" style={styles.input} accessibilityLabel="Department" accessibilityHint="Enter the student's department" />
          <TextInput value={bio} onChangeText={setBio} placeholder="Bio" style={[styles.input, styles.bio]} multiline accessibilityLabel="Student bio" accessibilityHint="Enter a short biography" />
          <TextInput value={skills} onChangeText={setSkills} placeholder="Skills (React Native, Firebase)" style={styles.input} accessibilityLabel="Student skills" accessibilityHint="Enter skills separated by commas" />
          <View style={styles.actions}>
            {/* Week 9 accessibility audit: modal actions have explicit role, label, and hint. */}
            <Pressable style={styles.secondary} onPress={close} disabled={isSubmitting} accessibilityRole="button" accessibilityLabel="Cancel adding student" accessibilityHint="Closes the form without saving">
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.primary} onPress={handleAdd} disabled={isSubmitting} accessibilityRole="button" accessibilityLabel={isSubmitting ? "Saving student" : "Add student"} accessibilityHint="Sends the new student to the server">
              <Text style={styles.primaryText}>{isSubmitting ? "Saving..." : "Add Student"}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(15,23,42,0.5)", justifyContent: "center", padding: 18 },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 20, maxHeight: "92%" },
  title: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  subtitle: { marginTop: 5, marginBottom: 16, color: "#64748b" },
  input: { borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10, color: "#0f172a" },
  bio: { minHeight: 78, textAlignVertical: "top" },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 4 },
  secondary: { borderWidth: 1, borderColor: "#cbd5e1", paddingHorizontal: 14, paddingVertical: 11, borderRadius: 10 },
  secondaryText: { color: "#334155", fontWeight: "700" },
  primary: { backgroundColor: "#0f172a", paddingHorizontal: 14, paddingVertical: 11, borderRadius: 10 },
  primaryText: { color: "#fff", fontWeight: "700" },
});
