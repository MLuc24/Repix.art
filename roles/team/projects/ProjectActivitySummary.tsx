/**
 * ProjectActivitySummary Component (R4.5)
 * 
 * Mini activity log for project-level actions:
 * - Image edits
 * - Status changes
 * - Assignments
 */

import React from 'react';
import { ProjectActivity } from '../../../services/mock/teamProjects';
import { Icons } from '../../../shared/components/Icons';

interface ProjectActivitySummaryProps {
    activities: ProjectActivity[];
    maxItems?: number;
}

// Format relative time
const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
};

export const ProjectActivitySummary: React.FC<ProjectActivitySummaryProps> = ({
    activities,
    maxItems = 5,
}) => {
    const displayedActivities = activities.slice(0, maxItems);

    return (
        <div className="bg-[#1a1b26] border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Icons.Activity className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-white">Project Activity</h3>
            </div>

            {/* Activity list */}
            <div className="divide-y divide-white/5">
                {displayedActivities.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                        <p className="text-sm text-slate-500">No activity yet</p>
                    </div>
                ) : (
                    displayedActivities.map(activity => (
                        <div key={activity.id} className="px-4 py-3 flex items-start gap-3">
                            {/* Dot indicator */}
                            <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 shrink-0" />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-300">
                                    <span className="font-semibold text-white">{activity.userName}</span>
                                    {' '}
                                    {activity.action}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {formatTime(activity.timestamp)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* View all link */}
            {activities.length > maxItems && (
                <div className="px-4 py-3 border-t border-white/5">
                    <button className="text-xs text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                        View all {activities.length} activities →
                    </button>
                </div>
            )}
        </div>
    );
};
