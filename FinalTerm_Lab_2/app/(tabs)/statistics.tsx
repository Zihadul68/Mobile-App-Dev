import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ErrorScreen from "../../components/error-screen";
import StatBar from "../../components/stat-bar";
import { useStudents } from "../../context/students-context";

export default function StatisticsScreen() {
  const { students, isLoading, error, reloadStudents } = useStudents();
  const previousCount = useRef(students.length);
  const [countChange, setCountChange] = useState<number | null>(null);

  useEffect(() => {
    const change = students.length - previousCount.current;
    if (change !== 0) {
      setCountChange(change);
      const timer = setTimeout(() => setCountChange(null), 2000);
      previousCount.current = students.length;
      return () => clearTimeout(timer);
    }
    previousCount.current = students.length;
  }, [students.length]);

  const statistics = useMemo(() => {
    const departmentCounts = new Map<string, number>();
    const skillCounts = new Map<string, number>();
    students.forEach((student) => {
      departmentCounts.set(student.department, (departmentCounts.get(student.department) ?? 0) + 1);
      student.skills.forEach((skill) => skillCounts.set(skill, (skillCounts.get(skill) ?? 0) + 1));
    });

    const deptStats = Array.from(departmentCounts, ([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
    const topSkills = Array.from(skillCounts, ([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, 5);
    const totalSkills = students.reduce((sum, s) => sum + s.skills.length, 0);
    const averageSkills = students.length ? totalSkills / students.length : 0;

    return { deptStats, topSkills, totalSkills, averageSkills };
  }, [students]);

  if (isLoading) return <SafeAreaView style={styles.safe}><View style={styles.center}><ActivityIndicator size="large" /><Text style={styles.loading}>Loading statistics...</Text></View></SafeAreaView>;
  if (error) return <SafeAreaView style={styles.safe}><ErrorScreen message={error} onRetry={reloadStudents} /></SafeAreaView>;

  return <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.subtitle}>All derived values use memoized calculations from the live student list.</Text>
      {countChange !== null && <View style={styles.badge}><Text style={styles.badgeText}>{countChange > 0 ? "↑" : "↓"} {Math.abs(countChange)} {Math.abs(countChange) === 1 ? "added" : "removed"}</Text></View>}
      <View style={styles.summaryRow}>
        <View style={styles.summary}><Text style={styles.value}>{students.length}</Text><Text style={styles.label}>Total Students</Text></View>
        <View style={styles.summary}><Text style={styles.value}>{statistics.totalSkills}</Text><Text style={styles.label}>Total Skills</Text></View>
      </View>
      <View style={styles.summaryRow}>
        <View style={styles.summary}><Text style={styles.value}>{new Set(students.flatMap((s) => s.skills.map((x) => x.toLowerCase()))).size}</Text><Text style={styles.label}>Unique Skills</Text></View>
        <View style={styles.summary}><Text style={styles.value}>{statistics.averageSkills.toFixed(1)}</Text><Text style={styles.label}>Avg Skills / Student</Text></View>
      </View>

      <Text style={styles.section}>Department Breakdown</Text>
      {statistics.deptStats.map((item, index) => <StatBar key={item.label} label={item.label} count={item.count} total={students.length} colour={["#0D9488", "#185FA5", "#7C3AED", "#F59E0B", "#EF4444"][index % 5]} />)}

      <Text style={styles.section}>Top 5 Skills</Text>
      {statistics.topSkills.map((item, index) => <StatBar key={item.label} label={item.label} count={item.count} total={statistics.topSkills[0]?.count ?? 0} colour={["#0D9488", "#185FA5", "#7C3AED", "#F59E0B", "#EF4444"][index % 5]} />)}
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 16, paddingBottom: 35 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loading: { marginTop: 10, color: "#64748b" },
  title: { fontSize: 28, fontWeight: "800", color: "#0f172a" },
  subtitle: { marginTop: 5, color: "#64748b" },
  badge: { alignSelf: "flex-start", backgroundColor: "#dcfce7", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 5, marginTop: 12 },
  badgeText: { color: "#166534", fontWeight: "700", fontSize: 12 },
  summaryRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  summary: { flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 12, padding: 17 },
  value: { fontSize: 25, fontWeight: "800", color: "#0f172a" },
  label: { marginTop: 5, color: "#64748b", fontSize: 12 },
  section: { marginTop: 24, marginBottom: 12, fontSize: 18, fontWeight: "800", color: "#0f172a" },
});
