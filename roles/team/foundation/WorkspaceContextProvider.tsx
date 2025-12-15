/**
 * WorkspaceContextProvider (R4.1)
 * 
 * Manages the current workspace context (Personal vs Team).
 * Provides context to all child components to determine data scope.
 * 
 * Usage:
 * - Wrap your app/dashboard with <WorkspaceProvider>
 * - Use useWorkspace() hook to access context
 * - Switch workspace via switchToPersonal() or switchToTeam(teamId)
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { WorkspaceContext, Team, MOCK_TEAMS, DEFAULT_WORKSPACE_CONTEXT } from '../../../services/mock/team';

// ============ CONTEXT INTERFACE ============
interface WorkspaceContextValue {
    // Current state
    workspace: WorkspaceContext;
    isTeamMode: boolean;
    currentTeam: Team | null;

    // Available teams
    teams: Team[];

    // Actions
    switchToPersonal: () => void;
    switchToTeam: (teamId: string) => void;
    addTeam: (team: Team) => void;
}

// ============ CREATE CONTEXT ============
const WorkspaceCtx = createContext<WorkspaceContextValue | undefined>(undefined);

// ============ PROVIDER COMPONENT ============
interface WorkspaceProviderProps {
    children: ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
    // State
    const [workspace, setWorkspace] = useState<WorkspaceContext>(DEFAULT_WORKSPACE_CONTEXT);
    const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);

    // Derived state
    const isTeamMode = workspace.type === 'team';
    const currentTeam = isTeamMode && workspace.teamId
        ? teams.find(t => t.id === workspace.teamId) || null
        : null;

    // Actions
    const switchToPersonal = useCallback(() => {
        setWorkspace({
            type: 'personal',
            teamId: undefined,
            teamName: undefined,
        });
        console.log('[Workspace] Switched to Personal');
    }, []);

    const switchToTeam = useCallback((teamId: string) => {
        const team = teams.find(t => t.id === teamId);
        if (team) {
            setWorkspace({
                type: 'team',
                teamId: team.id,
                teamName: team.name,
            });
            console.log('[Workspace] Switched to Team:', team.name);
        }
    }, [teams]);

    const addTeam = useCallback((team: Team) => {
        setTeams(prev => [...prev, team]);
        // Auto-switch to new team
        setWorkspace({
            type: 'team',
            teamId: team.id,
            teamName: team.name,
        });
        console.log('[Workspace] Created and switched to Team:', team.name);
    }, []);

    // Context value
    const value: WorkspaceContextValue = {
        workspace,
        isTeamMode,
        currentTeam,
        teams,
        switchToPersonal,
        switchToTeam,
        addTeam,
    };

    return (
        <WorkspaceCtx.Provider value={value}>
            {children}
        </WorkspaceCtx.Provider>
    );
};

// ============ HOOK ============
export const useWorkspace = (): WorkspaceContextValue => {
    const context = useContext(WorkspaceCtx);
    if (!context) {
        throw new Error('useWorkspace must be used within a WorkspaceProvider');
    }
    return context;
};

// ============ EXPORTS ============
export type { WorkspaceContext, Team };
