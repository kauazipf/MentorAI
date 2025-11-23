// app/(app)/index.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors, Spacing, Typography, Radius } from "../../constants/theme";
import AppButton from "../../components/AppButton";
import { useAuth } from "../../hooks/useAuth";

function HomeCard({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <View style={styles.cardIcon}>
        <Feather name={icon} size={20} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={18} color={Colors.muted} />
    </TouchableOpacity>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bem-vindo(a),</Text>
        <Text style={styles.name}>{user?.nome ?? "mentor"} 👋</Text>
        <Text style={styles.subGreeting}>
          Vamos evoluir sua jornada profissional hoje.
        </Text>
      </View>

      {/* Cards principais */}
      <View style={{ marginTop: Spacing.lg }}>
        <HomeCard
          title="Vagas e Trilhas"
          subtitle="Encontre vagas e acompanhe seu progresso."
          icon="briefcase"
          onPress={() => router.push("/(app)/courses/index")}
        />
        <HomeCard
          title="IA – Analisar Perfil / Foto"
          subtitle="Receba feedback inteligente do seu perfil."
          icon="cpu"
          onPress={() => router.push("/ia")}
        />
        <HomeCard
          title="Meu Perfil"
          subtitle="Veja e edite suas informações."
          icon="user"
          onPress={() => router.push("/profile")}
        />
      </View>

      {/* Atalhos rápidos */}
      <View style={styles.quickSection}>
        <Text style={styles.sectionTitle}>Atalhos rápidos</Text>

        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/courses/create")}
          >
            <Feather name="plus" size={18} color={Colors.text} />
            <Text style={styles.quickText}>Criar vaga</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/(app)/courses/index")}
          >
            <Feather name="search" size={18} color={Colors.text} />
            <Text style={styles.quickText}>Explorar Cursos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/ia")}
          >
            <Feather name="zap" size={18} color={Colors.text} />
            <Text style={styles.quickText}>Rodar IA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/profile")}
          >
            <Feather name="edit-3" size={18} color={Colors.text} />
            <Text style={styles.quickText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sair */}
      <View style={{ marginTop: Spacing.xl }}>
        <AppButton title="Sair" variant="secondary" onPress={signOut} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: Spacing.lg,
  },

  header: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  greeting: {
    ...Typography.small,
    color: Colors.muted,
  },
  name: {
    ...Typography.h1,
    color: Colors.text,
    marginTop: 2,
  },
  subGreeting: {
    ...Typography.body,
    color: Colors.muted,
    marginTop: Spacing.sm,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  cardTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  cardSubtitle: {
    ...Typography.small,
    color: Colors.muted,
    marginTop: 2,
  },

  quickSection: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  quickItem: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  quickText: {
    ...Typography.body,
    color: Colors.text,
  },
});
