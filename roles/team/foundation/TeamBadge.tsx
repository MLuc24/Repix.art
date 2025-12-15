/**
 * TeamBadge Component (R4.1)
 * 
 * Small badge that indicates when user is in Team Mode.
 * Shown in Header, Dashboard title, Project header.
 * 
 * Features:
 * - "TEAM" label with tooltip
 * - Subtle gradient/neon styling
 * - Only visible when isTeamMode = true
 */

import React from 'react';
import { useWorkspace } from './WorkspaceContextProvider';
import { Icons } from '../../../shared/components/Icons';

interface TeamBadgeProps {
    /** Show team name instead of "TEAM" */
    showName?: boolean;
    /** Size variant */
    size?: 'sm' | 'md';
    /** Custom class */
    className?: string;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({
    showName = false,
    size = 'sm',
    className = ''
}) => {
    const { isTeamMode, currentTeam } = useWorkspace();

    // Don't render if not in team mode
    if (!isTeamMode) return null;

    const sizeClasses = size === 'sm'
        ? 'px-2 py-0.5 text-[10px]'
        : 'px-2.5 py-1 text-xs';

    return (
        <div
            className={`
        inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider
        bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
        border border-cyan-500/30
        text-cyan-400
        ${sizeClasses}
        ${className}
      `}
            title="You are working in Team workspace."
        >
            <Icons.Layout className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            <span>{showName && currentTeam ? currentTeam.name : 'Team'}</span>
        </div>
    );
};

/**
 * Inline Team Indicator
 * 
 * A smaller, inline version for use in titles/headers.
 */
export const TeamIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { isTeamMode, currentTeam } = useWorkspace();

    if (!isTeamMode || !currentTeam) return null;

    return (
        <span
            className={`
        inline-flex items-center gap-1 text-cyan-400 text-sm font-medium
        ${className}
      `}
            title="You are working in Team workspace."
        >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {currentTeam.name}
        </span>
    );
};
