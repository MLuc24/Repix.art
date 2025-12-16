
import { BackgroundPack, BackgroundItem } from '../../features/backgrounds/types';

// Helper to generate items
const generateItems = (count: number, prefix: string): BackgroundItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}_item_${i}`,
    title: `${prefix} Background ${i + 1}`,
    src: `https://images.unsplash.com/photo-${[
      '1596461404969-9ae70f2830c1', 
      '1485846234645-a62644f84728',
      '1618517047929-4118d945ebc4',
      '1589365278144-830575ef4e30',
      '1554118811-1e0d58224f24',
      '1519501025264-65ba15a82390'
    ][i % 6]}?auto=format&fit=crop&w=400&q=80`
  }));
};

export const MOCK_PRO_BACKGROUND_PACKS: BackgroundPack[] = [
  // --- STUDIO ---
  {
    id: 'pk_studio_white',
    title: 'Clean White Studio',
    description: 'Perfect infinite white cyc walls for e-commerce.',
    category: 'Studio',
    thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80', // Vertical White Studio
    isPro: true,
    price: 2,
    count: 8,
    items: generateItems(8, 'Studio White')
  },
  {
    id: 'pk_studio_dark',
    title: 'Dark Moody Studio',
    description: 'Dramatic black and charcoal textures.',
    category: 'Studio',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80', // Vertical Dark Cinematic
    isPro: true,
    price: 2,
    count: 10,
    items: generateItems(10, 'Studio Dark')
  },

  // --- PRODUCT ---
  {
    id: 'pk_prod_marble',
    title: 'Luxury Marble',
    description: 'High-end stone surfaces for premium products.',
    category: 'Product',
    thumbnail: 'https://images.unsplash.com/photo-1618517047929-4118d945ebc4?auto=format&fit=crop&w=600&q=80', // Vertical Marble Texture
    isPro: true,
    price: 3,
    count: 12,
    items: generateItems(12, 'Marble')
  },
  {
    id: 'pk_prod_podium',
    title: '3D Podiums',
    description: 'Minimalist geometric shapes and pedestals.',
    category: 'Product',
    thumbnail: 'https://images.unsplash.com/photo-1589365278144-830575ef4e30?auto=format&fit=crop&w=600&q=80', // Vertical Podium
    isPro: true,
    price: 3,
    count: 8,
    items: generateItems(8, 'Podium')
  },

  // --- ENVIRONMENT ---
  {
    id: 'pk_env_cafe',
    title: 'Urban Cafe',
    description: 'Blurred coffee shops and warm interiors.',
    category: 'Neon', 
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', // Vertical Cafe
    isPro: true,
    price: 2,
    count: 6,
    items: generateItems(6, 'Cafe')
  },
  {
    id: 'pk_env_city',
    title: 'City Blur',
    description: 'Bokeh street lights and skylines.',
    category: 'Neon',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80', // Vertical City Night
    isPro: true,
    price: 2,
    count: 8,
    items: generateItems(8, 'City')
  },

  // --- CREATIVE ---
  {
    id: 'pk_create_grad',
    title: 'Abstract Gradient',
    description: 'Trendy colorful blurs and mesh gradients.',
    category: 'Abstract',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80', // Vertical Gradient
    isPro: false,
    price: 1,
    count: 15,
    items: generateItems(15, 'Gradient')
  },
  {
    id: 'pk_create_paper',
    title: 'Paper Texture',
    description: 'Ripped paper, collage styles, and grit.',
    category: 'Aesthetic',
    thumbnail: 'https://images.unsplash.com/photo-1605153862272-35222e80d3d3?auto=format&fit=crop&w=600&q=80', // Vertical Paper
    isPro: true,
    price: 2,
    count: 10,
    items: generateItems(10, 'Paper')
  }
];
