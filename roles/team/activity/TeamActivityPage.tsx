/**
 * TeamActivityPage Component (R4.3)
 * 
 * Full-page view of team activity feed:
 * - Header with title & filter
 * - Scrollable activity list grouped by date
 * - Empty state when no activities
 */

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { MOCK_TEAM_ACTIVITIES } from '../../../services/mock/teamDashboard';
import { Icons } from '../../../shared/components/Icons';
import { TeamBadge } from '../foundation/TeamBadge';
import { ActivityFilter, ActivityFilterType, getActivityType } from './ActivityFilter';
import { ActivityList, ActivityEmptyState } from './ActivityList';

interface TeamActivityPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
}

export const TeamActivityPage: React.FC<TeamActivityPageProps> = ({ onLogout, onNavigate }) => {
    // State
    const [filter, setFilter] = useState<ActivityFilterType>('all');

    // Filter activities based on selected type
    const filteredActivities = useMemo(() => {
        if (filter === 'all') return MOCK_TEAM_ACTIVITIES;

        return MOCK_TEAM_ACTIVITIES.filter(activity => {
            const activityType = getActivityType(activity.action);
            return activityType === filter;
        });
    }, [filter]);

    // Handle project click - navigate to projects page
    const handleProjectClick = (projectName: string) => {
        console.log('Navigate to project:', projectName);
        onNavigate('projects');
    };

    return (
        <DashboardLayout
            user={MOCK_TEAM_USER}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="activity"
        >
            <div className="max-w-4xl mx-auto py-4 md:py-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-white">Team Activity</h1>
                            <TeamBadge size="sm" />
                        </div>
                        <p className="text-sm text-slate-400">
                            Recent actions in your team • {MOCK_TEAM_ACTIVITIES.length} total activities
                        </p>
                    </div>

                    {/* Filter */}
                    <ActivityFilter value={filter} onChange={setFilter} />
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: 'Edits', count: MOCK_TEAM_ACTIVITIES.filter(a => getActivityType(a.action) === 'edits').length, color: 'violet' },
                        { label: 'Generates', count: MOCK_TEAM_ACTIVITIES.filter(a => getActivityType(a.action) === 'generates').length, color: 'cyan' },
                        { label: 'Approvals', count: MOCK_TEAM_ACTIVITIES.filter(a => getActivityType(a.action) === 'approvals').length, color: 'emerald' },
                        { label: 'Exports', count: MOCK_TEAM_ACTIVITIES.filter(a => getActivityType(a.action) === 'exports').length, color: 'amber' },
                    ].map(stat => (
                        <button
                            key={stat.label}
                            onClick={() => setFilter(stat.label.toLowerCase() as ActivityFilterType)}
                            className={`
                p-3 rounded-xl border transition-all text-left
                ${filter === stat.label.toLowerCase()
                                    ? `bg-${stat.color}-500/20 border-${stat.color}-500/30`
                                    : 'bg-[#1a1b26] border-white/10 hover:border-white/20'
                                }
              `}
                        >
                            <p className={`text-2xl font-bold text-white`}>{stat.count}</p>
                            <p className="text-xs text-slate-400">{stat.label}</p>
                        </button>
                    ))}
                </div>

                {/* Activity List or Empty State */}
                {filteredActivities.length > 0 ? (
                    <ActivityList
                        activities={filteredActivities}
                        onProjectClick={handleProjectClick}
                    />
                ) : (
                    <ActivityEmptyState />
                )}
            </div>
        </DashboardLayout>
    );
};
