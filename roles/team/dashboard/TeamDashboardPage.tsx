/**
 * TeamDashboardPage Component (R4.2 - Enhanced)
 * 
 * Main Team Dashboard page for Team & Agency role:
 * - AI Image Generator (reusing existing dashboard components)
 * - Team header with info & credits
 * - Enhanced stats cards with insights
 * - Quick actions for navigation
 * - Recent projects showcase
 * - Team activity & members
 * 
 * This is displayed when user is in Team Mode and on dashboard view.
 */

import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { DashboardImageGeneratorHero, DashboardQuickPrompt } from '../../../features/dashboard/components/SpotlightUI';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { MOCK_TEAM_STATS, MOCK_TEAM_ACTIVITIES, MOCK_TEAM_MEMBERS } from '../../../services/mock/teamDashboard';
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

    // AI Generator state
    const [promptValue, setPromptValue] = useState('');

    // Team credits from mock user
    const teamCredits = MOCK_TEAM_USER.credits;
    const onlineMembers = MOCK_TEAM_MEMBERS.filter(m => m.status === 'online');

    // Mock recent projects data
    const recentProjects = [
        {
            id: 'proj_001',
            name: 'Summer Campaign',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
            images: 45,
            progress: 75,
            members: ['https://i.pravatar.cc/32?img=1', 'https://i.pravatar.cc/32?img=2', 'https://i.pravatar.cc/32?img=3'],
            lastUpdate: '2h ago',
        },
        {
            id: 'proj_002',
            name: 'Product Launch Q1',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            images: 32,
            progress: 60,
            members: ['https://i.pravatar.cc/32?img=2', 'https://i.pravatar.cc/32?img=4'],
            lastUpdate: '5h ago',
        },
        {
            id: 'proj_003',
            name: 'Client ABC Rebrand',
            thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
            images: 28,
            progress: 90,
            members: ['https://i.pravatar.cc/32?img=1', 'https://i.pravatar.cc/32?img=3', 'https://i.pravatar.cc/32?img=4'],
            lastUpdate: '1d ago',
        },
    ];

    const handleGenerateImage = () => {
        if (promptValue.trim()) {
            sessionStorage.setItem('ai_generator_prompt', promptValue);
            onNavigate('generator');
        }
    };

    return (
        <DashboardLayout
            user={MOCK_TEAM_USER}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="dashboard"
        >
            <div className="max-w-7xl mx-auto py-4 md:py-6">
                {/* AI Image Generator - Reusing Shared Components */}
                <div className="mb-8">
                    <DashboardImageGeneratorHero
                        onTextToImage={() => onNavigate('generator')}
                        onRemix={() => onNavigate('remix')}
                    />
                    <DashboardQuickPrompt
                        value={promptValue}
                        onChange={setPromptValue}
                        onSubmit={handleGenerateImage}
                        credits={teamCredits}
                        onBuyCredits={() => onNavigate('team-billing')}
                    />
                </div>


                {/* Team Header */}
                <TeamHeader teamCredits={teamCredits} />

                {/* Enhanced Stats Grid */}
                <TeamStatsGrid stats={MOCK_TEAM_STATS} />

                {/* Quick Actions */}
                <TeamQuickActions onNavigate={onNavigate} />

                {/* Recent Projects Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white">Recent Projects</h2>
                        <button
                            onClick={() => onNavigate('projects')}
                            className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors"
                        >
                            View All
                            <Icons.ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recentProjects.map(project => (
                            <button
                                key={project.id}
                                onClick={() => onNavigate('project-detail')}
                                className="group relative overflow-hidden rounded-2xl bg-[#1a1b26] border border-white/10 hover:border-violet-500/50 transition-all duration-300 text-left"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-40 overflow-hidden bg-slate-800">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b26] via-transparent to-transparent" />

                                    {/* Progress Badge */}
                                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                                        <span className="text-xs font-bold text-white">{project.progress}%</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                                        {project.name}
                                    </h3>

                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-slate-400">
                                            {project.images} images
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {project.lastUpdate}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                                        <div
                                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>

                                    {/* Members */}
                                    <div className="flex -space-x-2">
                                        {project.members.map((avatar, i) => (
                                            <img
                                                key={i}
                                                src={avatar}
                                                alt="Member"
                                                className="w-6 h-6 rounded-full border-2 border-[#1a1b26]"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

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
                            <span className="text-xs text-slate-500">{MOCK_TEAM_MEMBERS.length} total</span>
                        </div>

                        <div className="p-4">
                            {/* Online Members */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                                        {onlineMembers.length} Online Now
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {onlineMembers.slice(0, 3).map(member => (
                                        <div key={member.id} className="flex items-center gap-3">
                                            <div className="relative">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1a1b26]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{member.name}</p>
                                                <p className="text-xs text-slate-500 capitalize">{member.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* All Members Avatars */}
                            <div className="flex -space-x-2 mb-4 pt-4 border-t border-white/5">
                                {MOCK_TEAM_MEMBERS.map((member, i) => (
                                    <img
                                        key={i}
                                        src={member.avatar}
                                        alt={member.name}
                                        title={member.name}
                                        className="w-8 h-8 rounded-full border-2 border-[#1a1b26] hover:scale-110 transition-transform cursor-pointer"
                                    />
                                ))}
                            </div>

                            {/* Manage Team Button */}
                            <button
                                onClick={() => onNavigate('team-members')}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 text-violet-300 text-sm font-semibold hover:from-violet-600/20 hover:to-fuchsia-600/20 hover:border-violet-500/40 transition-all duration-300"
                            >
                                Manage Team
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
