
export type AspectRatio = '1:1' | '3:4' | '4:3' | '16:9' | '9:16';

export interface GenModel {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPro: boolean;
  cost: number;
}

export interface GenResult {
  id: string;
  src: string;
  prompt: string;
  ratio: AspectRatio;
  createdAt: string;
}

export type GeneratorMode = 'text-to-image' | 'image-to-image';
