
export type BackgroundCategory = 'All' | 'Studio' | 'Product' | 'Aesthetic' | 'Neon' | 'Nature' | 'Abstract' | 'Trending' | 'New';

export interface BackgroundItem {
  id: string;
  src: string;
  title: string;
}

export interface BackgroundPack {
  id: string;
  title: string;
  description: string;
  category: BackgroundCategory;
  thumbnail: string;
  isPro: boolean;
  price?: number; // Credits
  count: number;
  items: BackgroundItem[];
}
