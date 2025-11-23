// app/(app)/_layout.tsx
import React from "react";
import { Drawer } from "expo-router/drawer";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: Colors.surface },
        headerTintColor: Colors.text,
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.muted,
        drawerStyle: {
          backgroundColor: Colors.surface,
          width: 280,
        },
      }}
    >
      {/* Home */}
      <Drawer.Screen
        name="index"
        options={{
          title: "Início",
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />

      {/* IA */}
      <Drawer.Screen
        name="ia"
        options={{
          title: "IA",
          drawerIcon: ({ color, size }) => (
            <Feather name="cpu" color={color} size={size} />
          ),
        }}
      />

      {/* Courses (folder) */}
      <Drawer.Screen
        name="courses/index"
        options={{
          title: "Cursos e Trilhas",
          drawerIcon: ({ color, size }) => (
            <Feather name="briefcase" color={color} size={size} />
          ),
        }}
      />

      {/* Perfil */}
      <Drawer.Screen
        name="profile"
        options={{
          title: "Perfil",
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="courses/create"
        options={{
          title: "Criar curso",
          drawerIcon: ({ color, size }) => (
            <Feather name="plus-square" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="skills/index"
        options={{
          title: "Skills",
          drawerIcon: ({ color, size }) => (
            <Feather name="award" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="skills/create"
        options={{
          title: "Nova skill",
          drawerItemStyle: { display: "none" }, // 👈 esconde do menu
        }}
      />

      <Drawer.Screen
        name="courses/[id]"
        options={{
          title: "Detalhe do curso",
          drawerItemStyle: { display: "none" }, // 👈 esconde do menu
        }}
      />
    </Drawer>
  );
}
