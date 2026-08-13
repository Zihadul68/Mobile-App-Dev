import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ARTICLES } from "../../../data/articles";

type ArticleParams = { id: string };

export default function ArticleDetail() {
  const { id } = useLocalSearchParams<ArticleParams>();
  const navigation = useNavigation();
  const article = ARTICLES.find((a) => a.id === id);

  useEffect(() => {
    if (article) {
      navigation.setOptions({ title: article.title });
    }
  }, [article]);

  if (!article) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>Article not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{article.title}</Text>
      <View style={styles.meta}>
        <Text style={styles.author}>{article.author}</Text>
        <Text style={styles.date}>{article.date}</Text>
      </View>
      <View style={styles.divider} />
      {article.body.split("\n\n").map((para, i) => (
        <Text key={i} style={styles.body}>
          {para}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { padding: 20, paddingBottom: 48 },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0D1F4E",
    lineHeight: 30,
    marginBottom: 12,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  author: { fontSize: 13, color: "#64748B", fontStyle: "italic" },
  date: { fontSize: 13, color: "#94A3B8" },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginBottom: 20 },
  body: { fontSize: 15, color: "#334155", lineHeight: 24, marginBottom: 16 },
  notFound: { padding: 40, textAlign: "center", color: "#94A3B8" },
});
