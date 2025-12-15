/**
 * TeamDashboardPage Component (R4.2)
 * 
 * Main Team Dashboard page providing team overview:
 * - Team header with info & credits
 * - Stats cards (projects, images, credits, completion time)
 * - Quick actions for navigation
 * - Recent team activity
 * 
 * This is displayed when user is in Team Mode and on dashboard view.
 */

import React from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { MOCK_TEAM_STATS, MOCK_TEAM_ACTIVITIES } from '../../../services/mock/teamDashboard';
import { useWorkspace } from '../foundation/WorkspaceContextProvider';
import { TeamHeader } from './TeamHeader';
import { TeamStatsGrid } from './TeamStatsCard';
import { TeamQuickActions } from './TeamQuickActions';
import { TeamRecentActivity } from './TeamRecentActivity';

interface TeamDashboardPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
}

export const TeamDashboardPage: React.FC<TeamDashboardPageProps> = ({ onLogout, onNavigate }) => {
    const { isTeamMode, currentTeam } = useWorkspace();

    // Team credits from mock user
    const teamCredits = MOCK_TEAM_USER.credits;

    return (
        <DashboardLayout
            user={MOCK_TEAM_USER}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="dashboard"
        >
            <div className="max-w-7xl mx-auto py-4 md:py-6">
                {/* Team Header */}
                <TeamHeader teamCredits={teamCredits} />

                {/* Stats Grid */}
                <TeamStatsGrid stats={MOCK_TEAM_STATS} />

                {/* Quick Actions */}
                <TeamQuickActions onNavigate={onNavigate} />

                {/* Two Column Layout: Activity + Members Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity - Takes 2/3 */}
                    <div className="lg:col-span-2">
                        <TeamRecentActivity activities={MOCK_TEAM_ACTIVITIES} />
                    </div>

                    {/* Team Members Preview - Takes 1/3 */}
                    <div className="bg-[#1a1b26] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Team Members</h2>
                            <span className="text-xs text-slate-500">{currentTeam?.memberCount || 5} total</span>
                        </div>

                        <div className="p-4">
                            {/* Online Members Avatars */}
                            <div className="flex -space-x-2 mb-4">
                                {['https://i.pravatar.cc/40?img=32', 'https://i.pravatar.cc/40?img=1', 'https://i.pravatar.cc/40?img=2', 'https://i.pravatar.cc/40?img=3', 'https://i.pravatar.cc/40?img=4'].map((avatar, i) => (
                                    <img
                                        key={i}
                                        src={avatar}
                                        alt="Team member"
                                        className="w-10 h-10 rounded-full border-2 border-[#1a1b26]"
                                    />
                                ))}
                            </div>

                            {/* Info */}
                            <p className="text-sm text-slate-400 mb-4">
                                3 members are currently online
                            </p>

                            {/* Manage Team Button (Coming Soon) */}
                            <button
                                disabled
                                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-500 text-sm font-medium cursor-not-allowed"
                            >
                                Manage Team (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
