import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Perfil</Text>
      <Text>Nome: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
    </View>
  );
}
