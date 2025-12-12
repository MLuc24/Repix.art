
import { FeedItem, SavedCollection } from '../../features/feed/types';

export const MOCK_SAVED_COLLECTIONS: SavedCollection[] = [
  { id: 'c1', name: 'Cyberpunk References', count: 12, thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=100&q=60' },
  { id: 'c2', name: 'Product Backgrounds', count: 8, thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=100&q=60' },
  { id: 'c3', name: 'Portrait Styles', count: 24, thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60' },
];

export const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: 'f1',
    type: 'remix',
    title: 'Cinematic Noir Portrait',
    subtitle: 'Transform day shots into moody B&W masterpieces.',
    thumbnails: [
      'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
    ],
    author: { name: 'Repix Studio', avatar: 'https://i.pravatar.cc/150?img=1' },
    badges: ['Trending', 'Pro'],
    creditCost: 2,
    targetRoute: 'generator',
    targetParams: {
      mode: 'image-to-image',
      prompt: 'Cinematic film noir style, high contrast black and white, moody lighting, 8k resolution',
      modelId: 'realphoto-v3'
    }
  },
  {
    id: 'f2',
    type: 'batch',
    title: 'E-Commerce Batch Pack',
    subtitle: 'Generate clean white backgrounds for 4 products at once.',
    thumbnails: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    ],
    badges: ['Batch', 'Time Saver'],
    creditCost: 4,
    targetRoute: 'generator',
    targetParams: {
      mode: 'image-to-image',
      prompt: 'Professional product photography, clean white studio background, soft lighting',
      modelId: 'hyperdetail-pro'
    }
  },
  {
    id: 'f3',
    type: 'model',
    title: 'Try Veo 3.1 Video',
    subtitle: 'Create 5s looping motion backgrounds for social.',
    thumbnails: [
      'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80'
    ],
    badges: ['New', 'Video'],
    creditCost: 5,
    targetRoute: 'generator',
    targetParams: {
      mode: 'text-to-image', // Simulator for video prompt
      prompt: 'Cinematic slow motion product shot of a luxury watch, sparks flying, dark background',
      modelId: 'veo-3'
    }
  },
  {
    id: 'f4',
    type: 'style',
    title: 'Neon Tokyo Vibes',
    subtitle: 'Apply aggressive purple & teal color grading.',
    thumbnails: [
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1581822261290-991b732853fe?auto=format&fit=crop&w=200&q=60',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=200&q=60'
    ],
    author: { name: 'Community', avatar: 'https://i.pravatar.cc/150?img=8' },
    badges: ['Popular'],
    creditCost: 1,
    targetRoute: 'editor', // Goes to editor for filters
    targetParams: {
      modelId: 'pk_cyber'
    }
  }
];
