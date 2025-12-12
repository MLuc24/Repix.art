
export interface AvatarStyle {
  id: string;
  name: string;
  description: string;
  preview: string;
  isPro: boolean;
  isNew?: boolean;
}

export interface AvatarResult {
  id: string;
  src: string;
}

export interface UploadedPhoto {
  id: string;
  url: string;
}
