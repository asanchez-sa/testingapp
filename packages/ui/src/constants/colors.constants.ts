/**
 * Color palette constants for the UI library
 * Following iOS Human Interface Guidelines colors
 */

export const COLORS = {
  // Primary colors
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#34C759",
  warning: "#FF9500",
  danger: "#FF3B30",
  info: "#5AC8FA",

  // Neutral colors
  white: "#FFFFFF",
  black: "#000000",

  // Gray scale
  gray50: "#F9F9F9",
  gray100: "#F2F2F7",
  gray200: "#E5E5EA",
  gray300: "#D1D1D6",
  gray400: "#C7C7CC",
  gray500: "#AEAEB2",
  gray600: "#8E8E93",
  gray700: "#636366",
  gray800: "#48484A",
  gray900: "#3A3A3C",

  // Semantic colors
  background: "#FFFFFF",
  surface: "#F9F9F9",
  border: "#E5E5EA",
  text: "#000000",
  textSecondary: "#8E8E93",
  textDisabled: "#C7C7CC",

  // State colors
  disabled: "#C7C7CC",
  placeholder: "#8E8E93",
  overlay: "rgba(0, 0, 0, 0.5)",

  // Transparent
  transparent: "transparent",
} as const;

export type ColorKey = keyof typeof COLORS;
