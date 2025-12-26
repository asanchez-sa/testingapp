import type { ErrorCode, ErrorMetadata, ErrorSeverity } from "../types";

/**
 * Base application error class
 */
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly severity: ErrorSeverity;
  readonly timestamp: number;
  readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    code: ErrorCode = "UNKNOWN_ERROR",
    severity: ErrorSeverity = "medium",
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.severity = severity;
    this.timestamp = Date.now();
    this.context = context;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * Convert error to metadata object
   */
  toMetadata(): ErrorMetadata {
    return {
      code: this.code,
      message: this.message,
      severity: this.severity,
      timestamp: this.timestamp,
      context: this.context,
      stackTrace: this.stack,
    };
  }

  /**
   * Convert error to JSON
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      severity: this.severity,
      timestamp: this.timestamp,
      context: this.context,
      stack: this.stack,
    };
  }

  /**
   * Check if error is of specific code
   */
  isCode(code: ErrorCode): boolean {
    return this.code === code;
  }

  /**
   * Check if error is critical
   */
  isCritical(): boolean {
    return this.severity === "critical";
  }

  /**
   * Create error from unknown error
   */
  static fromError(error: unknown, code?: ErrorCode): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      const appError = new AppError(
        error.message,
        code || "UNKNOWN_ERROR",
        "medium"
      );
      appError.stack = error.stack;
      return appError;
    }

    return new AppError(String(error), code || "UNKNOWN_ERROR", "medium");
  }
}
