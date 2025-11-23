// app/_layout.tsx
import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

function AuthGate() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ainda restaurando sessão

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // não logado e tentando acessar app
      router.replace("/(auth)/login");
    }

    if (user && inAuthGroup) {
      // logado e está no auth (login/register)
      router.replace("/(app)");
    }
  }, [user, loading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
