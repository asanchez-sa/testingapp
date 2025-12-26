import type { GestureResponderEvent } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";

export interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export function Button({
  title,
  onPress,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "outline" && styles.textOutline,
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#5856D6",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: "#C7C7CC",
    borderColor: "#C7C7CC",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  textOutline: {
    color: "#007AFF",
  },
  textDisabled: {
    color: "#8E8E93",
  },
});
