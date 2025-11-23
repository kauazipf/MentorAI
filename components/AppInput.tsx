import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../constants/theme";

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export default function AppInput({ label, error, style, ...props }: Props) {
  return (
    <View style={{ marginBottom: Spacing.md }}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholderTextColor="#9CA3AF"
        style={[styles.input, style]}
        {...props}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...Typography.small,
    color: Colors.muted,
    marginBottom: Spacing.xs,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    ...Typography.body,
    color: Colors.text,
  },
  error: {
    marginTop: 4,
    color: Colors.danger,
    ...Typography.small,
  },
});
