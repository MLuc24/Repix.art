
export type UploadStatus = 'waiting' | 'uploading' | 'completed' | 'error';

export interface UploadItem {
  id: string;
  file: File | null; // Null for mock items
  previewUrl: string;
  name: string;
  size: string;
  status: UploadStatus;
  progress: number;
}

export interface SmartAlbum {
  id: string;
  title: string;
  count: number;
  previews: string[]; // Array of 3 URLs for collage
  tag: string; // e.g., "AI Sorted"
  category: 'people' | 'places' | 'objects' | 'events';
}

export interface SyncSession {
  id: string;
  folderName: string;
  path: string;
  photoCount: number;
  date: string;
  status: 'synced' | 'pending';
}
