/**
 * Typography constants following iOS Human Interface Guidelines
 * Font sizes, weights, and line heights
 */

export const FONT_SIZES = {
  /** 10px - Extra small text */
  xs: 10,
  /** 12px - Small text */
  sm: 12,
  /** 14px - Base text */
  base: 14,
  /** 16px - Medium text */
  md: 16,
  /** 18px - Large text */
  lg: 18,
  /** 20px - Extra large text */
  xl: 20,
  /** 24px - 2X extra large text */
  "2xl": 24,
  /** 28px - 3X extra large text */
  "3xl": 28,
  /** 32px - 4X extra large text */
  "4xl": 32,
  /** 36px - 5X extra large text */
  "5xl": 36,
  /** 48px - 6X extra large text */
  "6xl": 48,
} as const;

export const FONT_WEIGHTS = {
  /** 300 - Light */
  light: "300",
  /** 400 - Regular */
  regular: "400",
  /** 500 - Medium */
  medium: "500",
  /** 600 - Semibold */
  semibold: "600",
  /** 700 - Bold */
  bold: "700",
  /** 800 - Extra bold */
  extrabold: "800",
  /** 900 - Black */
  black: "900",
} as const;

export const LINE_HEIGHTS = {
  /** 1.0 - Tight */
  tight: 1.0,
  /** 1.25 - Snug */
  snug: 1.25,
  /** 1.5 - Normal */
  normal: 1.5,
  /** 1.75 - Relaxed */
  relaxed: 1.75,
  /** 2.0 - Loose */
  loose: 2.0,
} as const;

/**
 * Predefined text styles
 */
export const TEXT_STYLES = {
  h1: {
    fontSize: FONT_SIZES["4xl"],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  h2: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  h3: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.snug,
  },
  h4: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.snug,
  },
  body: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  bodyLarge: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  caption: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  button: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
} as const;

export type FontSizeKey = keyof typeof FONT_SIZES;
export type FontWeightKey = keyof typeof FONT_WEIGHTS;
export type LineHeightKey = keyof typeof LINE_HEIGHTS;
export type TextStyleKey = keyof typeof TEXT_STYLES;
