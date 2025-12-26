import type { RadiusKey, SpacingKey } from "../constants/spacing.constants";
import { RADIUS, SPACING } from "../constants/spacing.constants";

/**
 * Get spacing value
 * @param size - Spacing size key
 * @returns Spacing value in pixels
 */
export function getSpacing(size: SpacingKey): number {
  return SPACING[size];
}

/**
 * Get radius value
 * @param size - Radius size key
 * @returns Radius value in pixels
 */
export function getRadius(size: RadiusKey): number {
  return RADIUS[size];
}

/**
 * Get multiple spacing values
 * @param sizes - Array of spacing size keys
 * @returns Array of spacing values
 */
export function getSpacings(...sizes: SpacingKey[]): number[] {
  return sizes.map((size) => SPACING[size]);
}

/**
 * Create padding object
 * @param vertical - Vertical padding key
 * @param horizontal - Horizontal padding key
 * @returns Padding style object
 */
export function createPadding(vertical: SpacingKey, horizontal: SpacingKey) {
  return {
    paddingVertical: SPACING[vertical],
    paddingHorizontal: SPACING[horizontal],
  };
}

/**
 * Create margin object
 * @param vertical - Vertical margin key
 * @param horizontal - Horizontal margin key
 * @returns Margin style object
 */
export function createMargin(vertical: SpacingKey, horizontal: SpacingKey) {
  return {
    marginVertical: SPACING[vertical],
    marginHorizontal: SPACING[horizontal],
  };
}
