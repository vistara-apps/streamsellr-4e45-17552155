
"use client";

import { useState, useCallback } from "react";
import { useAccount } from "wagmi";

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Connection logic handled by OnchainKit/Wagmi
      console.log("Connecting wallet...");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    address,
    isConnected,
    isConnecting,
    connect,
  };
}
