/**
 * Application-wide constants
 */

export const APP_CONSTANTS = {
  APP_NAME: "Superapp",
  APP_VERSION: "1.0.0",

  // API URLs (pueden ser sobrescritos por environment variables)
  API_BASE_URL:
    (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) ||
    "https://api.domain.com",
  AUTH_BASE_URL:
    (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_AUTH_URL) ||
    "https://auth.domain.com",

  // Timeouts (en milisegundos)
  TIMEOUTS: {
    DEFAULT: 30_000, // 30 segundos
    UPLOAD: 120_000, // 2 minutos
    DOWNLOAD: 60_000, // 1 minuto
  },

  // Límites
  LIMITS: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_UPLOAD_FILES: 5,
    MAX_RETRY_ATTEMPTS: 3,
  },

  // Storage
  STORAGE: {
    TOKEN_KEY: "auth_token",
    REFRESH_TOKEN_KEY: "refresh_token",
    USER_KEY: "user_data",
    THEME_KEY: "app_theme",
  },
} as const;

// Global __DEV__ variable (available in React Native)
declare const __DEV__: boolean;

export const ENVIRONMENT = {
  isDev: typeof __DEV__ !== "undefined" ? __DEV__ : false,
  isProd: typeof __DEV__ !== "undefined" ? !__DEV__ : true,
} as const;
