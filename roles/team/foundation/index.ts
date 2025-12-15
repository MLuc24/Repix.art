/**
 * Team Foundation Module Exports (R4.1)
 * 
 * Core components for Team Mode:
 * - WorkspaceProvider & useWorkspace hook
 * - TeamSwitcher dropdown
 * - TeamBadge indicator
 * - CreateTeamModal
 */

export { WorkspaceProvider, useWorkspace } from './WorkspaceContextProvider';
export type { WorkspaceContext, Team } from './WorkspaceContextProvider';

export { TeamSwitcher } from './TeamSwitcher';
export { TeamBadge, TeamIndicator } from './TeamBadge';
export { CreateTeamModal } from './CreateTeamModal';
