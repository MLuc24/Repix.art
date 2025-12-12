
import { GenModel } from '../../features/generator/types';

export const MOCK_MODELS: GenModel[] = [
  {
    id: 'realphoto-v3',
    name: 'RealPhoto V3',
    description: 'High-end photorealism with perfect lighting. (Pro)',
    thumbnail: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=400&q=80',
    isPro: true,
    cost: 3
  },
  {
    id: 'hyperdetail-pro',
    name: 'HyperDetail Pro',
    description: 'Extreme texture and sharpness for 8k displays. (Pro)',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    isPro: true,
    cost: 3
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana Pro',
    description: "(a.k.a Nano Banana 2) Google's new state-of-the-art image generation.",
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=400&q=80', // Spiderman/Action figure vibe
    isPro: true,
    cost: 3
  },
  {
    id: 'veo-3',
    name: 'Veo 3.1',
    description: 'Create cinematic ads or stories from a single prompt, faster and better.',
    thumbnail: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=400&q=80', // Cinematic Watch/Product
    isPro: true,
    cost: 5
  },
  {
    id: 'sora-2',
    name: 'Sora 2',
    description: 'Excels at creating ad videos for any scenario from lifestyle to cinematic.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80', // Cinematic Movie Scene
    isPro: true,
    cost: 5
  },
  {
    id: 'wan-2.5',
    name: 'Wan 2.5',
    description: 'Produces high-quality, detailed images with natural style and fast rendering.',
    thumbnail: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=400&q=80', // Abstract 3D Face
    isPro: false,
    cost: 1
  },
  {
    id: 'seedance',
    name: 'Seedance 1.0',
    description: 'Excels at dynamic visuals, ideal for music video generation.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', // Retro Gaming/Neon
    isPro: true,
    cost: 2
  },
  {
    id: 'repix-basic',
    name: 'Repix Basic',
    description: 'Standard fast image generation for everyday use.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', // Abstract Liquid
    isPro: false,
    cost: 1
  }
];

export const MOCK_INSPIRATION_PROMPTS = [
  "A futuristic city with neon lights and flying cars, cyberpunk style",
  "A cute robot gardening in a greenhouse, detailed 3d render",
  "Portrait of a warrior princess, oil painting style, golden light",
  "Minimalist logo design of a mountain, vector art"
];
