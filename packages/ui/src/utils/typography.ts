import type {
  FontSizeKey,
  FontWeightKey,
  LineHeightKey,
  TextStyleKey,
} from "../constants/typography.constants";
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  TEXT_STYLES,
} from "../constants/typography.constants";

/**
 * Get font size value
 * @param size - Font size key
 * @returns Font size in pixels
 */
export function getFontSize(size: FontSizeKey): number {
  return FONT_SIZES[size];
}

/**
 * Get font weight value
 * @param weight - Font weight key
 * @returns Font weight string
 */
export function getFontWeight(weight: FontWeightKey): string {
  return FONT_WEIGHTS[weight];
}

/**
 * Get line height value
 * @param height - Line height key
 * @returns Line height multiplier
 */
export function getLineHeight(height: LineHeightKey): number {
  return LINE_HEIGHTS[height];
}

/**
 * Get predefined text style
 * @param style - Text style key
 * @returns Text style object
 */
export function getTextStyle(style: TextStyleKey) {
  return TEXT_STYLES[style];
}

/**
 * Create custom text style
 * @param fontSize - Font size key
 * @param fontWeight - Font weight key
 * @param lineHeight - Line height key (optional)
 * @returns Custom text style object
 */
export function createTextStyle(
  fontSize: FontSizeKey,
  fontWeight: FontWeightKey,
  lineHeight?: LineHeightKey
) {
  return {
    fontSize: FONT_SIZES[fontSize],
    fontWeight: FONT_WEIGHTS[fontWeight],
    ...(lineHeight && { lineHeight: LINE_HEIGHTS[lineHeight] }),
  };
}
