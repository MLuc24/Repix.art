
import { HistoryStep } from '../../features/history/types';

export const MOCK_HISTORY_STEPS: HistoryStep[] = [
  {
    id: 'step-0',
    action: 'upload',
    label: 'Original',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=50',
    timestamp: '10:00 AM',
    description: 'Initial Upload'
  },
  {
    id: 'step-1',
    action: 'enhance',
    label: 'Auto Enhance',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=55&sat=50',
    timestamp: '10:02 AM',
    description: 'AI Lighting Fix'
  },
  {
    id: 'step-2',
    action: 'filter',
    label: 'Vivid Filter',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=55&sat=80',
    timestamp: '10:03 AM',
    description: 'Applied Vivid Preset'
  },
  {
    id: 'step-3',
    action: 'adjust',
    label: 'Brightness',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=55&bri=20',
    timestamp: '10:05 AM',
    description: 'Exposure +15'
  },
  {
    id: 'step-4',
    action: 'crop',
    label: 'Crop 4:5',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60',
    timestamp: '10:06 AM',
    description: 'Social Media Ratio'
  },
  {
    id: 'step-5',
    action: 'remix',
    label: 'Cyberpunk',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=100&q=60',
    timestamp: '10:08 AM',
    description: 'AI Style Transfer'
  }
];
