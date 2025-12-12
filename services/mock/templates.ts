
import { Template } from '../../features/templates/types';

// Simplified for new system
export const TEMPLATE_CATEGORIES = [
  'All', 'Trending', 'New', 'Social', 'Business', 'Aesthetic', 'Posters'
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 't1',
    title: 'Neon Cyberpunk',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '12k',
    author: 'Repix Studio'
  },
  {
    id: 't2',
    title: 'Minimalist Product',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '8.5k',
    author: 'Sarah Design'
  },
  {
    id: 't3',
    title: 'Insta Story Vibe',
    category: 'Social',
    thumbnail: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '45k',
    author: 'Influencer Kit'
  },
  {
    id: 't4',
    title: 'Corporate Headshot',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '3k',
    author: 'ProCorp'
  },
  {
    id: 't5',
    title: 'Summer Sale Poster',
    category: 'New',
    thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '1.2k',
    author: 'Creative Market'
  },
  {
    id: 't6',
    title: 'Glassmorphism UI',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '9k',
    author: 'UI Master'
  },
  {
    id: 't7',
    title: 'Vintage Film',
    category: 'New',
    thumbnail: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '22k',
    author: 'Retro Labs'
  },
  {
    id: 't8',
    title: 'Coffee Brand ID',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '4.1k',
    author: 'BrandFlow'
  },
  // --- NEW ITEMS ---
  {
    id: 't9',
    title: 'Fashion Lookbook',
    category: 'Aesthetic',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '15k',
    author: 'Vogue AI'
  },
  {
    id: 't10',
    title: 'Music Festival',
    category: 'Posters',
    thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '8k',
    author: 'SoundWave'
  },
  {
    id: 't11',
    title: 'Abstract Art',
    category: 'Aesthetic',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '5k',
    author: 'Modernist'
  },
  {
    id: 't12',
    title: 'Travel Diary',
    category: 'Social',
    thumbnail: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '30k',
    author: 'Wanderlust'
  },
  {
    id: 't13',
    title: 'Gym Motivation',
    category: 'Posters',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '10k',
    author: 'FitLife'
  },
  {
    id: 't14',
    title: 'Dark Academia',
    category: 'Aesthetic',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '18k',
    author: 'Scholar'
  },
  {
    id: 't15',
    title: 'Tech Review',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '7k',
    author: 'GadgetPro'
  },
  {
    id: 't16',
    title: 'Floral Wedding',
    category: 'Social',
    thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '25k',
    author: 'Bridal'
  },
  {
    id: 't17',
    title: 'Street Style',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '11k',
    author: 'Urban'
  },
  {
    id: 't18',
    title: 'Food Menu',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
    isPro: true,
    downloads: '6k',
    author: 'ChefTable'
  },
  {
    id: 't19',
    title: 'Podcast Cover',
    category: 'New',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '14k',
    author: 'AudioVis'
  },
  {
    id: 't20',
    title: 'Nature Calm',
    category: 'Aesthetic',
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80',
    isPro: false,
    downloads: '40k',
    author: 'EcoVibe'
  }
];
