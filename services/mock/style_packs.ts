
import { StylePack } from '../../features/style-packs/types';

export const MOCK_STYLE_PACKS: StylePack[] = [
  // --- CAMERA ---
  {
    id: 'pk_leica',
    name: 'Leica Film',
    description: 'Iconic high-contrast B&W and soft matte colors.',
    category: 'Camera',
    previewCover: 'https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&w=400&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=200&q=60',
    ],
    price: 3,
    isPro: true,
    presetsCount: 4
  },
  {
    id: 'pk_fuji',
    name: 'FujiFilm Pro',
    description: 'Classic greens and vibrant skin tones.',
    category: 'Camera',
    previewCover: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60'],
    price: 2,
    isPro: true,
    presetsCount: 5
  },
  {
    id: 'pk_kodak',
    name: 'Kodak Portra',
    description: 'Warm, nostalgic grain and gold hues.',
    category: 'Camera',
    previewCover: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60'],
    price: 2,
    isPro: true,
    presetsCount: 4
  },
  {
    id: 'pk_cine_cam',
    name: 'Cinematic Camera',
    description: 'Anamorphic lens flares and teal shadows.',
    category: 'Camera',
    previewCover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=60'],
    price: 3,
    isPro: true,
    presetsCount: 5
  },

  // --- CREATIVE ---
  {
    id: 'pk_pastel',
    name: 'Pastel Aesthetic',
    description: 'Dreamy, washed-out colors for social.',
    category: 'Creative',
    previewCover: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=200&q=60'],
    price: 1,
    isPro: true,
    presetsCount: 4
  },
  {
    id: 'pk_cyber',
    name: 'Cyberpunk Neon',
    description: 'Heavy saturation and night glows.',
    category: 'Creative',
    previewCover: 'https://images.unsplash.com/photo-1581822261290-991b732853fe?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=200&q=60'],
    price: 2,
    isPro: true,
    presetsCount: 5
  },
  {
    id: 'pk_vintage',
    name: 'Vintage Matte',
    description: 'Faded blacks and retro vibes.',
    category: 'Creative',
    previewCover: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=200&q=60'],
    price: 1,
    isPro: true,
    presetsCount: 3
  },
  {
    id: 'pk_clean',
    name: 'Clean Product',
    description: 'Bright whites and high contrast.',
    category: 'Creative',
    previewCover: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=60'],
    price: 2,
    isPro: true,
    presetsCount: 4
  },

  // --- PORTRAIT ---
  {
    id: 'pk_skin',
    name: 'Skin Glow',
    description: 'Natural radiance and even tones.',
    category: 'Portrait',
    previewCover: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=60'],
    price: 2,
    isPro: true,
    presetsCount: 3
  },
  {
    id: 'pk_beauty',
    name: 'Beauty Soft',
    description: 'Magazine quality smoothing.',
    category: 'Portrait',
    previewCover: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=60'],
    price: 2,
    isPro: true,
    presetsCount: 4
  },
  {
    id: 'pk_cine_port',
    name: 'Cinematic Portrait',
    description: 'Moody lighting for faces.',
    category: 'Portrait',
    previewCover: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60'],
    price: 3,
    isPro: true,
    presetsCount: 5
  },
  {
    id: 'pk_retouch',
    name: 'Ultra Retouch',
    description: 'Automated high-end frequency separation.',
    category: 'Portrait',
    previewCover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    previewImages: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60'],
    price: 3,
    isPro: true,
    presetsCount: 3
  }
];
