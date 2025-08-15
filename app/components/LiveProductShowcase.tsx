"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { TokenGatedPrompt } from "./TokenGatedPrompt";

interface Product {
  product_id: string;
  creator_id: string;
  name: string;
  description: string;
  price_usdc: number;
  image_url: string;
  deeplink?: string;
  sku?: string;
}

// Define a separate interface for the ProductCard component's product type
interface ProductCardType {
  id?: number;
  product_id?: string;
  name: string;
  description: string;
  price?: number;
  price_usdc?: number;
  image?: string;
  image_url?: string;
  isTokenGated?: boolean;
}

interface LiveProductShowcaseProps {
  products: Product[];
  onPurchase: (product: Product) => void;
  checkTokenAccess: (productId: string) => boolean;
}

export function LiveProductShowcase({ 
  products, 
  onPurchase, 
  checkTokenAccess 
}: LiveProductShowcaseProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-lg">
      <div className="flex items-center justify-between">
        <h2 className="heading text-text-primary">Live Products</h2>
        <span className="caption text-text-secondary">
          {products.length} available
        </span>
      </div>

      <div className="space-y-md">
        {products.map((product) => {
          const isGated = !checkTokenAccess(product.product_id);
          
          return (
            <div key={product.product_id} className="space-y-md">
              <ProductCard
                product={{
                  id: parseInt(product.product_id),
                  name: product.name,
                  description: product.description,
                  price: product.price_usdc,
                  image: product.image_url,
                  isTokenGated: isGated
                }}
                variant="compact"
                onPurchase={(cardProduct: ProductCardType) => {
                  // Map back from ProductCard's product type to our Product type
                  const originalProduct = products.find(p => 
                    p.product_id === cardProduct.product_id || 
                    p.product_id === cardProduct.id?.toString()
                  );
                  if (originalProduct) {
                    onPurchase(originalProduct);
                  }
                }}
                isTokenGated={isGated}
              />
              {isGated && (
                <TokenGatedPrompt 
                  variant="notOwned"
                  requiredToken="Creator Pass"
                />
              )}
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-xl">
          <p className="body text-text-secondary">
            No products available during this stream
          </p>
        </div>
      )}
    </div>
  );
}
