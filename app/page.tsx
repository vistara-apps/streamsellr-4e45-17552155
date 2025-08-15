"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { CreatorProfileHeader } from "./components/CreatorProfileHeader";
import { ProductCard } from "./components/ProductCard";
import { TokenGatedPrompt } from "./components/TokenGatedPrompt";
import { ActionToolbar } from "./components/ActionToolbar";
import { WalletStatusIndicator } from "./components/WalletStatusIndicator";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeView, setActiveView] = useState("products");
  
  // Define the type for the product to match the mockProducts structure
  type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    isTokenGated: boolean;
    requiredToken?: string;
  };
  
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-accent text-sm font-medium px-3 py-1 rounded-md bg-surface hover:bg-surface/80 transition-colors"
        >
          + Save
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-accent animate-fade-in">
          <span>✓ Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  // Mock data for demonstration
  const mockProducts = [
    {
      id: 1,
      name: "Premium Course Bundle",
      description: "Complete web3 development course with exclusive NFT certificate",
      price: 99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      isTokenGated: true,
      requiredToken: "Creator Pass NFT"
    },
    {
      id: 2,
      name: "1-on-1 Mentorship",
      description: "Personal mentorship session with industry expert",
      price: 250,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      isTokenGated: false
    },
    {
      id: 3,
      name: "Exclusive Merch",
      description: "Limited edition creator merchandise",
      price: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop",
      isTokenGated: true,
      requiredToken: "Community Token"
    }
  ];

  const mockCreator = {
    name: "Alex Chen",
    handle: "@alexbuilds",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    isLive: true,
    viewerCount: 1247
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text-primary">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Wallet className="z-10">
              <ConnectWallet>
                <WalletStatusIndicator variant="disconnected" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1 space-y-4">
          <CreatorProfileHeader creator={mockCreator} />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="heading">Featured Products</h2>
              <span className="caption text-text-secondary">
                {mockProducts.length} items
              </span>
            </div>
            
            <div className="space-y-3">
              {mockProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard 
                    product={product}
                    variant="default"
                    onSelect={() => setSelectedProduct(product)}
                  />
                  {product.isTokenGated && (
                    <TokenGatedPrompt 
                      variant="notOwned"
                      requiredToken={product.requiredToken}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        <ActionToolbar 
          variant="fixedBottom"
          onViewProducts={() => setActiveView("products")}
          onViewChat={() => setActiveView("chat")}
          activeView={activeView}
        />

        <footer className="mt-4 pt-4 flex justify-center">
          <button
            className="text-text-secondary text-xs hover:text-text-primary transition-colors"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}
