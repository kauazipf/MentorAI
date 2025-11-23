// app/(auth)/login.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import { Colors, Spacing, Typography } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Preencha o e-mail");
      return;
    }

    try {
      setLoading(true);
      await signIn(email); // agora só email
      router.replace("/(app)");
    } catch (e: any) {
      Alert.alert("Login inválido", e?.message ?? "Usuário não encontrado.");
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
        <Text style={styles.title}>MentorAI</Text>
        <Text style={styles.subtitle}>Entre com seu e-mail</Text>

        <AppInput
          label="E-mail"
          placeholder="voce@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <AppButton title="Entrar" onPress={handleLogin} loading={loading} />
        <View style={{ height: Spacing.sm }} />
        <AppButton
          title="Criar conta"
          variant="secondary"
          onPress={() => router.push("/(auth)/register")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, backgroundColor: Colors.bg, justifyContent: "center", padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface, borderRadius: 20, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.border,
  },
  title: { ...Typography.h1, color: Colors.text, textAlign: "center" },
  subtitle: {
    ...Typography.body, color: Colors.muted, textAlign: "center",
    marginTop: Spacing.sm, marginBottom: Spacing.lg,
  },
});
