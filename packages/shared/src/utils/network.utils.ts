import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";

export const ConnectionQuality = {
  EXCELLENT: "excellent",
  GOOD: "good",
  MODERATE: "moderate",
  POOR: "poor",
  OFFLINE: "offline",
} as const;

export type ConnectionQuality =
  (typeof ConnectionQuality)[keyof typeof ConnectionQuality];

export interface NetworkInfo {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
  quality: ConnectionQuality;
  effectiveType: string | null;
}

/**
 * Get current network state
 */
export async function getNetworkState(): Promise<NetInfoState> {
  return await NetInfo.fetch();
}

/**
 * Check if device is connected to internet
 */
export async function isConnected(): Promise<boolean> {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
}

/**
 * Check if internet is reachable
 */
export async function isInternetReachable(): Promise<boolean> {
  const state = await NetInfo.fetch();
  return state.isInternetReachable ?? false;
}

/**
 * Get connection type (wifi, cellular, ethernet, etc)
 */
export async function getConnectionType(): Promise<string | null> {
  const state = await NetInfo.fetch();
  return state.type;
}

/**
 * Determine connection quality based on network details
 */
export function getConnectionQuality(state: NetInfoState): ConnectionQuality {
  // If not connected
  if (!state.isConnected) {
    return ConnectionQuality.OFFLINE;
  }

  // If internet is not reachable
  if (state.isInternetReachable === false) {
    return ConnectionQuality.OFFLINE;
  }

  // WiFi connection
  if (state.type === "wifi") {
    return ConnectionQuality.EXCELLENT;
  }

  // Cellular connection - check details if available
  if (state.type === "cellular" && state.details) {
    const cellularGeneration = (
      state.details as { cellularGeneration?: string }
    ).cellularGeneration;

    switch (cellularGeneration) {
      case "5g":
        return ConnectionQuality.EXCELLENT;
      case "4g":
        return ConnectionQuality.GOOD;
      case "3g":
        return ConnectionQuality.MODERATE;
      case "2g":
        return ConnectionQuality.POOR;
      default:
        return ConnectionQuality.MODERATE;
    }
  }

  // Ethernet or other wired connections
  if (state.type === "ethernet" || state.type === "other") {
    return ConnectionQuality.EXCELLENT;
  }

  // Default
  return ConnectionQuality.MODERATE;
}

/**
 * Get detailed network information
 */
export async function getNetworkInfo(): Promise<NetworkInfo> {
  const state = await NetInfo.fetch();

  return {
    isConnected: state.isConnected ?? false,
    isInternetReachable: state.isInternetReachable,
    type: state.type,
    quality: getConnectionQuality(state),
    effectiveType:
      state.type === "cellular" && state.details
        ? ((state.details as { cellularGeneration?: string })
            .cellularGeneration ?? null)
        : null,
  };
}

/**
 * Check if connection is poor or offline
 */
export async function hasPoorConnection(): Promise<boolean> {
  const state = await NetInfo.fetch();

  if (!state.isConnected || state.isInternetReachable === false) {
    return true;
  }

  const quality = getConnectionQuality(state);
  return (
    quality === ConnectionQuality.POOR || quality === ConnectionQuality.OFFLINE
  );
}

/**
 * Check if connection is good enough for heavy operations
 */
export async function hasGoodConnection(): Promise<boolean> {
  const state = await NetInfo.fetch();

  if (!state.isConnected || state.isInternetReachable === false) {
    return false;
  }

  const quality = getConnectionQuality(state);
  return (
    quality === ConnectionQuality.EXCELLENT ||
    quality === ConnectionQuality.GOOD
  );
}

/**
 * Subscribe to network state changes
 */
export function subscribeToNetworkChanges(
  listener: (state: NetInfoState) => void
): () => void {
  return NetInfo.addEventListener(listener);
}
