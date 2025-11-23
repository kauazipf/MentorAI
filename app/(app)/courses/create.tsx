import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { api } from "../../../services/api";

export default function CourseCreate() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    try {
      await api.post("/courses", { title, description: desc });
      alert("Vaga criada");
      router.back();
    } catch (e) {
      console.error(e);
      alert("Erro ao criar vaga");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Descrição" style={[styles.input, { height: 100 }]} value={desc} onChangeText={setDesc} multiline />
      <Button title="Salvar" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 12, borderRadius: 6 }
});
