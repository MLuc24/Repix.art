
export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Completed';
  createdAt: string;
  thumbnail?: string;
  description?: string; // New field
  creditsUsed?: number; // New field
}

export interface ProjectAsset {
  id: string;
  src: string;
  type: 'upload' | 'generated' | 'remix';
  name: string;
  createdAt: string;
}

export type TimelineEventType = 'milestone' | 'status_change' | 'upload' | 'generation' | 'delivery';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  timestamp: string;
  actor: string; // "You", "Client", or "System"
}

export interface ProjectStats {
  rounds: number;
  timeToApprove: string; // e.g., "2 days"
  totalImages: number;
  creditsUsed: number;
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Alice Marketing',
    email: 'alice@agency.com',
    company: 'Creative Ag.',
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    id: 'c2',
    name: 'TechStart Inc',
    email: 'bob@techstart.io',
    company: 'TechStart',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: 'c3',
    name: 'Vogue Daily',
    email: 'editor@vogue.mock',
    company: 'Fashion Mag',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Summer Campaign 2024',
    clientId: 'c1',
    status: 'In Review',
    createdAt: '2024-10-20',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
    description: 'Vibrant visuals for the upcoming summer clothing line. Focus on warm tones and beach vibes.',
    creditsUsed: 12
  },
  {
    id: 'p2',
    name: 'App Icons Redesign',
    clientId: 'c2',
    status: 'Draft',
    createdAt: '2024-10-22',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80',
    description: 'Modern glassmorphism icons for the new iOS update.',
    creditsUsed: 4
  },
  {
    id: 'p3',
    name: 'Editorial Cover',
    clientId: 'c3',
    status: 'Approved',
    createdAt: '2024-10-15',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    description: 'High fashion portrait retouching. Clean skin, moody lighting.',
    creditsUsed: 28
  }
];

export const MOCK_PROJECT_ASSETS: ProjectAsset[] = [
  { id: 'a1', src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80', type: 'upload', name: 'Raw_Shoot_01.jpg', createdAt: '2024-10-20' },
  { id: 'a2', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', type: 'generated', name: 'AI_Var_02.png', createdAt: '2024-10-21' },
  { id: 'a3', src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80', type: 'remix', name: 'Neon_Edit_Final.jpg', createdAt: '2024-10-22' },
  { id: 'a4', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', type: 'upload', name: 'Raw_Shoot_02.jpg', createdAt: '2024-10-20' },
  { id: 'a5', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', type: 'generated', name: 'Background_Ref.png', createdAt: '2024-10-21' },
];

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 'e1', type: 'status_change', title: 'Status changed to In Review', description: 'Submitted 5 assets for feedback', timestamp: 'Today, 10:30 AM', actor: 'You' },
  { id: 'e2', type: 'generation', title: 'Generated 3 variations', description: 'Used model RealPhoto V3', timestamp: 'Today, 09:15 AM', actor: 'You' },
  { id: 'e3', type: 'upload', title: 'Uploaded 2 raw files', description: 'Source material from client', timestamp: 'Yesterday, 4:00 PM', actor: 'You' },
  { id: 'e4', type: 'status_change', title: 'Project moved to Draft', description: 'Initial setup', timestamp: 'Oct 20, 2:00 PM', actor: 'System' },
  { id: 'e5', type: 'milestone', title: 'Project Created', timestamp: 'Oct 20, 2:00 PM', actor: 'You' },
];

export const MOCK_PROJECT_STATS: ProjectStats = {
  rounds: 2,
  timeToApprove: 'Pending',
  totalImages: 12,
  creditsUsed: 12
};
