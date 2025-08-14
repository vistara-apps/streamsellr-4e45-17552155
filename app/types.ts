
export interface Creator {
  creator_id: string;
  farcaster_fid: string;
  wallet_address: string;
  stream_url?: string;
  products: Product[];
  token_gating_rules: TokenGatingRule[];
}

export interface Product {
  product_id: string;
  creator_id: string;
  name: string;
  description: string;
  price_usdc: number;
  image_url: string;
  deeplink?: string;
  sku: string;
}

export interface Viewer {
  viewer_id: string;
  farcaster_fid: string;
  wallet_address: string;
  engagement_data?: any;
}

export interface Sale {
  sale_id: string;
  product_id: string;
  creator_id: string;
  viewer_id: string;
  transaction_hash: string;
  amount_usdc: number;
  timestamp: string;
}

export interface TokenGatingRule {
  rule_id: string;
  creator_id: string;
  token_address: string;
  token_id_or_symbol: string;
  access_level: string;
  required_quantity: number;
}

export interface GatedAccess {
  access_id: string;
  rule_id: string;
  viewer_id: string;
  timestamp: string;
}
