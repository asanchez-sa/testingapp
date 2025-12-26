import type { ValidationErrorDetails, ValidationErrorField } from "../types";
import { AppError } from "./app-error";

/**
 * Validation error class
 */
export class ValidationError extends AppError {
  readonly fields: ValidationErrorField[];

  constructor(
    message: string,
    fields: ValidationErrorField[],
    context?: Record<string, unknown>
  ) {
    super(message, "VALIDATION_ERROR", "low", context);
    this.name = "ValidationError";
    this.fields = fields;
  }

  /**
   * Get validation details
   */
  getDetails(): ValidationErrorDetails {
    return {
      fields: this.fields,
    };
  }

  /**
   * Get error for specific field
   */
  getFieldError(fieldName: string): ValidationErrorField | undefined {
    return this.fields.find((field) => field.field === fieldName);
  }

  /**
   * Check if field has error
   */
  hasFieldError(fieldName: string): boolean {
    return this.fields.some((field) => field.field === fieldName);
  }

  /**
   * Convert to JSON
   */
  override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      fields: this.fields,
    };
  }

  /**
   * Create validation error from Zod error
   */
  static fromZodError(zodError: {
    issues: Array<{ path: Array<string | number>; message: string }>;
  }): ValidationError {
    const fields: ValidationErrorField[] = zodError.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return new ValidationError("Validation failed", fields);
  }

  /**
   * Create validation error for single field
   */
  static forField(
    field: string,
    message: string,
    value?: unknown
  ): ValidationError {
    return new ValidationError(message, [{ field, message, value }]);
  }
}
