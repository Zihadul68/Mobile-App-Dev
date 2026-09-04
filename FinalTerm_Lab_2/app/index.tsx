import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import SearchBar, { SearchBarHandle } from "../components/search-bar";
import AddStudentForm from "../components/add-student-form";
import StatBar from "../components/stat-bar";
import StudentCard from "../components/student-card";
import { useStudents } from "../context/students-context";
import { Student } from "../constants/students";

const SEARCH_DEBOUNCE_DELAY = 300;

export default function StudentDirectoryScreen() {
  const { students, addStudent, removeStudent, resetStudents, isLoading } = useStudents();
  const [search, setSearch] = useState("");
  const [isAddVisible, setIsAddVisible] = useState(false);
  const searchRef = useRef<SearchBarHandle>(null);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students;

    return students.filter((student) => {
      const haystack = [student.name, student.studentId, student.email, ...student.skills]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [students, search]);

  const handleRemove = useCallback(
    (id: string) => {
      removeStudent(id);
    },
    [removeStudent]
  );

  const handleReset = useCallback(() => {
    Alert.alert("Reset students", "Restore the original student list?", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: resetStudents },
    ]);
  }, [resetStudents]);

  const renderStudent = useCallback(
    ({ item }: { item: Student }) => (
      <StudentCard student={item} onRemove={handleRemove} />
    ),
    [handleRemove]
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading students...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Student Directory</Text>
            <Text style={styles.subtitle}>Search and manage students</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.addButton} onPress={() => setIsAddVisible(true)}>
              <Text style={styles.addText}>+ Add</Text>
            </Pressable>
            <Pressable
              style={styles.statisticsButton}
              onPress={() => router.push("/statistics")}
            >
              <Text style={styles.statisticsText}>Stats</Text>
            </Pressable>
          </View>
        </View>

        <StatBar students={students} />

        <SearchBar
          ref={searchRef}
          value={search}
          onChangeText={setSearch}
          debounceDelay={SEARCH_DEBOUNCE_DELAY}
        />

        <View style={styles.actionRow}>
          <Text style={styles.resultText}>
            {filteredStudents.length} result
            {filteredStudents.length === 1 ? "" : "s"}
          </Text>

          <Pressable onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
        </View>

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={renderStudent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No students found</Text>
              <Text style={styles.emptyText}>
                Try a different name, ID, email, or skill.
              </Text>
            </View>
          }
        />
      </View>

      <AddStudentForm
        visible={isAddVisible}
        onClose={() => setIsAddVisible(false)}
        onAdd={addStudent}
        existingIds={students.map((student) => student.id)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#64748b" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerActions: { flexDirection: "row", gap: 8 },
  title: { fontSize: 26, fontWeight: "800", color: "#0f172a" },
  subtitle: { marginTop: 3, color: "#64748b" },
  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
  },
  addText: { color: "#fff", fontWeight: "700" },
  statisticsButton: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9,
  },
  statisticsText: { color: "#fff", fontWeight: "700" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  resultText: { color: "#64748b", fontWeight: "600" },
  resetText: { color: "#2563eb", fontWeight: "700" },
  list: { paddingBottom: 24 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  emptyText: { marginTop: 6, color: "#64748b" },
});
