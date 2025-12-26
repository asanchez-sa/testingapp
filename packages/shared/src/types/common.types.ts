/**
 * Common TypeScript types used across the application
 */

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Generic callback types
export type Callback<T = void> = (value: T) => void;
export type AsyncCallback<T = void> = (value: T) => Promise<void>;

// Generic ID types
export type ID = string | number;
export type UUID = string;

// Status types
export type Status = "idle" | "loading" | "success" | "error";

// Sort order
export type SortOrder = "asc" | "desc";

// Generic filter type
export type Filter<T> = Partial<T>;

// Generic form values
export type FormValues = Record<string, unknown>;

// Generic metadata
export type Metadata = Record<string, unknown>;
