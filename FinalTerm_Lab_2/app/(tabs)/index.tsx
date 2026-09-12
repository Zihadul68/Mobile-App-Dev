import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SearchBar, { SearchBarHandle } from "../../components/search-bar";
import AddStudentForm from "../../components/add-student-form";
import StudentCard from "../../components/student-card";
import StudentDetail from "../../components/student-detail";
import ErrorScreen from "../../components/error-screen";
import { Student } from "../../constants/students";
import { useStudents } from "../../context/students-context";

const SEARCH_DEBOUNCE_DELAY = 300;

function SkeletonItem() {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(opacity, { toValue: 0.3, duration: 500, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [opacity]);
  return <Animated.View style={[styles.skeletonCard, { opacity }]} accessible={false}>
    <View style={styles.skeletonAvatar} /><View style={styles.skeletonBody}>
      <View style={styles.skeletonName} /><View style={styles.skeletonLine} /><View style={[styles.skeletonLine, styles.short]} />
    </View>
  </Animated.View>;
}

function SkeletonList() {
  return <FlatList data={Array.from({ length: 6 }, (_, i) => String(i))} keyExtractor={(item) => item} renderItem={() => <SkeletonItem />} />;
}

export default function HomeScreen() {
  const { students, isLoading, error, reloadStudents } = useStudents();
  const [query, setQuery] = useState("");
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const searchRef = useRef<SearchBarHandle>(null);

  useEffect(() => {
    const timer = setTimeout(() => searchRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const haystack = [student.name, student.department, student.studentId, student.email, ...student.skills].join(" ").toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });
  }, [students, query]);

  const handleSelect = useCallback((student: Student) => setSelectedStudent(student), []);

  if (isLoading) {
    return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Student Directory</Text><Text style={styles.loading}>Loading students...</Text><SkeletonList /></View></SafeAreaView>;
  }

  if (error) return <SafeAreaView style={styles.safe}><ErrorScreen message={error} onRetry={reloadStudents} /></SafeAreaView>;

  return <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <View style={styles.header}><View><Text style={styles.title}>Student Directory</Text><Text style={styles.subtitle}>REST API powered StudentDirectory</Text></View>
        <Pressable style={styles.addButton} onPress={() => setIsAddVisible(true)} accessibilityRole="button" accessibilityLabel="Add new student" accessibilityHint="Opens the Add Student form"><Text style={styles.addText}>+ Add</Text></Pressable>
      </View>
      <SearchBar ref={searchRef} value={query} onChangeText={setQuery} debounceDelay={SEARCH_DEBOUNCE_DELAY} accessibilityLabel="Search students" accessibilityHint="Search students using the server-backed query" />
      <Text style={styles.results}>{filteredStudents.length} result{filteredStudents.length === 1 ? "" : "s"}</Text>
      <FlatList data={filteredStudents} keyExtractor={(item) => item.id} renderItem={({ item }) => <StudentCard student={item} onPress={handleSelect} />} contentContainerStyle={styles.list}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>{query.trim() ? "No results" : "No students yet"}</Text><Text style={styles.emptyText}>{query.trim() ? `No students match "${query.trim()}".` : "Tap + Add to add the first student."}</Text></View>} />
    </View>
    <AddStudentForm visible={isAddVisible} onClose={() => setIsAddVisible(false)} />
    <StudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 27, fontWeight: "800", color: "#0f172a" },
  subtitle: { marginTop: 4, color: "#64748b" },
  addButton: { backgroundColor: "#0D9488", borderRadius: 9, paddingHorizontal: 13, paddingVertical: 9 },
  addText: { color: "#fff", fontWeight: "700" },
  results: { color: "#64748b", fontWeight: "600", marginBottom: 10 },
  loading: { marginTop: 7, marginBottom: 10, color: "#64748b" },
  list: { paddingBottom: 24 },
  empty: { alignItems: "center", padding: 40 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  emptyText: { marginTop: 7, color: "#64748b", textAlign: "center" },
  skeletonCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: "row", gap: 12, borderWidth: 1, borderColor: "#e2e8f0" },
  skeletonAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#cbd5e1" },
  skeletonBody: { flex: 1, paddingTop: 2 },
  skeletonName: { width: "55%", height: 17, borderRadius: 4, backgroundColor: "#cbd5e1" },
  skeletonLine: { width: "80%", height: 11, borderRadius: 4, backgroundColor: "#e2e8f0", marginTop: 10 },
  short: { width: "55%" },
});
