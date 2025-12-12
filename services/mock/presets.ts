
import { Preset } from '../../features/presets/types';

export const MOCK_PRESETS: Preset[] = [
  {
    id: 'p1',
    name: 'Soft Skin Glow',
    category: 'Portrait',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60',
    isPro: true,
    isCustom: false,
    settings: { adjustments: true, filters: true, masks: true, remix: false },
    createdAt: '2024-01-01'
  },
  {
    id: 'p2',
    name: 'E-Comm White',
    category: 'Product',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=60',
    isPro: true,
    isCustom: false,
    settings: { adjustments: true, filters: false, masks: true, remix: false },
    createdAt: '2024-01-02'
  },
  {
    id: 'p3',
    name: 'Neon Cyber',
    category: 'Cinematic',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=200&q=60',
    isPro: true,
    isCustom: false,
    settings: { adjustments: true, filters: true, masks: false, remix: true },
    createdAt: '2024-01-03'
  },
  {
    id: 'p4',
    name: 'Moody Teal',
    category: 'Social',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=60',
    isPro: true,
    isCustom: false,
    settings: { adjustments: true, filters: true, masks: false, remix: false },
    createdAt: '2024-01-04'
  },
  {
    id: 'p5',
    name: 'My Signature',
    category: 'Custom',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
    isPro: true,
    isCustom: true,
    settings: { adjustments: true, filters: true, masks: true, remix: false },
    createdAt: '2024-10-24'
  }
];
