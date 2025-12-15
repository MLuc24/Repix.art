
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
    folderId: 'f_ideas',
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
    folderId: 'f_social',
    meta: { width: 1080, height: 1350, credits: 1 }
  },
  {
    id: 'a4',
    title: 'Final Export 4K',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    source: 'export',
    createdAt: '2024-10-21T18:20:00Z',
    folderId: 'f_client',
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
    folderId: 'f_ideas',
    meta: { width: 1920, height: 1080, model: 'Nano Banana' }
  },
  {
    id: 'a7',
    title: 'Neon Tokyo',
    src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80',
    source: 'generated',
    createdAt: '2024-10-19T22:00:00Z',
    folderId: 'f_ideas',
    meta: { width: 1080, height: 1080, model: 'RealPhoto V3' }
  },
  {
    id: 'a8',
    title: 'Retro Car',
    src: 'https://images.unsplash.com/photo-1532581140115-ca4d4e1a0c53?auto=format&fit=crop&w=600&q=80',
    source: 'upload',
    createdAt: '2024-10-19T14:20:00Z',
    folderId: 'f_client',
    meta: { width: 4000, height: 3000, size: '5.6MB' }
  },
  {
    id: 'a9',
    title: 'Futuristic City',
    src: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80',
    source: 'remix',
    createdAt: '2024-10-18T09:30:00Z',
    folderId: 'f_fav',
    meta: { width: 1920, height: 1080, credits: 2 }
  },
  {
    id: 'a10',
    title: 'Fashion Editorial',
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    source: 'upload',
    createdAt: '2024-10-18T08:15:00Z',
    folderId: 'f_client',
    meta: { width: 2500, height: 3500, size: '12MB' }
  },
  {
    id: 'a11',
    title: 'Minimalist Interior',
    src: 'https://images.unsplash.com/photo-1517705008128-1619102c638e?auto=format&fit=crop&w=600&q=80',
    source: 'generated',
    createdAt: '2024-10-17T16:45:00Z',
    folderId: 'f_ideas',
    meta: { width: 1200, height: 1200, model: 'ArchViz Beta' }
  },
  {
    id: 'a12',
    title: 'Mountain Landscape',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    source: 'export',
    createdAt: '2024-10-16T12:00:00Z',
    folderId: 'f_social',
    meta: { width: 3840, height: 2160, size: '4.5MB' }
  },
  {
    id: 'a13',
    title: 'Urban Street',
    src: 'https://images.unsplash.com/photo-1476900966801-4809813d13ea?auto=format&fit=crop&w=600&q=80',
    source: 'upload',
    createdAt: '2024-10-16T10:10:00Z',
    folderId: 'f_fav',
    meta: { width: 2800, height: 2100, size: '3.2MB' }
  },
  {
    id: 'a14',
    title: 'Abstract Fluid',
    src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    source: 'generated',
    createdAt: '2024-10-15T19:20:00Z',
    folderId: 'f_ideas',
    meta: { width: 1500, height: 1500, model: 'Fluid Sim' }
  },
  {
    id: 'a15',
    title: 'Coffee Shop Vibe',
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    source: 'upload',
    createdAt: '2024-10-15T08:30:00Z',
    folderId: 'f_social',
    meta: { width: 1080, height: 1350, credits: 1 }
  }
];
