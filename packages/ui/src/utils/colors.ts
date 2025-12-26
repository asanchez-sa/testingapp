import { COLORS } from "../constants/colors.constants";

/**
 * Convert hex color to rgba
 * @param hex - Hex color string (e.g., '#007AFF')
 * @param alpha - Alpha value between 0 and 1
 * @returns RGBA color string
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Get color with opacity
 * @param color - Color key from COLORS constant
 * @param opacity - Opacity value between 0 and 1
 * @returns Color with opacity applied
 */
export function getColorWithOpacity(
  color: keyof typeof COLORS,
  opacity: number
): string {
  const colorValue = COLORS[color];

  if (colorValue.startsWith("#")) {
    return hexToRgba(colorValue, opacity);
  }

  return colorValue;
}

/**
 * Check if a color is light or dark
 * @param hex - Hex color string
 * @returns true if the color is light, false if dark
 */
export function isLightColor(hex: string): boolean {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5;
}
