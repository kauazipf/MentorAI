import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../../../components/AppButton";
import { Colors, Spacing, Typography, Radius } from "../../../constants/theme";
import { listSkills, SkillDTO } from "../../../services/skillService";

function SkillCard({ skill }: { skill: SkillDTO }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{skill.nome}</Text>
      {!!skill.descricao && (
        <Text style={styles.cardDesc} numberOfLines={3}>
          {skill.descricao}
        </Text>
      )}
    </View>
  );
}

export default function SkillsList() {
  const [skills, setSkills] = useState<SkillDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const load = async () => {
    try {
      setLoading(true);
      const data = await listSkills();
      setSkills(data);
    } catch (e) {
      console.log("SKILL LIST ERROR:", e);
      alert("Erro ao carregar skills");
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
        <Text style={styles.title}>Skills</Text>
        <AppButton
          title="Nova skill"
          onPress={() => router.push("/skills/create")}
          style={{ height: 44, paddingHorizontal: 14 }}
        />
      </View>

      {loading ? (
        <View style={{ marginTop: 30 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={skills}
          keyExtractor={(i, idx) => String(i.id ?? idx)}
          renderItem={({ item }) => <SkillCard skill={item} />}
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

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: { ...Typography.h3, color: Colors.text },
  cardDesc: { ...Typography.body, color: Colors.muted, marginTop: Spacing.sm },
});
