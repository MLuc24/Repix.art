/**
 * ActivityItem Component (R4.3)
 * 
 * Single activity item displaying:
 * - User avatar
 * - Action text with user name
 * - Project name (clickable)
 * - Timestamp
 */

import React from 'react';
import { TeamActivity } from '../../../services/mock/teamDashboard';
import { getActivityType, ActivityFilterType } from './ActivityFilter';

interface ActivityItemProps {
    activity: TeamActivity;
    onProjectClick?: (projectName: string) => void;
}

// Helper to format relative time
const formatRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

// Get activity type color
const getActivityColor = (action: string): string => {
    const type = getActivityType(action);
    switch (type) {
        case 'edits': return 'bg-violet-500/20 text-violet-400';
        case 'generates': return 'bg-cyan-500/20 text-cyan-400';
        case 'approvals': return 'bg-emerald-500/20 text-emerald-400';
        case 'exports': return 'bg-amber-500/20 text-amber-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

// Get activity type icon
const getActivityIcon = (action: string): string => {
    const type = getActivityType(action);
    switch (type) {
        case 'edits': return '✏️';
        case 'generates': return '✨';
        case 'approvals': return '✅';
        case 'exports': return '📤';
        default: return '📋';
    }
};

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onProjectClick }) => {
    const colorClass = getActivityColor(activity.action);
    const icon = getActivityIcon(activity.action);

    return (
        <div className="flex items-start gap-4 p-4 hover:bg-white/5 transition-colors rounded-xl group">
            {/* User Avatar */}
            <div className="relative shrink-0">
                <img
                    src={activity.userAvatar}
                    alt={activity.userName}
                    className="w-10 h-10 rounded-full border-2 border-white/10"
                />
                {/* Activity type indicator */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${colorClass}`}>
                    {icon}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Main text */}
                <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">{activity.userName}</span>
                    {' '}
                    <span>{activity.action}</span>
                    {activity.projectName && (
                        <>
                            {' '}
                            <button
                                onClick={() => onProjectClick?.(activity.projectName!)}
                                className="font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                            >
                                {activity.projectName}
                            </button>
                        </>
                    )}
                </p>

                {/* Timestamp */}
                <p className="text-xs text-slate-500 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                </p>
            </div>

            {/* Activity type badge (visible on hover) */}
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${colorClass}`}>
                {getActivityType(activity.action) === 'all' ? 'Other' : getActivityType(activity.action).charAt(0).toUpperCase() + getActivityType(activity.action).slice(1, -1)}
            </div>
        </div>
    );
};
