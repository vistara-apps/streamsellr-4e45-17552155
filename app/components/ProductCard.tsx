"use client";

interface Product {
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

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
  onSelect?: () => void;
  onPurchase?: (product: Product) => void;
  isTokenGated?: boolean;
}

export function ProductCard({ 
  product, 
  variant = "default",
  onSelect,
  onPurchase,
  isTokenGated 
}: ProductCardProps) {
  const isCompact = variant === "compact";
  const productId = product.id || product.product_id;
  const productPrice = product.price || product.price_usdc || 0;
  const productImage = product.image || product.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop";
  const gated = isTokenGated || product.isTokenGated || false;
  
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    } else if (onPurchase) {
      onPurchase(product);
    }
  };
  
  return (
    <div 
      className={`bg-surface rounded-lg shadow-card overflow-hidden cursor-pointer hover:bg-surface/80 transition-all duration-base ${
        isCompact ? "p-3" : "p-4"
      }`}
      onClick={handleClick}
    >
      <div className={`flex ${isCompact ? "space-x-3" : "flex-col space-y-3"}`}>
        <div className={`${isCompact ? "w-16 h-16" : "w-full h-32"} relative`}>
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
          {gated && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs">🔒</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`${isCompact ? "caption" : "heading"} text-text-primary line-clamp-1`}>
              {product.name}
            </h3>
            <span className="caption text-accent font-semibold ml-2">
              ${productPrice}
            </span>
          </div>
          
          <p className={`caption text-text-secondary ${isCompact ? "line-clamp-1" : "line-clamp-2"}`}>
            {product.description}
          </p>
          
          <button className="mt-3 w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors duration-base caption font-medium">
            {gated ? "Check Access" : "Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}
