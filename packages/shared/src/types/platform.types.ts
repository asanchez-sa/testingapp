/**
 * Platform-specific types
 */

export type Platform = "ios" | "android" | "web";

export interface PlatformSelect<T> {
  ios?: T;
  android?: T;
  web?: T;
  default?: T;
}

export type DeviceType = "phone" | "tablet" | "desktop";

export type Orientation = "portrait" | "landscape";

export type NetworkStatus = "online" | "offline";

export type NetworkType =
  | "wifi"
  | "cellular"
  | "ethernet"
  | "bluetooth"
  | "wimax"
  | "vpn"
  | "other"
  | "unknown"
  | "none";

export type BiometricType = "fingerprint" | "face" | "iris" | "none";
