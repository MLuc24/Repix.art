
export interface StylePack {
  id: string;
  name: string;
  description: string;
  category: 'Camera' | 'Creative' | 'Portrait';
  previewCover: string;
  previewImages: string[]; // 4-6 images for hover preview
  price: number;
  isPro: boolean;
  presetsCount: number;
}
