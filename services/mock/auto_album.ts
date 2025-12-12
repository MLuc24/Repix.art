
import { ProAlbum, FaceGroup } from '../../features/auto-album/types';

export const MOCK_FACES: FaceGroup[] = [
  { id: 'f1', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', count: 42 },
  { id: 'f2', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', count: 28 },
  { id: 'f3', name: 'Emma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', count: 15 },
  { id: 'f4', name: 'David', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', count: 12 },
  { id: 'f5', name: 'Unknown #1', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', count: 8 },
];

const PHOTOS_POOL = [
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1595856755676-e4136934c28f?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=300&q=80'
];

export const MOCK_PRO_ALBUMS: ProAlbum[] = [
  {
    id: 'alb_1',
    title: 'Studio Session: Sarah',
    date: 'Oct 24, 2024',
    coverImages: PHOTOS_POOL.slice(0, 4),
    count: 42,
    type: 'Face',
    faces: [MOCK_FACES[0].avatar],
    isRefined: true,
    qualityScore: 5,
    photos: Array.from({ length: 42 }).map((_, i) => ({ id: `p_${i}`, src: PHOTOS_POOL[i % 6] }))
  },
  {
    id: 'alb_2',
    title: 'Kyoto Trip',
    date: 'Oct 12, 2024',
    coverImages: [PHOTOS_POOL[4], PHOTOS_POOL[5], PHOTOS_POOL[0], PHOTOS_POOL[1]],
    count: 128,
    type: 'Location',
    location: 'Kyoto, Japan',
    isRefined: false,
    qualityScore: 4,
    photos: Array.from({ length: 12 }).map((_, i) => ({ id: `p2_${i}`, src: PHOTOS_POOL[i % 6] }))
  },
  {
    id: 'alb_3',
    title: 'Product: Watches',
    date: 'Sep 30, 2024',
    coverImages: [PHOTOS_POOL[2], PHOTOS_POOL[3], PHOTOS_POOL[1], PHOTOS_POOL[0]],
    count: 56,
    type: 'Concept',
    concept: 'Product / Macro',
    isRefined: false,
    qualityScore: 3,
    photos: Array.from({ length: 8 }).map((_, i) => ({ id: `p3_${i}`, src: PHOTOS_POOL[i % 6] }))
  },
  {
    id: 'alb_4',
    title: 'Weekend Party',
    date: 'Sep 28, 2024',
    coverImages: [PHOTOS_POOL[5], PHOTOS_POOL[0], PHOTOS_POOL[2], PHOTOS_POOL[4]],
    count: 210,
    type: 'Face',
    faces: [MOCK_FACES[1].avatar, MOCK_FACES[2].avatar, MOCK_FACES[3].avatar],
    isRefined: false,
    qualityScore: 2,
    photos: Array.from({ length: 20 }).map((_, i) => ({ id: `p4_${i}`, src: PHOTOS_POOL[i % 6] }))
  }
];
