
import { UploadItem } from '../../features/upload-sync/types';

export interface ProUploadItem extends UploadItem {
  dimensions: string;
  type: string;
  tags: string[];
  camera?: string;
  isSelected: boolean;
}

export const MOCK_PRO_UPLOAD_QUEUE: ProUploadItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `file_${i}`,
  name: `DSC0${8920 + i}.RAW`,
  size: `${(24 + Math.random() * 10).toFixed(1)} MB`,
  type: 'RAW',
  status: i < 4 ? 'completed' : i === 4 ? 'uploading' : 'waiting',
  progress: i < 4 ? 100 : i === 4 ? 45 : 0,
  previewUrl: `https://images.unsplash.com/photo-${[
    '1534528741775-53994a69daeb',
    '1544005313-94ddf0286df2',
    '1531746020798-e6953c6e8e04',
    '1550684848-fac1c5b4e853',
    '1620641788421-7a1c342ea42e'
  ][i % 5]}?auto=format&fit=crop&w=400&q=80`,
  dimensions: '6000x4000',
  camera: 'Sony A7III',
  tags: i % 3 === 0 ? ['Portrait'] : [],
  file: null,
  isSelected: false
}));

export const MOCK_ALBUM_SUGGESTIONS = [
  { id: 's1', name: 'Studio Portraits', count: 8, confidence: 92 },
  { id: 's2', name: 'Product Shots', count: 4, confidence: 85 },
];
