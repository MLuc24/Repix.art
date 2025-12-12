
import { ExportHistoryItem } from '../../features/export/types';

export const MOCK_EXPORT_HISTORY: ExportHistoryItem[] = [
  {
    id: 'ex-1',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
    filename: 'Portrait_Edit_Final.jpg',
    format: 'JPG',
    size: '1x',
    date: '2 mins ago'
  },
  {
    id: 'ex-2',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=200&q=60',
    filename: 'Cyberpunk_Remix.png',
    format: 'PNG',
    size: '2x',
    date: '1 day ago'
  },
  {
    id: 'ex-3',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60',
    filename: 'Summer_Vibe.webp',
    format: 'WEBP',
    size: '1x',
    date: '3 days ago'
  }
];
