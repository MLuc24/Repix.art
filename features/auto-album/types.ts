
export type ClusterType = 'Face' | 'Location' | 'Concept' | 'Date';

export interface FaceGroup {
  id: string;
  name: string;
  avatar: string;
  count: number;
}

export interface PhotoItem {
  id: string;
  src: string;
  isBestShot?: boolean;
  isBlurry?: boolean;
}

export interface ProAlbum {
  id: string;
  title: string;
  date: string;
  coverImages: string[]; // Array of 4 images for the grid
  count: number;
  type: ClusterType;
  
  // Metadata
  location?: string;
  faces?: string[]; // Array of FaceGroup IDs or avatar URLs
  concept?: string;
  
  // State
  isRefined: boolean; // True if user paid for AI Refinement
  qualityScore: number; // 1-5 stars
  
  photos: PhotoItem[]; // Mock content
}
