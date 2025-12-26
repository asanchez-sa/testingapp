/**
 * Standardized error types
 */

export type ErrorCode =
  | "UNKNOWN_ERROR"
  | "NETWORK_ERROR"
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "NOT_FOUND_ERROR"
  | "TIMEOUT_ERROR"
  | "SERVER_ERROR"
  | "CLIENT_ERROR"
  | "PARSE_ERROR";

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface ErrorMetadata {
  code: ErrorCode;
  message: string;
  severity: ErrorSeverity;
  timestamp: number;
  context?: Record<string, unknown>;
  stackTrace?: string;
}

export interface ValidationErrorField {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationErrorDetails {
  fields: ValidationErrorField[];
}
