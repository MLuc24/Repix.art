/**
 * TeamRecentActivity Component (R4.2)
 * 
 * Displays recent team activity in a compact list:
 * - User avatar
 * - Action text
 * - Timestamp
 * - Project name (if applicable)
 */

import React from 'react';
import { TeamActivity } from '../../../services/mock/teamDashboard';

interface TeamRecentActivityProps {
    activities: TeamActivity[];
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
    return `${diffDays}d ago`;
};

export const TeamRecentActivity: React.FC<TeamRecentActivityProps> = ({ activities }) => {
    return (
        <div className="bg-[#1a1b26] border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Recent Activity</h2>
                <span className="text-xs text-slate-500">Team updates</span>
            </div>

            {/* Activity List */}
            <div className="divide-y divide-white/5">
                {activities.slice(0, 5).map(activity => (
                    <div
                        key={activity.id}
                        className="px-5 py-4 hover:bg-white/5 transition-colors flex items-start gap-3"
                    >
                        {/* Avatar */}
                        <img
                            src={activity.userAvatar}
                            alt={activity.userName}
                            className="w-9 h-9 rounded-full border border-white/10 shrink-0"
                        />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-300">
                                <span className="font-semibold text-white">{activity.userName}</span>
                                {' '}
                                <span>{activity.action}</span>
                                {activity.projectName && (
                                    <>
                                        {' '}
                                        <span className="font-medium text-cyan-400">{activity.projectName}</span>
                                    </>
                                )}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {formatRelativeTime(activity.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/5">
                <button className="w-full text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                    View all activity →
                </button>
            </div>
        </div>
    );
};
