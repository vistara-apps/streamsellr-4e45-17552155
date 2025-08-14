
import { Creator, Product, TokenGatingRule } from "../types";

export const mockCreator: Creator = {
  creator_id: "creator_1",
  farcaster_fid: "12345",
  wallet_address: "0x742d35Cc6d3C0532C4BdCf0c40A2Dd9F0c1d1234",
  stream_url: "https://example.com/stream",
  products: [],
  token_gating_rules: []
};

export const mockProducts: Product[] = [
  {
    product_id: "prod_1",
    creator_id: "creator_1",
    name: "Wireless Gaming Headset",
    description: "Premium wireless gaming headset with 7.1 surround sound, noise cancellation, and RGB lighting.",
    price_usdc: 129.99,
    image_url: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
    sku: "WGH-001",
    deeplink: "https://shop.example.com/headset"
  },
  {
    product_id: "prod_2",
    creator_id: "creator_1",
    name: "Smart Fitness Watch",
    description: "Track your workouts, monitor health metrics, and stay connected with this advanced smartwatch.",
    price_usdc: 249.99,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    sku: "SFW-002"
  },
  {
    product_id: "prod_3",
    creator_id: "creator_1",
    name: "Ergonomic Laptop Stand",
    description: "Adjustable aluminum laptop stand for better posture and cooling. Compatible with all laptop sizes.",
    price_usdc: 59.99,
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    sku: "ELS-003"
  }
];

export const mockTokenGatingRules: TokenGatingRule[] = [
  {
    rule_id: "rule_1",
    creator_id: "creator_1",
    token_address: "0x123...abc",
    token_id_or_symbol: "CREATOR_NFT",
    access_level: "premium",
    required_quantity: 1
  }
];

// Update mock creator with products and rules
mockCreator.products = mockProducts;
mockCreator.token_gating_rules = mockTokenGatingRules;
