
import { SmartAlbum, SyncSession } from '../../features/upload-sync/types';

export const MOCK_SMART_ALBUMS: SmartAlbum[] = [
  {
    id: 'alb_1',
    title: 'Weekend Portrait',
    count: 12,
    previews: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=60'
    ],
    tag: 'AI Sorted',
    category: 'people'
  },
  {
    id: 'alb_2',
    title: 'City & Architecture',
    count: 8,
    previews: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=200&q=60'
    ],
    tag: 'Location Detect',
    category: 'places'
  },
  {
    id: 'alb_3',
    title: 'Product Shots',
    count: 15,
    previews: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=60'
    ],
    tag: 'Studio',
    category: 'objects'
  }
];

export const MOCK_SYNC_SESSIONS: SyncSession[] = [
  {
    id: 'sess_1',
    folderName: 'DCIM/Camera_01',
    path: '/Users/Alex/Pictures/DCIM...',
    photoCount: 124,
    date: '2 hours ago',
    status: 'synced'
  },
  {
    id: 'sess_2',
    folderName: 'Downloads/Edits',
    path: '/Users/Alex/Downloads...',
    photoCount: 45,
    date: '1 day ago',
    status: 'synced'
  }
];
