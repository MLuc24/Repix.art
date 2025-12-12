
import { TemplatePack } from '../../features/templates/types';
import { MOCK_TEMPLATES } from './templates';

export const MOCK_TEMPLATE_PACKS: TemplatePack[] = [
  {
    id: 'pack-01',
    title: 'Influencer Essentials',
    description: 'Everything you need for a cohesive Instagram feed.',
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', // Vertical Fashion
    category: 'Social Media',
    tags: ['Trending'],
    tier: 'Pro',
    items: [MOCK_TEMPLATES[2], MOCK_TEMPLATES[6], MOCK_TEMPLATES[0]]
  },
  {
    id: 'pack-02',
    title: 'Cyberpunk UI Kit',
    description: 'Futuristic overlays and neon text effects.',
    thumbnail: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80', // Vertical Neon
    category: 'Aesthetic',
    tags: ['Trending'],
    tier: 'Pro',
    items: [MOCK_TEMPLATES[0], MOCK_TEMPLATES[5]]
  },
  {
    id: 'pack-03',
    title: 'E-Commerce Pro',
    description: 'High conversion product display templates.',
    thumbnail: 'https://images.unsplash.com/photo-1616401784845-180886ba9ca8?auto=format&fit=crop&w=600&q=80', // Vertical Product
    category: 'Product',
    tags: ['Business'],
    tier: 'Pro+',
    items: [MOCK_TEMPLATES[1], MOCK_TEMPLATES[4]]
  },
  {
    id: 'pack-04',
    title: 'Retro Film Series',
    description: 'Authentic 90s film grain and leak effects.',
    thumbnail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80', // Vertical Vintage
    category: 'Aesthetic',
    tags: ['New'],
    tier: 'Free',
    items: [MOCK_TEMPLATES[6]]
  },
  {
    id: 'pack-05',
    title: 'Corporate Branding',
    description: 'Professional headshots and business cards.',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', // Vertical Business
    category: 'Business',
    tags: ['Business'],
    tier: 'Pro',
    items: [MOCK_TEMPLATES[3], MOCK_TEMPLATES[7]]
  },
  {
    id: 'pack-06',
    title: 'Festival Posters',
    description: 'Vibrant layouts for events and music.',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', // Vertical Event
    category: 'Posters',
    tags: ['Social'],
    tier: 'Pro+',
    items: [MOCK_TEMPLATES[4]]
  },
  {
    id: 'pack-07',
    title: 'Minimalist Blog',
    description: 'Clean typography for writers.',
    thumbnail: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=600&q=80', // Vertical Book/Minimal
    category: 'Business',
    tags: ['New'],
    tier: 'Free',
    items: [MOCK_TEMPLATES[1]]
  },
  {
    id: 'pack-08',
    title: 'Urban Streetwear',
    description: 'Edgy fashion lookbook templates.',
    thumbnail: 'https://images.unsplash.com/photo-1523396870124-25b403019a73?auto=format&fit=crop&w=600&q=80', // Vertical Streetwear
    category: 'Social Media',
    tags: ['Trending', 'Social'],
    tier: 'Pro',
    items: [MOCK_TEMPLATES[2]]
  },
  {
    id: 'pack-09',
    title: 'Dark Mode App',
    description: 'Sleek dark UI presentation kits.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80', // Vertical Tech
    category: 'Aesthetic',
    tags: ['Business'],
    tier: 'Pro+',
    items: [MOCK_TEMPLATES[5]]
  },
  {
    id: 'pack-10',
    title: 'Nature Stories',
    description: 'Organic frames and earth tones.',
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80', // Vertical Nature
    category: 'Social Media',
    tags: ['New', 'Social'],
    tier: 'Free',
    items: [MOCK_TEMPLATES[6]]
  },
  {
    id: 'pack-11',
    title: 'Tech Startup',
    description: 'Pitch deck slides and headers.',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', // Vertical Workspace
    category: 'Business',
    tags: ['Business', 'Trending'],
    tier: 'Pro',
    items: [MOCK_TEMPLATES[3]]
  },
  {
    id: 'pack-12',
    title: 'Neon Nights',
    description: 'Club event flyers and posts.',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80', // Vertical Night
    category: 'Posters',
    tags: ['Social', 'Trending'],
    tier: 'Pro+',
    items: [MOCK_TEMPLATES[0]]
  },
  {
    id: 'pack-13',
    title: 'Fitness Coach',
    description: 'Workout plans and quote overlays.',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', // Vertical Gym
    category: 'Social Media',
    tags: ['New'],
    tier: 'Pro',
    items: [MOCK_TEMPLATES[4]]
  },
  {
    id: 'pack-14',
    title: 'Wedding Elegance',
    description: 'Soft whites and floral borders.',
    thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80', // Vertical Wedding
    category: 'Aesthetic',
    tags: ['New'],
    tier: 'Pro+',
    items: [MOCK_TEMPLATES[6]]
  },
  {
    id: 'pack-15',
    title: 'Gaming Stream',
    description: 'Twitch overlays and thumbnails.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', // Vertical Gaming
    category: 'Posters',
    tags: ['Trending'],
    tier: 'Free',
    items: [MOCK_TEMPLATES[0]]
  },
  {
    id: 'pack-16',
    title: 'Foodie Vibe',
    description: 'Delicious menu layouts.',
    thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80', // Vertical Food
    category: 'Business',
    tags: ['Social'],
    tier: 'Pro',
    items: [MOCK_TEMPLATES[1]]
  }
];
