/**
 * Spacing constants following an 8-point grid system
 * All values are in pixels
 */

export const SPACING = {
  /** 0px */
  none: 0,
  /** 4px - Extra small spacing */
  xs: 4,
  /** 8px - Small spacing */
  sm: 8,
  /** 12px - Medium-small spacing */
  md: 12,
  /** 16px - Medium spacing (base unit) */
  base: 16,
  /** 24px - Large spacing */
  lg: 24,
  /** 32px - Extra large spacing */
  xl: 32,
  /** 40px - 2X extra large spacing */
  "2xl": 40,
  /** 48px - 3X extra large spacing */
  "3xl": 48,
  /** 64px - 4X extra large spacing */
  "4xl": 64,
} as const;

/**
 * Border radius constants
 */
export const RADIUS = {
  /** 0px - No radius */
  none: 0,
  /** 4px - Small radius */
  sm: 4,
  /** 8px - Medium radius */
  md: 8,
  /** 12px - Large radius */
  lg: 12,
  /** 16px - Extra large radius */
  xl: 16,
  /** 24px - 2X extra large radius */
  "2xl": 24,
  /** 9999px - Full/Pill shape */
  full: 9999,
} as const;

export type SpacingKey = keyof typeof SPACING;
export type RadiusKey = keyof typeof RADIUS;
