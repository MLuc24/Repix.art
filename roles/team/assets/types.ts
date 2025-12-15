
export interface TeamAssetItem {
    id: string;
    title: string;
    src: string;
    source: 'upload' | 'generated' | 'remix';
    createdAt: string;
    folderId?: string;
    ownerString: string; // e.g., "Sarah K."
    ownerAvatar?: string;
    meta: {
        width: number;
        height: number;
        size: string;
    };
}

export const MOCK_TEAM_ASSETS: TeamAssetItem[] = [
    {
        id: 't1',
        title: 'Q3 Campaign Hero',
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'upload',
        createdAt: '2023-10-15T10:00:00Z',
        ownerString: 'Sarah K.',
        meta: { width: 1920, height: 1080, size: '2.4MB' }
    },
    {
        id: 't2',
        title: 'Product Shot v2',
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'generated',
        createdAt: '2023-10-16T14:30:00Z',
        ownerString: 'Mike R.',
        meta: { width: 1024, height: 1024, size: '1.1MB' }
    },
    {
        id: 't3',
        title: 'Logo Color Variant',
        src: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'remix',
        createdAt: '2023-10-17T09:15:00Z',
        ownerString: 'Sarah K.',
        folderId: 'f1',
        meta: { width: 500, height: 500, size: '0.5MB' }
    },
    {
        id: 't4',
        title: 'Office Vibes',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'upload',
        createdAt: '2023-11-01T08:00:00Z',
        ownerString: 'Alex T.',
        folderId: 'f1',
        meta: { width: 2000, height: 1333, size: '3.2MB' }
    },
    {
        id: 't5',
        title: 'Neon Concept',
        src: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        source: 'generated',
        createdAt: '2023-11-02T16:20:00Z',
        ownerString: 'Mike R.',
        meta: { width: 1024, height: 1024, size: '1.4MB' }
    }
];
