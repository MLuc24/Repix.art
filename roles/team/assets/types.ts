
export type AssetSource = 'upload' | 'generated' | 'remix' | 'export';

export interface AssetMeta {
    width: number;
    height: number;
    size: string;
    model?: string; // AI model used if generated
    credits?: number; // Cost to create
}

export interface TeamAssetItem {
    id: string;
    title: string;
    src: string;
    source: AssetSource;
    createdAt: string;
    folderId?: string;
    ownerString: string; // e.g., "Sarah K."
    ownerAvatar?: string;
    isPro?: boolean; // If high res or pro model
    isShared?: boolean; // If shared to team (false = personal)
    meta: AssetMeta;
}

export interface AssetFolder {
    id: string;
    name: string;
    icon: 'folder' | 'heart' | 'star' | 'image' | 'user';
    count: number;
    isShared?: boolean; // If shared folder (false = personal)
}

// Team Shared Assets (isShared: true)
export const MOCK_TEAM_ASSETS: TeamAssetItem[] = [
    {
        id: 't1',
        title: 'Q3 Campaign Hero',
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'upload',
        createdAt: '2023-10-15T10:00:00Z',
        ownerString: 'Sarah K.',
        isShared: true,
        meta: { width: 1920, height: 1080, size: '2.4MB' }
    },
    {
        id: 't2',
        title: 'Product Shot v2',
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'generated',
        createdAt: '2023-10-16T14:30:00Z',
        ownerString: 'Mike R.',
        isPro: true,
        isShared: true,
        meta: { width: 1024, height: 1024, size: '1.1MB', model: 'SDXL 1.0', credits: 5 }
    },
    {
        id: 't3',
        title: 'Logo Color Variant',
        src: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'remix',
        createdAt: '2023-10-17T09:15:00Z',
        ownerString: 'Sarah K.',
        folderId: 'f1',
        isShared: true,
        meta: { width: 500, height: 500, size: '0.5MB', credits: 2 }
    },
    {
        id: 't4',
        title: 'Office Vibes',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'upload',
        createdAt: '2023-11-01T08:00:00Z',
        ownerString: 'Alex T.',
        folderId: 'f1',
        isShared: true,
        meta: { width: 2000, height: 1333, size: '3.2MB' }
    },
    {
        id: 't5',
        title: 'Neon Concept',
        src: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'generated',
        createdAt: '2023-11-02T16:20:00Z',
        ownerString: 'Mike R.',
        isShared: true,
        meta: { width: 1024, height: 1024, size: '1.4MB', model: 'DALL-E 3', credits: 4 }
    },
    // Personal Assets (isShared: false - current user)
    {
        id: 'p1',
        title: 'My Draft Design',
        src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'generated',
        createdAt: '2023-11-10T15:00:00Z',
        ownerString: 'Me',
        isShared: false,
        isPro: true,
        meta: { width: 1024, height: 1024, size: '1.2MB', model: 'SDXL 1.0', credits: 5 }
    },
    {
        id: 'p2',
        title: 'Personal Photo',
        src: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'upload',
        createdAt: '2023-11-12T09:30:00Z',
        ownerString: 'Me',
        isShared: false,
        meta: { width: 1600, height: 1200, size: '2.1MB' }
    },
    {
        id: 'p3',
        title: 'Exported Result',
        src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'export',
        createdAt: '2023-11-14T11:45:00Z',
        ownerString: 'Me',
        isShared: false,
        meta: { width: 2048, height: 2048, size: '3.5MB' }
    },
    {
        id: 'p4',
        title: 'Quick Remix Test',
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'remix',
        createdAt: '2023-11-15T14:20:00Z',
        ownerString: 'Me',
        isShared: false,
        folderId: 'pf1',
        meta: { width: 800, height: 800, size: '0.9MB', credits: 2 }
    }
];

export const MOCK_FOLDERS: AssetFolder[] = [
    { id: 'f1', name: 'Product Shots', icon: 'image', count: 8, isShared: true },
    { id: 'f2', name: 'Campaign Dec', icon: 'star', count: 5, isShared: true },
    { id: 'f3', name: 'Client X', icon: 'folder', count: 12, isShared: true },
    { id: 'pf1', name: 'My Drafts', icon: 'folder', count: 3, isShared: false },
    { id: 'pf2', name: 'Favorites', icon: 'heart', count: 7, isShared: false }
];
