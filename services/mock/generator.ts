
import { GenModel } from '../../features/generator/types';

export const MOCK_MODELS: GenModel[] = [
  {
    id: 'midjourney-v6',
    name: 'Midjourney v6.1',
    description: 'The gold standard for artistic and photorealistic image generation.',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80', // Artistic/Fantasy
    isPro: true,
    cost: 4
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: 'Exceptional prompt adherence and creative text rendering.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', // Abstract/Surreal
    isPro: true,
    cost: 4
  },
  {
    id: 'sd-3.5',
    name: 'Stable Diffusion 3.5',
    description: 'Versatile, high-performance model with excellent control.',
    thumbnail: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=400&q=80', // Cyberpunk/Neon
    isPro: false,
    cost: 2
  },
  {
    id: 'flux-1',
    name: 'Flux.1 Pro',
    description: 'State-of-the-art realism and prompt fidelity.',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80', // Urban/City Realism
    isPro: true,
    cost: 3
  },
  {
    id: 'imagen-3',
    name: 'Imagen 3',
    description: "Google's latest photorealistic model with high detail.",
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80', // Landscape High Detail
    isPro: true,
    cost: 3
  },
  {
    id: 'leonardo-phoenix',
    name: 'Leonardo Phoenix',
    description: 'Optimized for creative assets and game concept art.',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', // Cyberpunk/Neon/Game Art
    isPro: true,
    cost: 3
  }
];

export const MOCK_INSPIRATION_PROMPTS = [
  "A futuristic city with neon lights and flying cars, cyberpunk style",
  "A cute robot gardening in a greenhouse, detailed 3d render",
  "Portrait of a warrior princess, oil painting style, golden light",
  "Minimalist logo design of a mountain, vector art"
];
