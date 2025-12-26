import { StyleSheet } from "react-native";
import { BUTTON_COLORS } from "./button.constants";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: BUTTON_COLORS.primary,
  },
  secondary: {
    backgroundColor: BUTTON_COLORS.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: BUTTON_COLORS.outline,
  },
  ghost: {
    backgroundColor: BUTTON_COLORS.ghost,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: BUTTON_COLORS.disabled,
    borderColor: BUTTON_COLORS.disabled,
  },
  text: {
    color: BUTTON_COLORS.text,
    fontWeight: "600",
  },
  textOutline: {
    color: BUTTON_COLORS.textOutline,
  },
  textGhost: {
    color: BUTTON_COLORS.textGhost,
  },
  textDisabled: {
    color: BUTTON_COLORS.textDisabled,
  },
});
