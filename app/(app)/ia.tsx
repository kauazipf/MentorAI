import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "../../components/AppButton";
import { Colors, Spacing, Typography, Radius } from "../../constants/theme";
import { Feather } from "@expo/vector-icons";

type AnalysisResult = {
  score: number;
  highlights: string[];
  improvements: string[];
};

function analyzeProfileLocal(imageUri: string | null): AnalysisResult {
  // Heurística simples pra ter algo funcional agora.
  // Depois trocamos por chamada à API quando você criar /IA.
  const baseHighlights = [
    "Boa iniciativa em usar uma foto de perfil.",
    "Seu perfil está pronto para melhorias orientadas por trilhas.",
  ];
  const baseImprovements = [
    "Use uma foto mais clara e centralizada no rosto.",
    "Prefira um fundo neutro e iluminação frontal.",
    "Evite selfies com ângulos muito baixos ou filtro pesado.",
  ];

  const score = imageUri ? 82 : 0;

  return {
    score,
    highlights: imageUri ? baseHighlights : [],
    improvements: imageUri ? baseImprovements : ["Envie uma foto para analisar."],
  };
}

export default function IA() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permissão necessária", "Permita acesso à galeria.");
      return;
    }

    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!r.canceled) {
      setImageUri(r.assets[0].uri);
      setResult(null);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permissão necessária", "Permita acesso à câmera.");
      return;
    }

    const r = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!r.canceled) {
      setImageUri(r.assets[0].uri);
      setResult(null);
    }
  };

  const runAnalysis = async () => {
    if (!imageUri) {
      Alert.alert("Escolha uma foto primeiro");
      return;
    }
    try {
      setLoading(true);
      // análise local (rápida)
      const analysis = analyzeProfileLocal(imageUri);
      setResult(analysis);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = useMemo(() => {
    if (!result) return Colors.muted;
    if (result.score >= 80) return Colors.success;
    if (result.score >= 60) return "#F59E0B";
    return Colors.danger;
  }, [result]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>IA — Analisar Perfil</Text>
      <Text style={styles.subtitle}>
        Envie uma foto de perfil para receber feedback inteligente.
      </Text>

      {/* Preview */}
      <View style={styles.previewBox}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImg} />
        ) : (
          <View style={styles.previewEmpty}>
            <Feather name="image" size={28} color={Colors.muted} />
            <Text style={{ color: Colors.muted, marginTop: 8 }}>
              Nenhuma foto selecionada
            </Text>
          </View>
        )}
      </View>

      {/* Ações */}
      <View style={{ marginTop: Spacing.md }}>
        <AppButton title="Escolher da galeria" variant="secondary" onPress={pickImage} />
        <View style={{ height: Spacing.sm }} />
        <AppButton title="Tirar foto" variant="secondary" onPress={takePhoto} />
        <View style={{ height: Spacing.md }} />
        <AppButton title="Analisar com IA" onPress={runAnalysis} loading={loading} />
      </View>

      {/* Resultado */}
      {!!result && (
        <View style={styles.resultCard}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Score do perfil</Text>
            <Text style={[styles.scoreValue, { color: scoreColor }]}>
              {result.score}/100
            </Text>
          </View>

          <Text style={styles.section}>Pontos fortes</Text>
          {result.highlights.map((h, i) => (
            <View key={i} style={styles.bulletRow}>
              <Feather name="check-circle" size={16} color={Colors.success} />
              <Text style={styles.bulletText}>{h}</Text>
            </View>
          ))}

          <Text style={styles.section}>Melhorias sugeridas</Text>
          {result.improvements.map((m, i) => (
            <View key={i} style={styles.bulletRow}>
              <Feather name="alert-circle" size={16} color={Colors.primary} />
              <Text style={styles.bulletText}>{m}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Gancho futuro */}
      <View style={styles.futureBox}>
        <Text style={styles.futureTitle}>Próximo passo</Text>
        <Text style={styles.futureText}>
          Quando você criar um endpoint na sua API (ex.: POST /IA/analisar),
          eu conecto essa tela para enviar a foto e receber análise real.
        </Text>
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
  title: { ...Typography.h2, color: Colors.text },
  subtitle: {
    ...Typography.body,
    color: Colors.muted,
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },

  previewBox: {
    height: 220,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  previewImg: { width: "100%", height: "100%" },
  previewEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  resultCard: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  scoreLabel: { ...Typography.body, color: Colors.muted },
  scoreValue: { ...Typography.h2 },

  section: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: 6,
  },
  bulletText: { ...Typography.body, color: Colors.text, flex: 1 },

  futureBox: {
    marginTop: Spacing.lg,
    backgroundColor: "#EEF2FF",
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  futureTitle: { ...Typography.h3, color: Colors.primary },
  futureText: { ...Typography.body, color: Colors.text, marginTop: 6 },
});
