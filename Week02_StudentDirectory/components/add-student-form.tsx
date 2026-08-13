import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Student } from "../data/students";
import FormField from "./form-field";

interface AddStudentFormProps {
  onSubmitSuccess: (student: Student) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  studentId: string;
  email: string;
  department: string;
  bio: string;
  skillsText: string;
}

interface FormErrors {
  name?: string;
  studentId?: string;
  email?: string;
  department?: string;
  bio?: string;
}

function validateForm(data: FormData): FormErrors {
  const newErrors: FormErrors = {};

  if (data.name.trim().length === 0) newErrors.name = "Name is required.";
  else if (data.name.trim().length < 3)
    newErrors.name = "Min 3 characters required.";

  const idPattern = /^\d{2}-\d{5}-\d$/;
  if (!idPattern.test(data.studentId.trim())) {
    newErrors.studentId = "Format must be NN-NNNNN-N (e.g. 22-12345-1).";
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(data.email.trim())) {
    newErrors.email = "Invalid explicit email structure.";
  }

  if (data.department.trim().length === 0)
    newErrors.department = "Department is required.";

  if (data.bio.trim().length === 0) newErrors.bio = "Bio is required.";
  else if (data.bio.trim().length > 200)
    newErrors.bio = "Bio cannot exceed 200 characters.";

  return newErrors;
}

export default function AddStudentForm({
  onSubmitSuccess,
  onCancel,
}: AddStudentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    email: "",
    department: "",
    bio: "",
    skillsText: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);

  const isFormValid =
    Object.keys(errors).length === 0 && formData.name.length > 0;

  useEffect(() => {
    if (!submitTrigger) return;
    const timeoutId = setTimeout(() => {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        studentId: formData.studentId.trim(),
        department: formData.department.trim(),
        bio: formData.bio.trim(),
        skills: formData.skillsText
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        avatarUrl: "https://i.pravatar.cc/150?u=" + Date.now(),
      };
      setIsSubmitting(false);
      setSubmitTrigger(false);
      onSubmitSuccess(newStudent);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [submitTrigger]);

  const handleSubmitPress = () => {
    setSubmitAttempted(true);
    if (isFormValid) {
      setIsSubmitting(true);
      setSubmitTrigger(true);
    }
  };

  const handleCancelPress = () => {
    const hasInput = Object.values(formData).some(
      (val) => val.trim().length > 0,
    );
    if (hasInput) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to drop your inputs?",
        [
          { text: "Keep Editing", style: "cancel" },
          { text: "Discard", style: "destructive", onPress: onCancel },
        ],
      );
    } else {
      onCancel();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Join the Directory</Text>

      <FormField
        label="Full Name"
        value={formData.name}
        onChangeText={(text) => updateField("name", text)}
        onBlur={() => markTouched("name")}
        error={touched.name || submitAttempted ? errors.name : undefined}
      />
      <FormField
        label="Student ID"
        value={formData.studentId}
        onChangeText={(text) => updateField("studentId", text)}
        onBlur={() => markTouched("studentId")}
        error={
          touched.studentId || submitAttempted ? errors.studentId : undefined
        }
      />
      <FormField
        label="Email"
        value={formData.email}
        onChangeText={(text) => updateField("email", text)}
        onBlur={() => markTouched("email")}
        error={touched.email || submitAttempted ? errors.email : undefined}
      />
      <FormField
        label="Department"
        value={formData.department}
        onChangeText={(text) => updateField("department", text)}
        onBlur={() => markTouched("department")}
        error={
          touched.department || submitAttempted ? errors.department : undefined
        }
      />

      <FormField
        label="Bio"
        value={formData.bio}
        onChangeText={(text) => updateField("bio", text)}
        onBlur={() => markTouched("bio")}
        error={touched.bio || submitAttempted ? errors.bio : undefined}
        multiline
      />

      <Text
        style={[
          styles.counter,
          formData.bio.length > 200 && styles.counterOver,
        ]}
      >
        {formData.bio.length} / 200 characters
      </Text>

      <FormField
        label="Skills (comma-separated)"
        value={formData.skillsText}
        onChangeText={(text) => updateField("skillsText", text)}
      />

      <View style={styles.row}>
        <Pressable
          style={[styles.button, styles.btnCancel]}
          onPress={handleCancelPress}
        >
          <Text style={styles.btnTextDark}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleSubmitPress}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 20 },
  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0D1F4E",
    marginBottom: 20,
  },
  counter: {
    fontSize: 12,
    textAlign: "right",
    color: "#64748B",
    marginTop: -10,
    marginBottom: 10,
  },
  counterOver: { color: "#EF4444", fontWeight: "bold" },
  row: { flexDirection: "row", gap: 12, marginTop: 10, paddingBottom: 40 },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D9488",
  },
  btnCancel: { backgroundColor: "#E2E8F0" },
  buttonDisabled: { backgroundColor: "#CBD5E1" },
  buttonText: { color: "#FFF", fontWeight: "700" },
  btnTextDark: { color: "#334155", fontWeight: "700" },
});
