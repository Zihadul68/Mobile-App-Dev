import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
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

function SkeletonItem() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.skeletonCard, { opacity }]} accessible={false}>
      <View style={styles.skeletonName} />
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, styles.skeletonShort]} />
      <View style={styles.skeletonButton} />
    </Animated.View>
  );
}

function SkeletonList() {
  return (
    <FlatList
      data={Array.from({ length: 6 }, (_, index) => String(index))}
      keyExtractor={(item) => item}
      renderItem={() => <SkeletonItem />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      accessibilityLabel="Loading student list"
    />
  );
}

export default function StudentDirectoryScreen() {
  const { students, addStudent, removeStudent, resetStudents, isLoading } = useStudents();
  const [search, setSearch] = useState("");
  const [isAddVisible, setIsAddVisible] = useState(false);
  const searchRef = useRef<SearchBarHandle>(null);

  useEffect(() => {
    const timer = setTimeout(() => searchRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

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
    (id: string) => removeStudent(id),
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
        <View style={styles.container}>
          <Text style={styles.title}>Student Directory</Text>
          <Text style={styles.loadingText}>Loading students...</Text>
          <SkeletonList />
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
            <Pressable
              style={styles.addButton}
              onPress={() => setIsAddVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Add new student"
              accessibilityHint="Opens the Add Student form"
            >
              <Text style={styles.addText}>+ Add</Text>
            </Pressable>
            <Pressable
              style={styles.statisticsButton}
              onPress={() => router.push("/statistics")}
              accessibilityRole="button"
              accessibilityLabel="Open statistics"
              accessibilityHint="Opens the student statistics screen"
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
          accessibilityLabel="Search students"
          accessibilityHint="Search by name, student ID, email, or skill"
        />

        <View style={styles.actionRow}>
          <Text style={styles.resultText}>
            {filteredStudents.length} result
            {filteredStudents.length === 1 ? "" : "s"}
          </Text>

          <Pressable
            onPress={handleReset}
            accessibilityRole="button"
            accessibilityLabel="Reset student list"
            accessibilityHint="Restores the original seed students"
          >
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
              <Text style={styles.emptyTitle}>
                {search.trim() ? "No results" : "No students yet"}
              </Text>
              <Text style={styles.emptyText}>
                {search.trim()
                  ? `No students match "${search.trim()}".`
                  : "Tap + Add to add the first student."}
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
  loadingText: { marginBottom: 8, color: "#64748b" },
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
  emptyText: { marginTop: 6, color: "#64748b", textAlign: "center" },
  skeletonCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  skeletonName: {
    width: "52%",
    height: 18,
    borderRadius: 5,
    backgroundColor: "#cbd5e1",
  },
  skeletonLine: {
    width: "78%",
    height: 12,
    borderRadius: 4,
    backgroundColor: "#e2e8f0",
    marginTop: 10,
  },
  skeletonShort: { width: "58%" },
  skeletonButton: {
    width: 76,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
    marginTop: 14,
  },
});
