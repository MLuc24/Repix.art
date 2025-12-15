
export type TeamRole = 'admin' | 'editor' | 'viewer';
export type MemberStatus = 'active' | 'pending';

export interface Permission {
    id: string;
    name: string;
    admin: boolean;
    editor: boolean;
    viewer: boolean;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: TeamRole;
    status: MemberStatus;
    joinedAt: string;
}

// Permission Matrix
export const PERMISSIONS: Permission[] = [
    { id: 'edit-images', name: 'Edit images', admin: true, editor: true, viewer: false },
    { id: 'export', name: 'Export images', admin: true, editor: true, viewer: false },
    { id: 'manage-assets', name: 'Upload & delete assets', admin: true, editor: true, viewer: false },
    { id: 'apply-presets', name: 'Apply presets & backgrounds', admin: true, editor: true, viewer: false },
    { id: 'comment', name: 'Comment on projects', admin: true, editor: true, viewer: true },
    { id: 'view-projects', name: 'View projects & assets', admin: true, editor: true, viewer: true },
    { id: 'manage-team', name: 'Manage team & roles', admin: true, editor: false, viewer: false },
    { id: 'manage-credits', name: 'Manage credits & billing', admin: true, editor: false, viewer: false },
];

// Role Descriptions
export const ROLE_INFO = {
    admin: {
        label: 'Admin',
        description: 'Full access to manage team, projects, and billing',
        color: 'from-red-500 to-orange-500'
    },
    editor: {
        label: 'Editor',
        description: 'Can edit, export images and manage assets',
        color: 'from-blue-500 to-cyan-500'
    },
    viewer: {
        label: 'Viewer',
        description: 'Can view and comment on projects only',
        color: 'from-slate-500 to-slate-600'
    }
};

// Mock Team Members
export const MOCK_TEAM_MEMBERS: TeamMember[] = [
    {
        id: 'tm1',
        name: 'Sarah Johnson',
        email: 'sarah@acmecorp.com',
        avatar: 'https://i.pravatar.cc/100?img=1',
        role: 'admin',
        status: 'active',
        joinedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: 'tm2',
        name: 'Mike Rodriguez',
        email: 'mike@acmecorp.com',
        avatar: 'https://i.pravatar.cc/100?img=12',
        role: 'editor',
        status: 'active',
        joinedAt: '2024-02-20T14:30:00Z'
    },
    {
        id: 'tm3',
        name: 'Emily Chen',
        email: 'emily@acmecorp.com',
        avatar: 'https://i.pravatar.cc/100?img=5',
        role: 'editor',
        status: 'active',
        joinedAt: '2024-03-10T09:15:00Z'
    },
    {
        id: 'tm4',
        name: 'Alex Turner',
        email: 'alex@acmecorp.com',
        avatar: 'https://i.pravatar.cc/100?img=8',
        role: 'viewer',
        status: 'active',
        joinedAt: '2024-04-05T11:45:00Z'
    },
    {
        id: 'tm5',
        name: 'Jessica Park',
        email: 'jessica@acmecorp.com',
        avatar: 'https://i.pravatar.cc/100?img=9',
        role: 'viewer',
        status: 'pending',
        joinedAt: '2024-12-10T16:00:00Z'
    }
];
