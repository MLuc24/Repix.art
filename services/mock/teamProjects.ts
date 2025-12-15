/**
 * Mock Data for Team Projects (R4.5)
 * 
 * Extended project data with team collaboration info:
 * - Assigned members
 * - Image assignments
 * - Internal comments
 * - Project-level activity
 */

import { MOCK_TEAM_MEMBERS, TeamMember } from './teamDashboard';

// ============ TYPES ============

export type ImageStatus = 'editing' | 'ready-for-review' | 'approved' | 'needs-revision';

export interface TeamProjectImage {
    id: string;
    src: string;
    name: string;
    status: ImageStatus;
    assignedTo?: TeamMember;
    lastEditedAt?: string;
    lastEditedBy?: string;
}

export interface InternalComment {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    timestamp: string;
}

export interface ProjectActivity {
    id: string;
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
}

export interface TeamProject {
    id: string;
    name: string;
    clientName: string;
    clientEmail: string;
    status: 'In Progress' | 'In Review' | 'Approved' | 'Delivered';
    assignedMembers: TeamMember[];
    images: TeamProjectImage[];
    internalComments: InternalComment[];
    activities: ProjectActivity[];
    createdAt: string;
    deadline?: string;
}

// ============ MOCK DATA ============

export const MOCK_TEAM_PROJECT_IMAGES: TeamProjectImage[] = [
    {
        id: 'img_001',
        src: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
        name: 'Product_Hero_01.jpg',
        status: 'approved',
        assignedTo: MOCK_TEAM_MEMBERS[1], // Linh
        lastEditedAt: '2024-12-15T10:30:00Z',
        lastEditedBy: 'Linh',
    },
    {
        id: 'img_002',
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        name: 'Product_Detail_02.jpg',
        status: 'ready-for-review',
        assignedTo: MOCK_TEAM_MEMBERS[2], // An
        lastEditedAt: '2024-12-15T11:00:00Z',
        lastEditedBy: 'An',
    },
    {
        id: 'img_003',
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        name: 'Product_Lifestyle_03.jpg',
        status: 'editing',
        assignedTo: MOCK_TEAM_MEMBERS[3], // Minh
        lastEditedAt: '2024-12-15T12:00:00Z',
        lastEditedBy: 'Minh',
    },
    {
        id: 'img_004',
        src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
        name: 'Product_Banner_04.jpg',
        status: 'needs-revision',
        assignedTo: MOCK_TEAM_MEMBERS[1], // Linh
        lastEditedAt: '2024-12-15T09:00:00Z',
        lastEditedBy: 'Linh',
    },
    {
        id: 'img_005',
        src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
        name: 'Product_White_05.jpg',
        status: 'approved',
        assignedTo: MOCK_TEAM_MEMBERS[4], // Hà
        lastEditedAt: '2024-12-15T08:30:00Z',
        lastEditedBy: 'Hà',
    },
    {
        id: 'img_006',
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        name: 'Product_Action_06.jpg',
        status: 'editing',
        assignedTo: MOCK_TEAM_MEMBERS[2], // An
        lastEditedAt: '2024-12-15T13:00:00Z',
        lastEditedBy: 'An',
    },
];

export const MOCK_INTERNAL_COMMENTS: InternalComment[] = [
    {
        id: 'cmt_001',
        userId: 'user_001',
        userName: 'Team Admin',
        userAvatar: 'https://i.pravatar.cc/40?img=32',
        content: 'Please prioritize the hero image first. Client needs it for the landing page.',
        timestamp: '2024-12-15T09:00:00Z',
    },
    {
        id: 'cmt_002',
        userId: 'user_002',
        userName: 'Linh',
        userAvatar: 'https://i.pravatar.cc/40?img=1',
        content: 'Hero image done! Moving to the detail shots now.',
        timestamp: '2024-12-15T10:30:00Z',
    },
    {
        id: 'cmt_003',
        userId: 'user_003',
        userName: 'An',
        userAvatar: 'https://i.pravatar.cc/40?img=2',
        content: 'Product_Detail_02 is ready for internal review before we send to client.',
        timestamp: '2024-12-15T11:15:00Z',
    },
    {
        id: 'cmt_004',
        userId: 'user_004',
        userName: 'Minh',
        userAvatar: 'https://i.pravatar.cc/40?img=3',
        content: 'Need the original RAW file for Product_Lifestyle_03. Can someone share?',
        timestamp: '2024-12-15T12:30:00Z',
    },
];

export const MOCK_PROJECT_ACTIVITIES: ProjectActivity[] = [
    {
        id: 'pact_001',
        userId: 'user_002',
        userName: 'Linh',
        action: 'marked Product_Hero_01.jpg as approved',
        timestamp: '2024-12-15T10:30:00Z',
    },
    {
        id: 'pact_002',
        userId: 'user_003',
        userName: 'An',
        action: 'set Product_Detail_02.jpg to ready for review',
        timestamp: '2024-12-15T11:00:00Z',
    },
    {
        id: 'pact_003',
        userId: 'user_001',
        userName: 'Team Admin',
        action: 'changed project status to In Review',
        timestamp: '2024-12-15T11:30:00Z',
    },
    {
        id: 'pact_004',
        userId: 'user_004',
        userName: 'Minh',
        action: 'started editing Product_Lifestyle_03.jpg',
        timestamp: '2024-12-15T12:00:00Z',
    },
];

export const MOCK_TEAM_PROJECT: TeamProject = {
    id: 'proj_team_001',
    name: 'Summer Campaign 2024',
    clientName: 'Fashion Brand X',
    clientEmail: 'contact@fashionbrandx.com',
    status: 'In Review',
    assignedMembers: [
        MOCK_TEAM_MEMBERS[0], // Admin
        MOCK_TEAM_MEMBERS[1], // Linh
        MOCK_TEAM_MEMBERS[2], // An
        MOCK_TEAM_MEMBERS[3], // Minh
    ],
    images: MOCK_TEAM_PROJECT_IMAGES,
    internalComments: MOCK_INTERNAL_COMMENTS,
    activities: MOCK_PROJECT_ACTIVITIES,
    createdAt: '2024-12-10T08:00:00Z',
    deadline: '2024-12-20T18:00:00Z',
};
