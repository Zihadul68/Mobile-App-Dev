import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Student } from "../constants/students";

type Props = {
  students: Student[];
  previousCountChange?: number | null;
};

export default function StatBar({ students, previousCountChange = null }: Props) {
  const averageSkills = useMemo(() => {
    if (students.length === 0) return 0;

    const totalSkills = students.reduce(
      (total, student) => total + student.skills.length,
      0
    );

    return totalSkills / students.length;
  }, [students]);

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.value}>{students.length}</Text>
        <Text style={styles.label}>Total Students</Text>

        {previousCountChange !== null && previousCountChange !== 0 && (
          <View style={styles.changeBadge}>
            <Text style={styles.changeText}>
              {previousCountChange > 0 ? "↑" : "↓"}{" "}
              {Math.abs(previousCountChange)}{" "}
              {Math.abs(previousCountChange) === 1 ? "added" : "removed"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.stat}>
        <Text style={styles.value}>{averageSkills.toFixed(1)}</Text>
        <Text style={styles.label}>Avg Skills / Student</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
  },
  label: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 12,
  },
  changeBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#dcfce7",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  changeText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "700",
  },
});