// app/(auth)/register.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import { Colors, Spacing, Typography } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [desiredRole, setDesiredRole] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !currentRole.trim() || !desiredRole.trim()) {
      Alert.alert("Preencha tudo", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      // ✅ mapeia pro formato que a API exige
      await register({
        nome: name,
        email,
        cargoAtual: currentRole,
        cargoDesejado: desiredRole,
      });

      Alert.alert("Sucesso!", "Cadastro feito! Agora faça login.");
      router.replace("/(auth)/login");
    } catch (e: any) {
      console.log("REGISTER ERROR:", e?.response?.status, e?.response?.data);
      Alert.alert("Erro ao cadastrar", JSON.stringify(e?.response?.data ?? e?.message));
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
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Leva menos de 1 minuto</Text>

        <AppInput label="Nome" placeholder="Seu nome" value={name} onChangeText={setName} />
        <AppInput label="E-mail" placeholder="voce@email.com" autoCapitalize="none"
          keyboardType="email-address" value={email} onChangeText={setEmail} />

        <AppInput label="Cargo atual" placeholder="Ex.: Estagiário de TI"
          value={currentRole} onChangeText={setCurrentRole} />

        <AppInput label="Cargo desejado" placeholder="Ex.: Dev Mobile Jr."
          value={desiredRole} onChangeText={setDesiredRole} />

        <AppButton title="Cadastrar" onPress={handleRegister} loading={loading} />
        <View style={{ height: Spacing.sm }} />
        <AppButton title="Já tenho conta" variant="ghost"
          onPress={() => router.replace("/(auth)/login")} />
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
  title: { ...Typography.h2, color: Colors.text, textAlign: "center" },
  subtitle: {
    ...Typography.body, color: Colors.muted, textAlign: "center",
    marginTop: Spacing.sm, marginBottom: Spacing.lg,
  },
});
