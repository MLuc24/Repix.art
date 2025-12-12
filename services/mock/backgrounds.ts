
import { BackgroundPack, BackgroundCategory } from '../../features/backgrounds/types';

// Simplified categories for new system
export const BACKGROUND_CATEGORIES: BackgroundCategory[] = [
  'All', 'Trending', 'New', 'Studio', 'Abstract'
];

export const MOCK_BACKGROUND_PACKS: BackgroundPack[] = [
  {
    id: 'pk_studio',
    title: 'Studio Soft Light',
    description: 'Professional lighting setups.',
    category: 'Studio',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    price: 3,
    count: 20,
    items: []
  },
  {
    id: 'pk_neon',
    title: 'Neon Cyber City',
    description: 'Futuristic glowing cityscapes.',
    category: 'Trending', // Changed to Trending
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    price: 3,
    count: 15,
    items: []
  },
  {
    id: 'pk_nature',
    title: 'Misty Nature',
    description: 'Calming forests and clouds.',
    category: 'New', // Changed to New
    thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    price: 0,
    count: 12,
    items: []
  },
  {
    id: 'pk_product',
    title: 'Product Podiums',
    description: '3D rendered podiums.',
    category: 'Trending', // Changed to Trending
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    price: 5,
    count: 25,
    items: []
  },
  {
    id: 'pk_abstract',
    title: 'Liquid Abstract',
    description: 'Fluid shapes gradients.',
    category: 'Abstract',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    price: 0,
    count: 10,
    items: []
  },
  {
    id: 'pk_aesthetic',
    title: 'Aesthetic Vibe',
    description: 'Trendy gradients.',
    category: 'New', // Changed to New
    thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    price: 0,
    count: 18,
    items: []
  }
];
