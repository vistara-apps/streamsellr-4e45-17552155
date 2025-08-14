"use client";

interface WalletStatusIndicatorProps {
  variant: "connected" | "disconnected";
}

export function WalletStatusIndicator({ variant }: WalletStatusIndicatorProps) {
  const isConnected = variant === "connected";
  
  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-base ${
      isConnected 
        ? "bg-green-500/10 text-green-400 border border-green-500/20"
        : "bg-surface text-text-secondary hover:bg-surface/80 border border-surface"
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        isConnected ? "bg-green-400" : "bg-text-secondary"
      }`}></div>
      <span className="caption font-medium">
        {isConnected ? "Connected" : "Connect Wallet"}
      </span>
    </div>
  );
}
