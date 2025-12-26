import { APP_CONSTANTS } from "@superapp/shared/constants";
import axios, { type AxiosInstance } from "axios";

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: APP_CONSTANTS.API_BASE_URL,
      timeout: APP_CONSTANTS.TIMEOUTS.DEFAULT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  setAuthToken(token: string | null): void {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      this.client.defaults.headers.common.Authorization = undefined;
    }
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

// Singleton instance
const apiClient = new ApiClient();

export const api = apiClient.getClient();
export const setAuthToken = (token: string | null) =>
  apiClient.setAuthToken(token);
