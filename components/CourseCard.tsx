import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Colors, Radius, Spacing, Typography } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

export default function CourseCard({ course }: any) {
  const title = course?.nome ?? course?.title ?? "Sem título";
  const description = course?.descricao ?? course?.description ?? "Sem descrição";

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Feather name="chevron-right" size={18} color={Colors.muted} />
      </View>

      <Text style={styles.desc} numberOfLines={3}>
        {description}
      </Text>

      {/* Link correto no RN: asChild */}
      {course?.id != null && (
        <Link href={`/courses/${course.id}`} asChild>
          <TouchableOpacity style={styles.linkBtn} activeOpacity={0.8}>
            <Text style={styles.linkText}>Ver detalhes</Text>
          </TouchableOpacity>
        </Link>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { ...Typography.h3, color: Colors.text },
  desc: { ...Typography.body, color: Colors.muted, marginTop: Spacing.sm },

  linkBtn: { marginTop: Spacing.md },
  linkText: { color: Colors.primary, fontWeight: "600" },
});
