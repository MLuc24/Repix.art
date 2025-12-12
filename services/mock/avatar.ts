
import { AvatarStyle, AvatarResult } from '../../features/avatar/types';

export const AVATAR_STYLES: AvatarStyle[] = [
  {
    id: 'anime_girl',
    name: 'Anime Dream',
    description: 'Soft pastel anime style',
    preview: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&w=400&q=80',
    isPro: false,
    isNew: true
  },
  {
    id: 'kpop',
    name: 'K-Pop Idol',
    description: 'Flawless skin & trendy makeup',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    isPro: false
  },
  {
    id: 'cyber',
    name: 'Cyberpunk',
    description: 'Neon lights and futuristic tech',
    preview: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80',
    isPro: true
  },
  {
    id: 'disney',
    name: '3D Animation',
    description: 'Cute big eyes character',
    preview: 'https://images.unsplash.com/photo-1614726365723-49cfa0566738?auto=format&fit=crop&w=400&q=80',
    isPro: true
  },
  {
    id: 'painting',
    name: 'Oil Painting',
    description: 'Classic artistic stroke',
    preview: 'https://images.unsplash.com/photo-1578301978693-85ea9ec2a20c?auto=format&fit=crop&w=400&q=80',
    isPro: false
  },
  {
    id: 'mystic',
    name: 'Mystic Elf',
    description: 'Fantasy look with glow',
    preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isPro: true
  }
];

export const MOCK_AVATAR_RESULTS: AvatarResult[] = [
  { id: 'r1', src: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&w=600&q=80' },
  { id: 'r2', src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80' },
  { id: 'r3', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
  { id: 'r4', src: 'https://images.unsplash.com/photo-1578301978693-85ea9ec2a20c?auto=format&fit=crop&w=600&q=80' },
  { id: 'r5', src: 'https://images.unsplash.com/photo-1614726365723-49cfa0566738?auto=format&fit=crop&w=600&q=80' },
  { id: 'r6', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
];
