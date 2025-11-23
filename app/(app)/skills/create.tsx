import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../../../components/AppButton";
import AppInput from "../../../components/AppInput";
import { Colors, Spacing, Typography } from "../../../constants/theme";
import { createSkill } from "../../../services/skillService";

export default function SkillCreate() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCreate = async () => {
    if (!nome.trim()) {
      Alert.alert("Preencha o nome da skill");
      return;
    }

    try {
      setLoading(true);
      await createSkill({ nome, descricao });
      Alert.alert("Skill criada!");
      router.replace("/skills");
    } catch (e: any) {
      console.log("CREATE SKILL ERROR:", e?.response?.data ?? e);
      Alert.alert("Erro ao criar skill", JSON.stringify(e?.response?.data ?? e?.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.screen}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Nova skill</Text>

        <AppInput
          label="Nome"
          placeholder="Ex.: React Native"
          value={nome}
          onChangeText={setNome}
        />

        <AppInput
          label="Descrição (opcional)"
          placeholder="Ex.: Experiência com hooks, navegação, APIs..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          style={{ height: 100, textAlignVertical: "top", paddingTop: 12 }}
        />

        <AppButton title="Salvar" onPress={handleCreate} loading={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
});
