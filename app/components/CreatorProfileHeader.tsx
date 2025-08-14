"use client";

import { type ReactNode } from "react";

interface Creator {
  name: string;
  handle: string;
  avatar: string;
  isLive: boolean;
  viewerCount: number;
}

interface CreatorProfileHeaderProps {
  creator: Creator;
  variant?: "default";
}

export function CreatorProfileHeader({ 
  creator, 
  variant = "default" 
}: CreatorProfileHeaderProps) {
  return (
    <div className="bg-surface rounded-lg p-4 shadow-card">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {creator.isLive && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-bg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="heading text-text-primary">{creator.name}</h1>
          <p className="caption text-text-secondary">{creator.handle}</p>
        </div>
        
        <div className="text-right">
          {creator.isLive && (
            <>
              <div className="caption text-accent font-semibold">LIVE</div>
              <div className="caption text-text-secondary">
                {creator.viewerCount.toLocaleString()} viewers
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
