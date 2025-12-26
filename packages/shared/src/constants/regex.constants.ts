/**
 * Common regular expressions for validation
 */

export const REGEX_PATTERNS = {
  // Email validation (RFC 5322 simplified)
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Phone number (internacional format)
  PHONE: /^\+?[1-9]\d{1,14}$/,

  // URL validation
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,

  // Password (mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número)
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,

  // Nombres (solo letras y espacios)
  NAME: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,

  // Username (alfanumérico, guión bajo y punto)
  USERNAME: /^[a-zA-Z0-9._]{3,20}$/,

  // Números
  NUMBERS_ONLY: /^\d+$/,
  DECIMAL: /^\d+\.?\d*$/,

  // Tarjetas de crédito
  CREDIT_CARD: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/,

  // Códigos postales
  ZIP_CODE: /^\d{5}(-\d{4})?$/,

  // Hex color
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const;
