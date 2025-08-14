"use client";

interface TokenGatedPromptProps {
  variant: "owned" | "notOwned";
  requiredToken: string;
}

export function TokenGatedPrompt({ variant, requiredToken }: TokenGatedPromptProps) {
  const isOwned = variant === "owned";
  
  return (
    <div className={`mt-2 p-3 rounded-md border ${
      isOwned 
        ? "bg-green-500/10 border-green-500/20 text-green-400" 
        : "bg-accent/10 border-accent/20 text-accent"
    }`}>
      <div className="flex items-center space-x-2">
        <span className="text-sm">
          {isOwned ? "✓" : "🔒"}
        </span>
        <span className="caption">
          {isOwned 
            ? `You own ${requiredToken} - Access granted!`
            : `Requires ${requiredToken} to access`
          }
        </span>
      </div>
      
      {!isOwned && (
        <button className="mt-2 text-xs text-accent hover:text-accent/80 underline">
          Learn how to get access
        </button>
      )}
    </div>
  );
}
