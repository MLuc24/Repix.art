
import { BackgroundPack } from '../../features/backgrounds/types';

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
    items: [
      { id: 'bg_sw_1', title: 'Pure White', src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80' },
      { id: 'bg_sw_2', title: 'Soft Grey Gradient', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
    ]
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
    items: [
      { id: 'bg_sd_1', title: 'Matte Black', src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' },
    ]
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
    items: [
      { id: 'bg_pm_1', title: 'Carrara White', src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' },
    ]
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
    items: [
      { id: 'bg_pp_1', title: 'Pink Cylinder', src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
    ]
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
    items: [
      { id: 'bg_ec_1', title: 'Window Seat', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
    ]
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
    items: [
      { id: 'bg_ect_1', title: 'Night Bokeh', src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80' },
    ]
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
    items: [
      { id: 'bg_cg_1', title: 'Aurora', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
    ]
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
    items: [
      { id: 'bg_cp_1', title: 'Kraft Paper', src: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?auto=format&fit=crop&w=800&q=80' },
    ]
  }
];
