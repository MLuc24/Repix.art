
import { BackgroundPack, BackgroundCategory, BackgroundItem } from '../../features/backgrounds/types';

// Simplified categories for new system
export const BACKGROUND_CATEGORIES: BackgroundCategory[] = [
  'All', 'Trending', 'New', 'Studio', 'Abstract'
];

// Helper to generate items
const generateItems = (count: number, prefix: string): BackgroundItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}_item_${i}`,
    title: `${prefix} Background ${i + 1}`,
    // Use random unsplash sig for variety, or reuse generic ones
    src: `https://images.unsplash.com/photo-${[
      '1550684848-fac1c5b4e853', 
      '1620641788421-7a1c342ea42e',
      '1531746020798-e6953c6e8e04',
      '1586023492125-27b2c045efd7',
      '1618005182384-a83a8bd57fbe',
      '1555529669-e69e7aa0ba9a'
    ][i % 6]}?auto=format&fit=crop&w=400&q=80`
  }));
};

export const MOCK_BACKGROUND_PACKS: BackgroundPack[] = [
  {
    id: 'pk_studio',
    title: 'Studio Soft Light',
    description: 'Professional lighting setups.',
    category: 'Studio',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    price: 3,
    count: 6,
    items: generateItems(6, 'Studio')
  },
  {
    id: 'pk_neon',
    title: 'Neon Cyber City',
    description: 'Futuristic glowing cityscapes.',
    category: 'Trending', // Changed to Trending
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    price: 3,
    count: 5,
    items: generateItems(5, 'Neon')
  },
  {
    id: 'pk_nature',
    title: 'Misty Nature',
    description: 'Calming forests and clouds.',
    category: 'New', // Changed to New
    thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    price: 0,
    count: 4,
    items: generateItems(4, 'Nature')
  },
  {
    id: 'pk_product',
    title: 'Product Podiums',
    description: '3D rendered podiums.',
    category: 'Trending', // Changed to Trending
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    price: 5,
    count: 8,
    items: generateItems(8, 'Product')
  },
  {
    id: 'pk_abstract',
    title: 'Liquid Abstract',
    description: 'Fluid shapes gradients.',
    category: 'Abstract',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    price: 0,
    count: 6,
    items: generateItems(6, 'Abstract')
  },
  {
    id: 'pk_aesthetic',
    title: 'Aesthetic Vibe',
    description: 'Trendy gradients.',
    category: 'New', // Changed to New
    thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    price: 0,
    count: 5,
    items: generateItems(5, 'Aesthetic')
  }
];
