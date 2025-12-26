import type { ConnectionQuality } from "../utils/network.utils";
import { useNetwork } from "./use-network";

export interface UseConnectionQualityReturn {
  quality: ConnectionQuality;
  isPoor: boolean;
  isModerate: boolean;
  isGood: boolean;
  isExcellent: boolean;
  isOffline: boolean;
}

/**
 * Hook to monitor connection quality
 *
 * @example
 * ```tsx
 * function VideoPlayer() {
 *   const { quality, isPoor, isGood } = useConnectionQuality();
 *
 *   // Adjust video quality based on connection
 *   const videoQuality = isGood ? 'hd' : isPoor ? 'low' : 'medium';
 *
 *   return <Video quality={videoQuality} />;
 * }
 * ```
 */
export const useConnectionQuality = (): UseConnectionQualityReturn => {
  const { quality } = useNetwork();

  return {
    quality,
    isPoor: quality === "poor",
    isModerate: quality === "moderate",
    isGood: quality === "good",
    isExcellent: quality === "excellent",
    isOffline: quality === "offline",
  };
};
