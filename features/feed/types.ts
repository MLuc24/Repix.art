
export type FeedItemType = 'remix' | 'style' | 'model' | 'batch' | 'prompt';

export interface FeedItem {
  id: string;
  type: FeedItemType;
  title: string;
  subtitle: string;
  thumbnails: string[]; // 1 or 3 URLs
  author?: {
    name: string;
    avatar: string;
  };
  badges?: string[]; // ['Pro', 'New', 'Trending']
  creditCost?: number;
  
  // Navigation Params (Mock)
  targetRoute: 'generator' | 'editor';
  targetParams?: {
    mode?: 'text-to-image' | 'image-to-image';
    prompt?: string;
    modelId?: string;
  };
}

export interface SavedCollection {
  id: string;
  name: string;
  count: number;
  thumbnail: string;
}
