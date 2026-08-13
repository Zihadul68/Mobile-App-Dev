import React, { useMemo } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useStudents } from "../context/students-context";

export default function StatisticsScreen() {
  const { students } = useStudents();

  const statistics = useMemo(() => {
    const totalSkills = students.reduce(
      (sum, student) => sum + student.skills.length,
      0
    );

    const uniqueSkills = new Set(
      students.flatMap((student) => student.skills.map((skill) => skill.toLowerCase()))
    );

    const averageSkills = students.length
      ? totalSkills / students.length
      : 0;

    const mostSkilledStudent = students.reduce<StudentSummary | null>(
      (best, student) => {
        if (!best || student.skills.length > best.skillCount) {
          return {
            name: student.name,
            skillCount: student.skills.length,
          };
        }
        return best;
      },
      null
    );

    return {
      totalStudents: students.length,
      totalSkills,
      uniqueSkills: uniqueSkills.size,
      averageSkills,
      mostSkilledStudent,
    };
  }, [students]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.subtitle}>
          Memoized statistics derived from the global student state.
        </Text>

        <View style={styles.grid}>
          <Stat title="Total Students" value={statistics.totalStudents.toString()} />
          <Stat title="Total Skills" value={statistics.totalSkills.toString()} />
          <Stat title="Unique Skills" value={statistics.uniqueSkills.toString()} />
          <Stat
            title="Avg Skills / Student"
            value={statistics.averageSkills.toFixed(1)}
          />
        </View>

        <View style={styles.featured}>
          <Text style={styles.featuredLabel}>Most Skilled Student</Text>
          <Text style={styles.featuredName}>
            {statistics.mostSkilledStudent?.name ?? "No students"}
          </Text>
          <Text style={styles.featuredDetail}>
            {statistics.mostSkilledStudent
              ? `${statistics.mostSkilledStudent.skillCount} skills`
              : "Add a student to see this statistic."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

type StudentSummary = {
  name: string;
  skillCount: number;
};

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 5,
    color: "#64748b",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  stat: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  value: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
  },
  label: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 12,
  },
  featured: {
    marginTop: 16,
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 20,
  },
  featuredLabel: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  featuredName: {
    marginTop: 6,
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  featuredDetail: {
    marginTop: 4,
    color: "#cbd5e1",
  },
});