/**
 * TeamRecentActivity Component (R4.2 + R4.3 Integrated)
 * 
 * Enhanced component displaying team activity with:
 * - Activity filter (All, Edits, Generates, Approvals, Exports)
 * - Activity stats breakdown
 * - Expandable view (compact/full)
 * - User avatar, action text, timestamp, project name
 * 
 * This component integrates the functionality of the standalone Activity page
 * directly into the dashboard for better UX.
 */

import React, { useState, useMemo } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamActivity } from '../../../services/mock/teamDashboard';

interface TeamRecentActivityProps {
    activities: TeamActivity[];
    maxItems?: number; // Max items to show when collapsed
}

export type ActivityFilterType = 'all' | 'edits' | 'generates' | 'approvals' | 'exports';

// Helper to determine activity type from action text
const getActivityType = (action: string): ActivityFilterType => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('edit')) return 'edits';
    if (actionLower.includes('generat')) return 'generates';
    if (actionLower.includes('approv')) return 'approvals';
    if (actionLower.includes('export')) return 'exports';
    return 'all';
};

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

export const TeamRecentActivity: React.FC<TeamRecentActivityProps> = ({
    activities,
    maxItems = 6
}) => {
    const [filter, setFilter] = useState<ActivityFilterType>('all');
    const [isExpanded, setIsExpanded] = useState(false);

    // Filter activities based on selected type
    const filteredActivities = useMemo(() => {
        if (filter === 'all') return activities;
        return activities.filter(activity => {
            const activityType = getActivityType(activity.action);
            return activityType === filter;
        });
    }, [filter, activities]);

    // Calculate stats
    const stats = useMemo(() => ({
        edits: activities.filter(a => getActivityType(a.action) === 'edits').length,
        generates: activities.filter(a => getActivityType(a.action) === 'generates').length,
        approvals: activities.filter(a => getActivityType(a.action) === 'approvals').length,
        exports: activities.filter(a => getActivityType(a.action) === 'exports').length,
    }), [activities]);

    // Items to display
    const displayedActivities = isExpanded
        ? filteredActivities
        : filteredActivities.slice(0, maxItems);

    return (
        <div className="bg-[#1a1b26] border border-white/10 rounded-2xl overflow-hidden">
            {/* Header with Filter */}
            <div className="px-5 py-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-white">Team Activity</h2>
                    <span className="text-xs text-slate-500">{filteredActivities.length} activities</span>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {[
                        { value: 'all' as ActivityFilterType, label: 'All', count: activities.length },
                        { value: 'edits' as ActivityFilterType, label: 'Edits', count: stats.edits },
                        { value: 'generates' as ActivityFilterType, label: 'Generates', count: stats.generates },
                        { value: 'approvals' as ActivityFilterType, label: 'Approvals', count: stats.approvals },
                        { value: 'exports' as ActivityFilterType, label: 'Exports', count: stats.exports },
                    ].map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setFilter(tab.value)}
                            className={`
                                px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap
                                ${filter === tab.value
                                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                                }
                            `}
                        >
                            {tab.label} {tab.count > 0 && `(${tab.count})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activity List */}
            <div className="divide-y divide-white/5">
                {displayedActivities.length > 0 ? (
                    displayedActivities.map(activity => (
                        <div
                            key={activity.id}
                            className="px-5 py-3 hover:bg-white/5 transition-colors flex items-start gap-3"
                        >
                            {/* Avatar */}
                            <img
                                src={activity.userAvatar}
                                alt={activity.userName}
                                className="w-8 h-8 rounded-full border border-white/10 shrink-0"
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
                    ))
                ) : (
                    <div className="px-5 py-8 text-center">
                        <p className="text-sm text-slate-400">No {filter !== 'all' ? filter : 'activities'} found</p>
                    </div>
                )}
            </div>

            {/* Footer - Expand/Collapse */}
            {filteredActivities.length > maxItems && (
                <div className="px-5 py-3 border-t border-white/5">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                        {isExpanded ? (
                            <>
                                Show less
                                <Icons.ChevronLeft className="w-4 h-4 rotate-90" />
                            </>
                        ) : (
                            <>
                                View all {filteredActivities.length} activities
                                <Icons.ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};
