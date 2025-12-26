import { AppError } from "./app-error";

/**
 * Network error class
 */
export class NetworkError extends AppError {
  readonly statusCode?: number;
  readonly url?: string;

  constructor(
    message: string,
    statusCode?: number,
    url?: string,
    context?: Record<string, unknown>
  ) {
    super(message, "NETWORK_ERROR", "high", context);
    this.name = "NetworkError";
    this.statusCode = statusCode;
    this.url = url;
  }

  /**
   * Check if error is due to no internet connection
   */
  isNoConnection(): boolean {
    return (
      this.message.toLowerCase().includes("network request failed") ||
      this.message.toLowerCase().includes("no internet")
    );
  }

  /**
   * Check if error is a timeout
   */
  isTimeout(): boolean {
    return (
      this.code === "TIMEOUT_ERROR" ||
      this.message.toLowerCase().includes("timeout")
    );
  }

  /**
   * Convert to JSON
   */
  override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      statusCode: this.statusCode,
      url: this.url,
    };
  }

  /**
   * Create network error from fetch error
   */
  static fromFetchError(error: Error, url?: string): NetworkError {
    return new NetworkError(error.message, undefined, url, {
      originalError: error.name,
    });
  }

  /**
   * Create timeout error
   */
  static timeout(url?: string): NetworkError {
    const error = new NetworkError("Request timeout", undefined, url);
    (error.code as unknown) = "TIMEOUT_ERROR";
    return error;
  }

  /**
   * Create no connection error
   */
  static noConnection(): NetworkError {
    return new NetworkError("No internet connection", undefined, undefined, {
      offline: true,
    });
  }
}
