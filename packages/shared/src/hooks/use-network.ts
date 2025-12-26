import type { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import {
  type ConnectionQuality,
  type NetworkInfo,
  NetworkUtils,
} from "../utils/network.utils";

export interface UseNetworkReturn {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
  quality: ConnectionQuality;
  isOnline: boolean;
  isOffline: boolean;
  isPoorConnection: boolean;
  isGoodConnection: boolean;
  networkInfo: NetworkInfo | null;
}

/**
 * Hook to monitor network connection status
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isConnected, isOffline, isPoorConnection } = useNetwork();
 *
 *   if (isOffline) {
 *     return <Text>No internet connection</Text>;
 *   }
 *
 *   if (isPoorConnection) {
 *     return <Text>Poor connection detected</Text>;
 *   }
 *
 *   return <Text>Connected</Text>;
 * }
 * ```
 */
export const useNetwork = (): UseNetworkReturn => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);

  useEffect(() => {
    // Get initial network state
    NetworkUtils.getNetworkInfo().then(setNetworkInfo);

    // Subscribe to network changes
    const unsubscribe = NetworkUtils.subscribe((state: NetInfoState) => {
      const info: NetworkInfo = {
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        quality: NetworkUtils.getConnectionQuality(state),
        effectiveType:
          state.type === "cellular" && state.details
            ? ((state.details as { cellularGeneration?: string })
                .cellularGeneration ?? null)
            : null,
      };
      setNetworkInfo(info);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isConnected = networkInfo?.isConnected ?? false;
  const isInternetReachable = networkInfo?.isInternetReachable ?? null;
  const isOnline = isConnected && isInternetReachable !== false;
  const isOffline = !isOnline;
  const isPoorConnection =
    networkInfo?.quality === "poor" || networkInfo?.quality === "offline";
  const isGoodConnection =
    networkInfo?.quality === "excellent" || networkInfo?.quality === "good";

  return {
    isConnected,
    isInternetReachable,
    type: networkInfo?.type ?? null,
    quality: (networkInfo?.quality ?? "offline") as ConnectionQuality,
    isOnline,
    isOffline,
    isPoorConnection,
    isGoodConnection,
    networkInfo,
  };
};
