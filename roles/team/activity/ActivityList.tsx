/**
 * ActivityList Component (R4.3)
 * 
 * Scrollable list of activity items with infinite scroll (mock).
 * Groups activities by date for easier reading.
 */

import React from 'react';
import { TeamActivity } from '../../../services/mock/teamDashboard';
import { ActivityItem } from './ActivityItem';

interface ActivityListProps {
    activities: TeamActivity[];
    onProjectClick?: (projectName: string) => void;
}

// Helper to format date header
const formatDateHeader = (timestamp: string): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
};

// Group activities by date
const groupActivitiesByDate = (activities: TeamActivity[]): Map<string, TeamActivity[]> => {
    const groups = new Map<string, TeamActivity[]>();

    activities.forEach(activity => {
        const dateKey = new Date(activity.timestamp).toDateString();
        if (!groups.has(dateKey)) {
            groups.set(dateKey, []);
        }
        groups.get(dateKey)!.push(activity);
    });

    return groups;
};

export const ActivityList: React.FC<ActivityListProps> = ({ activities, onProjectClick }) => {
    const groupedActivities = groupActivitiesByDate(activities);

    return (
        <div className="space-y-6">
            {Array.from(groupedActivities.entries()).map(([dateKey, dayActivities]) => (
                <div key={dateKey}>
                    {/* Date Header */}
                    <div className="sticky top-0 z-10 bg-[#020617]/95 backdrop-blur-sm py-2 mb-2">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-slate-400">
                                {formatDateHeader(dayActivities[0].timestamp)}
                            </span>
                            <div className="flex-1 h-px bg-white/5" />
                            <span className="text-xs text-slate-500">
                                {dayActivities.length} activities
                            </span>
                        </div>
                    </div>

                    {/* Activities for this date */}
                    <div className="bg-[#1a1b26] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
                        {dayActivities.map(activity => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                                onProjectClick={onProjectClick}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* Load more indicator (mock) */}
            {activities.length > 0 && (
                <div className="text-center py-4">
                    <button className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                        Load more activities...
                    </button>
                </div>
            )}
        </div>
    );
};

/**
 * Empty state when no activities
 */
export const ActivityEmptyState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No team activity yet</h3>
            <p className="text-sm text-slate-400 max-w-xs">
                When your team starts working on projects, their activities will appear here.
            </p>
        </div>
    );
};
