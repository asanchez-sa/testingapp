import { useNetwork } from "./use-network";

/**
 * Hook to check if device is online (connected and internet reachable)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isOnline = useOnline();
 *
 *   if (!isOnline) {
 *     return <OfflineMessage />;
 *   }
 *
 *   return <OnlineContent />;
 * }
 * ```
 */
export const useOnline = (): boolean => {
  const { isOnline } = useNetwork();
  return isOnline;
};
