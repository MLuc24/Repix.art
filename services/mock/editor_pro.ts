
export const PRO_FILTERS = [
  { id: 'pf1', name: 'Leica Film', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf2', name: 'Kodak Gold', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf3', name: 'Fuji Classic', src: 'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf4', name: 'Deep Matte', src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf5', name: 'Cinematic Blue', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf6', name: 'Cinematic Warm', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf7', name: 'Clean Portrait', src: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf8', name: 'HDR Boost', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf9', name: 'Soft Skin', src: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf10', name: 'Ultra Sharp', src: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf11', name: 'Vintage Fade', src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=60' },
  { id: 'pf12', name: 'Noir Pro', src: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=200&q=60' },
];

export const PRO_HISTORY_STEPS = Array.from({ length: 12 }).map((_, i) => ({
  id: `step-${i}`,
  action: i === 0 ? 'upload' : ['adjust', 'filter', 'mask', 'crop'][i % 4] as any,
  label: i === 0 ? 'Original' : `Step ${i}`,
  thumbnail: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&q=20`,
  timestamp: `10:${10 + i} AM`,
  description: i === 0 ? 'Import' : 'Modified parameters'
}));
