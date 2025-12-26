import { Platform } from "react-native";

/**
 * Platform-specific constants
 */

export const PLATFORM_CONSTANTS = {
  OS: Platform.OS,
  IS_IOS: Platform.OS === "ios",
  IS_ANDROID: Platform.OS === "android",
  IS_WEB: Platform.OS === "web",
  VERSION: Platform.Version,

  // Platform-specific spacing
  SAFE_AREA: {
    TOP: Platform.OS === "ios" ? 44 : 0,
    BOTTOM: Platform.OS === "ios" ? 34 : 0,
  },

  // Platform-specific features
  FEATURES: {
    HAS_NOTCH: Platform.OS === "ios",
    HAS_HAPTIC_FEEDBACK: Platform.OS === "ios" || Platform.OS === "android",
    HAS_BIOMETRIC: true, // Puede ser refinado con detección real
  },
} as const;
