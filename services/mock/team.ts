/**
 * Mock Data for Team Mode (R4.1)
 * 
 * This defines the Team entity and WorkspaceContext for UI-only implementation.
 * No backend integration - purely for UI state management.
 */

// ============ TYPES ============
export interface Team {
    id: string;
    name: string;
    ownerId: string;
    description?: string;
    avatar?: string;
    createdAt: string;
    memberCount: number;
}

export interface WorkspaceContext {
    type: 'personal' | 'team';
    teamId?: string;
    teamName?: string;
}

// ============ MOCK DATA ============

export const MOCK_TEAMS: Team[] = [
    {
        id: 'team_001',
        name: 'Rocket Studio',
        ownerId: 'user_001',
        description: 'Creative design team for product shots',
        avatar: 'https://i.pravatar.cc/100?img=50',
        createdAt: '2024-01-15T10:00:00Z',
        memberCount: 5,
    },
    {
        id: 'team_002',
        name: 'Design Agency Pro',
        ownerId: 'user_001',
        description: 'Full-service design agency',
        avatar: 'https://i.pravatar.cc/100?img=51',
        createdAt: '2024-02-20T14:30:00Z',
        memberCount: 12,
    },
];

// Default workspace context
export const DEFAULT_WORKSPACE_CONTEXT: WorkspaceContext = {
    type: 'personal',
    teamId: undefined,
    teamName: undefined,
};
