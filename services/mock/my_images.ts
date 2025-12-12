
import { AssetItem, AssetFolder } from '../../features/my-images/types';

export const MOCK_FOLDERS: AssetFolder[] = [
  { id: 'f_fav', name: 'Favorites', icon: 'heart', count: 12 },
  { id: 'f_client', name: 'Client: Nike', icon: 'folder', count: 45 },
  { id: 'f_social', name: 'Social Posts', icon: 'folder', count: 28 },
  { id: 'f_ideas', name: 'Inspiration', icon: 'star', count: 8 },
];

export const MOCK_ASSETS: AssetItem[] = [
  {
    id: 'a1',
    title: 'Cyberpunk Portrait',
    src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    source: 'generated',
    createdAt: '2024-10-24T10:00:00Z',
    isPro: true,
    meta: { width: 1024, height: 1024, model: 'RealPhoto V3', credits: 3 }
  },
  {
    id: 'a2',
    title: 'Product Shoot Raw',
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    source: 'upload',
    createdAt: '2024-10-23T14:30:00Z',
    folderId: 'f_client',
    meta: { width: 4000, height: 6000, size: '24MB' }
  },
  {
    id: 'a3',
    title: 'Neon Remix V2',
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
    source: 'remix',
    createdAt: '2024-10-22T09:15:00Z',
    meta: { width: 1080, height: 1350, credits: 1 }
  },
  {
    id: 'a4',
    title: 'Final Export 4K',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    source: 'export',
    createdAt: '2024-10-21T18:20:00Z',
    isPro: true,
    meta: { width: 3840, height: 2160, size: '8.2MB' }
  },
  {
    id: 'a5',
    title: 'Studio Setup',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    source: 'upload',
    createdAt: '2024-10-20T11:00:00Z',
    folderId: 'f_fav',
    meta: { width: 2000, height: 2500, size: '4.1MB' }
  },
  {
    id: 'a6',
    title: 'Abstract Background',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    source: 'generated',
    createdAt: '2024-10-20T10:05:00Z',
    meta: { width: 1920, height: 1080, model: 'Nano Banana' }
  }
];
