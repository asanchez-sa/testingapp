import type { ButtonSize, ButtonVariant } from "./button.types";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "primary",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
} as const;

export const BUTTON_SIZES: Record<
  ButtonSize,
  { paddingVertical: number; paddingHorizontal: number; fontSize: number }
> = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18,
  },
} as const;

export const BUTTON_COLORS = {
  primary: "#007AFF",
  secondary: "#5856D6",
  outline: "#007AFF",
  ghost: "transparent",
  disabled: "#C7C7CC",
  text: "#FFFFFF",
  textOutline: "#007AFF",
  textGhost: "#007AFF",
  textDisabled: "#8E8E93",
} as const;

export const BUTTON_DEFAULTS = {
  variant: "primary" as ButtonVariant,
  size: "medium" as ButtonSize,
  disabled: false,
  fullWidth: false,
} as const;
