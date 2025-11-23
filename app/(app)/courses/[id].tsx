import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { api } from "../../../services/api";

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api.get(`/courses/${id}`);
        setCourse(r.data);
        setTitle(r.data.title);
        setDesc(r.data.description);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/courses/${id}`, { title, description: desc });
      alert("Atualizado");
    } catch (e) {
      console.error(e);
      alert("Erro");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/courses/${id}`);
      alert("Removido");
      router.back();
    } catch (e) {
      console.error(e);
      alert("Erro ao remover");
    }
  };

  if (!course) return <Text>Carregando...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text>Id: {id}</Text>
      <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, padding: 8, marginVertical: 8 }} />
      <TextInput value={desc} onChangeText={setDesc} style={{ borderWidth: 1, padding: 8, marginVertical: 8, height: 100 }} multiline />
      <Button title="Atualizar" onPress={handleUpdate} />
      <View style={{ height: 8 }} />
      <Button title="Excluir" onPress={handleDelete} color="red" />
    </View>
  );
}
