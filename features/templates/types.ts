
export type TemplateCategory = 'All' | 'Social Media' | 'Product' | 'Aesthetic' | 'Avatar' | 'Business' | 'Posters' | 'Trending' | 'New' | 'Social';

export interface Template {
  id: string;
  title: string;
  category: TemplateCategory;
  thumbnail: string;
  isPro: boolean;
  downloads: string; // e.g., "2k+"
  author: string;
}

export type PackTier = 'Free' | 'Pro' | 'Pro+'; // Pro+ is locked for Role 2

export interface TemplatePack {
  id: string;
  title: string;
  description: string;
  thumbnail: string; // Cover image for the pack card
  category: string; // e.g., 'Social Media', 'Product'
  tags: string[]; // ['neon', 'dark', 'portrait']
  tier: PackTier;
  items: Template[]; // Array of existing Template objects
}
