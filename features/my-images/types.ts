
export type AssetSource = 'upload' | 'generated' | 'remix' | 'export';

export interface AssetMeta {
  width: number;
  height: number;
  size?: string;
  model?: string; // If generated
  credits?: number; // Cost to create
}

export interface AssetItem {
  id: string;
  title: string;
  src: string;
  source: AssetSource;
  createdAt: string;
  folderId?: string;
  isPro?: boolean; // If high res or pro model
  meta: AssetMeta;
}

export interface AssetFolder {
  id: string;
  name: string;
  icon: 'folder' | 'heart' | 'star' | 'image' | 'user';
  count: number;
}
