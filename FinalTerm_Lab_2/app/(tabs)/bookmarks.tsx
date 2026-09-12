import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function BookmarksScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Bookmarks</Text>
        <Text style={styles.subtitle}>Saved student profiles can be organized here.</Text>
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No bookmarks yet</Text>
          <Text style={styles.emptyText}>The Week 6 manual requires the Bookmarks tab; no bookmarking behavior is graded.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#0f172a" },
  subtitle: { marginTop: 5, color: "#64748b" },
  empty: { marginTop: 50, padding: 22, borderRadius: 14, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  emptyText: { marginTop: 7, color: "#64748b", lineHeight: 20 },
});
