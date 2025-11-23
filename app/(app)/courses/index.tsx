// app/(app)/courses/index.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import CourseCard from "../../../components/CourseCard";
import AppButton from "../../../components/AppButton";
import { Colors, Spacing, Typography } from "../../../constants/theme";
import { listCourses, CourseDTO } from "../../../services/courseSource";

export default function CoursesList() {
  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const load = async () => {
    try {
      setLoading(true);
      const data = await listCourses();
      setCourses(data);
    } catch (e) {
      console.log("COURSE LIST ERROR:", e);
      alert("Erro ao carregar trilhas/cursos");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Trilhas e Cursos</Text>
        <AppButton
          title="Novo curso"
          onPress={() => router.push("/courses/create")}
          style={{ height: 44, paddingHorizontal: 14 }}
        />
      </View>

      {loading ? (
        <View style={{ marginTop: 30 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(i, idx) => String(i.id ?? idx)}
          renderItem={({ item }) => <CourseCard course={item} />}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  title: { ...Typography.h2, color: Colors.text },
});
