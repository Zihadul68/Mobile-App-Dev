import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Student } from "../constants/students";
import { api } from "../services/api";
import { useStudents } from "../context/students-context";

type Props = {
  student: Student | null;
  onClose: () => void;
};

export default function StudentDetail({ student, onClose }: Props) {
  const { dispatch } = useStudents();
  const [freshStudent, setFreshStudent] = useState<Student | null>(student);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bioDraft, setBioDraft] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFreshStudent(student);
    setIsEditing(false);
    setBioDraft(student?.bio ?? "");

    if (!student) return;

    let cancelled = false;
    setIsLoading(true);

    api
      .get<Student>(`/students/${student.id}`)
      .then(({ data }) => {
        if (!cancelled) {
          setFreshStudent(data);
          setBioDraft(data.bio);
          dispatch({ type: "UPDATE_STUDENT", payload: data });
        }
      })
      .catch((error) => {
        console.error("Student detail load error:", error);
        if (!cancelled) Alert.alert("Error", "Could not load the latest student data from the server.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [student, dispatch]);

  const handleSaveBio = async () => {
    if (!freshStudent) return;
    setIsSaving(true);
    try {
      const { data } = await api.patch<Student>(`/students/${freshStudent.id}`, {
        bio: bioDraft.trim(),
      });
      setFreshStudent(data);
      setBioDraft(data.bio);
      dispatch({ type: "UPDATE_STUDENT", payload: data });
      setIsEditing(false);
    } catch (error) {
      console.error("Student bio update error:", error);
      Alert.alert("Error", "Could not update the bio. Is the server running?");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = () => {
    if (!freshStudent) return;

    Alert.alert(
      "Remove Student",
      `Remove ${freshStudent.name} from the directory?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/students/${freshStudent.id}`);
              dispatch({ type: "REMOVE_STUDENT", payload: freshStudent.id });
              onClose();
            } catch (error) {
              console.error("Student delete error:", error);
              Alert.alert("Error", "Could not remove the student. Is the server running?");
            }
          },
        },
      ]
    );
  };

  return (
    <Modal visible={!!student} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : freshStudent ? (
            <>
              <Image source={{ uri: freshStudent.avatarUrl }} style={styles.avatar} accessibilityLabel={`Profile photo of ${freshStudent.name}`} />
              <Text style={styles.name}>{freshStudent.name}</Text>
              <Text style={styles.meta}>{freshStudent.studentId} · {freshStudent.department}</Text>
              <Text style={styles.email}>{freshStudent.email}</Text>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.body}>{freshStudent.skills.join(" • ") || "No skills listed"}</Text>
              <Text style={styles.sectionTitle}>Bio</Text>
              {isEditing ? (
                <TextInput
                  value={bioDraft}
                  onChangeText={setBioDraft}
                  multiline
                  style={styles.bioInput}
                  accessibilityLabel="Student bio"
                  accessibilityHint="Edit the student's biography"
                />
              ) : (
                <Text style={styles.body}>{freshStudent.bio || "No biography provided."}</Text>
              )}

              <View style={styles.actions}>
                {/* Week 9 accessibility audit: every modal action is explicitly labeled for screen readers. */}
                {isEditing ? (
                  <Pressable
                    style={styles.primaryButton}
                    onPress={handleSaveBio}
                    disabled={isSaving}
                    accessibilityRole="button"
                    accessibilityLabel={isSaving ? "Saving bio" : "Save bio"}
                    accessibilityHint="Sends the updated bio to the server"
                  >
                    <Text style={styles.primaryText}>{isSaving ? "Saving..." : "Save Bio"}</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.primaryButton}
                    onPress={() => setIsEditing(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Edit bio"
                    accessibilityHint="Opens the bio editor"
                  >
                    <Text style={styles.primaryText}>Edit Bio</Text>
                  </Pressable>
                )}
                <Pressable
                  style={styles.removeButton}
                  onPress={handleRemove}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${freshStudent.name} from the directory`}
                  accessibilityHint="Shows a confirmation before deleting this student"
                >
                  <Text style={styles.removeText}>Remove</Text>
                </Pressable>
                <Pressable
                  style={styles.secondaryButton}
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel="Close student details"
                  accessibilityHint="Closes the student profile"
                >
                  <Text style={styles.secondaryText}>Close</Text>
                </Pressable>
              </View>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(15,23,42,0.5)", justifyContent: "flex-end" },
  card: { backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 22, minHeight: 440 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginBottom: 14 },
  name: { fontSize: 24, fontWeight: "800", color: "#0f172a" },
  meta: { marginTop: 5, color: "#475569", fontWeight: "600" },
  email: { marginTop: 4, color: "#64748b" },
  sectionTitle: { marginTop: 18, marginBottom: 5, fontSize: 13, fontWeight: "700", color: "#0f172a" },
  body: { color: "#334155", lineHeight: 20 },
  bioInput: { minHeight: 100, borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 10, padding: 12, textAlignVertical: "top", color: "#0f172a" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 24 },
  primaryButton: { backgroundColor: "#0f172a", paddingHorizontal: 15, paddingVertical: 11, borderRadius: 10 },
  primaryText: { color: "#fff", fontWeight: "700" },
  removeButton: { backgroundColor: "#fee2e2", paddingHorizontal: 15, paddingVertical: 11, borderRadius: 10 },
  removeText: { color: "#b91c1c", fontWeight: "700" },
  secondaryButton: { borderWidth: 1, borderColor: "#cbd5e1", paddingHorizontal: 15, paddingVertical: 11, borderRadius: 10 },
  secondaryText: { color: "#334155", fontWeight: "700" },
});
