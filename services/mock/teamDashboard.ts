/**
 * Mock Data for Team Dashboard (R4.2)
 * 
 * Stats, activity, and quick action data for Team Overview.
 */

// ============ TYPES ============
export interface TeamStats {
    activeProjects: number;
    imagesInProgress: number;
    creditsUsed30d: number;
    avgCompletionTime: number; // in days
}

export interface TeamActivity {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    action: string;
    projectName?: string;
    timestamp: string;
}

export interface TeamMember {
    id: string;
    name: string;
    avatar: string;
    role: 'owner' | 'admin' | 'member';
    status: 'online' | 'offline' | 'away';
}

// ============ MOCK DATA ============

export const MOCK_TEAM_STATS: TeamStats = {
    activeProjects: 5,
    imagesInProgress: 124,
    creditsUsed30d: 86,
    avgCompletionTime: 2.3,
};

export const MOCK_TEAM_ACTIVITIES: TeamActivity[] = [
    {
        id: 'act_001',
        userId: 'user_002',
        userName: 'Linh',
        userAvatar: 'https://i.pravatar.cc/40?img=1',
        action: 'edited 3 images',
        projectName: 'Summer Campaign',
        timestamp: '2024-12-15T13:45:00Z',
    },
    {
        id: 'act_002',
        userId: 'user_003',
        userName: 'An',
        userAvatar: 'https://i.pravatar.cc/40?img=2',
        action: 'generated images for',
        projectName: 'Product Launch Q1',
        timestamp: '2024-12-15T12:30:00Z',
    },
    {
        id: 'act_003',
        userId: 'user_004',
        userName: 'Minh',
        userAvatar: 'https://i.pravatar.cc/40?img=3',
        action: 'approved delivery',
        projectName: 'Client ABC Rebrand',
        timestamp: '2024-12-15T11:15:00Z',
    },
    {
        id: 'act_004',
        userId: 'user_002',
        userName: 'Linh',
        userAvatar: 'https://i.pravatar.cc/40?img=1',
        action: 'uploaded 12 assets to',
        projectName: 'Agency Templates',
        timestamp: '2024-12-15T10:00:00Z',
    },
    {
        id: 'act_005',
        userId: 'user_005',
        userName: 'Hà',
        userAvatar: 'https://i.pravatar.cc/40?img=4',
        action: 'created new project',
        projectName: 'Holiday Special',
        timestamp: '2024-12-15T09:30:00Z',
    },
    // R4.3 - Extended activities for Activity Feed
    {
        id: 'act_006',
        userId: 'user_003',
        userName: 'An',
        userAvatar: 'https://i.pravatar.cc/40?img=2',
        action: 'exported final assets for',
        projectName: 'Summer Campaign',
        timestamp: '2024-12-15T08:45:00Z',
    },
    {
        id: 'act_007',
        userId: 'user_004',
        userName: 'Minh',
        userAvatar: 'https://i.pravatar.cc/40?img=3',
        action: 'edited 8 images in',
        projectName: 'Product Launch Q1',
        timestamp: '2024-12-15T08:00:00Z',
    },
    {
        id: 'act_008',
        userId: 'user_002',
        userName: 'Linh',
        userAvatar: 'https://i.pravatar.cc/40?img=1',
        action: 'generated batch of 20 images for',
        projectName: 'Holiday Special',
        timestamp: '2024-12-14T16:30:00Z',
    },
    {
        id: 'act_009',
        userId: 'user_005',
        userName: 'Hà',
        userAvatar: 'https://i.pravatar.cc/40?img=4',
        action: 'approved final delivery for',
        projectName: 'Agency Templates',
        timestamp: '2024-12-14T15:00:00Z',
    },
    {
        id: 'act_010',
        userId: 'user_003',
        userName: 'An',
        userAvatar: 'https://i.pravatar.cc/40?img=2',
        action: 'edited 15 product photos in',
        projectName: 'E-commerce Catalog',
        timestamp: '2024-12-14T14:20:00Z',
    },
    {
        id: 'act_011',
        userId: 'user_004',
        userName: 'Minh',
        userAvatar: 'https://i.pravatar.cc/40?img=3',
        action: 'generated AI backgrounds for',
        projectName: 'Client ABC Rebrand',
        timestamp: '2024-12-14T12:00:00Z',
    },
    {
        id: 'act_012',
        userId: 'user_002',
        userName: 'Linh',
        userAvatar: 'https://i.pravatar.cc/40?img=1',
        action: 'exported 50 images for',
        projectName: 'E-commerce Catalog',
        timestamp: '2024-12-14T10:30:00Z',
    },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
    {
        id: 'user_001',
        name: 'Team Admin',
        avatar: 'https://i.pravatar.cc/40?img=32',
        role: 'owner',
        status: 'online',
    },
    {
        id: 'user_002',
        name: 'Linh',
        avatar: 'https://i.pravatar.cc/40?img=1',
        role: 'admin',
        status: 'online',
    },
    {
        id: 'user_003',
        name: 'An',
        avatar: 'https://i.pravatar.cc/40?img=2',
        role: 'member',
        status: 'away',
    },
    {
        id: 'user_004',
        name: 'Minh',
        avatar: 'https://i.pravatar.cc/40?img=3',
        role: 'member',
        status: 'offline',
    },
    {
        id: 'user_005',
        name: 'Hà',
        avatar: 'https://i.pravatar.cc/40?img=4',
        role: 'member',
        status: 'online',
    },
];
