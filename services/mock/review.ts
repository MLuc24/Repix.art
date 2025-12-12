
export interface ReviewComment {
  id: string;
  author: 'Freelancer' | 'Client';
  text: string;
  timestamp: string;
  assetId?: string; // If null, it's a project-level comment
}

export interface ReviewAsset {
  id: string;
  src: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  commentCount: number;
}

export interface ReviewSession {
  projectId: string;
  projectName: string;
  freelancerName: string;
  freelancerAvatar: string;
  status: 'In Review' | 'Approved' | 'Changes Requested';
  assets: ReviewAsset[];
  projectComments: ReviewComment[];
}

export const MOCK_REVIEW_SESSION: ReviewSession = {
  projectId: 'p1',
  projectName: 'Summer Campaign 2024',
  freelancerName: 'David Freelancer',
  freelancerAvatar: 'https://i.pravatar.cc/150?img=12',
  status: 'In Review',
  assets: [
    { id: 'a1', src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=90', name: 'Lookbook_01.jpg', status: 'approved', commentCount: 0 },
    { id: 'a2', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=90', name: 'Portrait_Main.jpg', status: 'pending', commentCount: 2 },
    { id: 'a3', src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=90', name: 'Social_Post.jpg', status: 'rejected', commentCount: 1 },
    { id: 'a4', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=90', name: 'Lookbook_02.jpg', status: 'pending', commentCount: 0 },
  ],
  projectComments: [
    { id: 'c1', author: 'Freelancer', text: 'Hi! Here is the first draft. Let me know what you think about the color grading.', timestamp: 'Yesterday' }
  ]
};

export const MOCK_ASSET_COMMENTS: Record<string, ReviewComment[]> = {
  'a2': [
    { id: 'ac1', author: 'Freelancer', text: 'I smoothed the skin texture here as requested.', timestamp: '10:00 AM' },
    { id: 'ac2', author: 'Client', text: 'Looks good, but can we brighten the eyes a bit more?', timestamp: '10:15 AM' },
  ],
  'a3': [
    { id: 'ac3', author: 'Client', text: 'The neon effect is too strong here. Tone it down.', timestamp: '11:00 AM' },
  ]
};
