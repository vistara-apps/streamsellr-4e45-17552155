"use client";

interface ActionToolbarProps {
  variant: "fixedBottom";
  onViewProducts: () => void;
  onViewChat: () => void;
  activeView: string;
}

export function ActionToolbar({ 
  variant, 
  onViewProducts, 
  onViewChat, 
  activeView 
}: ActionToolbarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface p-4">
      <div className="max-w-md mx-auto flex space-x-2">
        <button
          onClick={onViewProducts}
          className={`flex-1 py-3 px-4 rounded-md transition-colors duration-base caption font-medium ${
            activeView === "products"
              ? "bg-primary text-white"
              : "bg-bg text-text-secondary hover:text-text-primary"
          }`}
        >
          🛍️ Products
        </button>
        
        <button
          onClick={onViewChat}
          className={`flex-1 py-3 px-4 rounded-md transition-colors duration-base caption font-medium ${
            activeView === "chat"
              ? "bg-primary text-white"
              : "bg-bg text-text-secondary hover:text-text-primary"
          }`}
        >
          💬 Chat
        </button>
        
        <button className="px-4 py-3 bg-accent hover:bg-accent/90 text-bg rounded-md transition-colors duration-base caption font-medium">
          🎁 React
        </button>
      </div>
    </div>
  );
}
