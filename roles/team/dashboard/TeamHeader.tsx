/**
 * TeamHeader Component (R4.2)
 * 
 * Displays team information at the top of Team Dashboard:
 * - Team name & badge
 * - Member count
 * - Credits remaining
 * - Quick actions (settings - coming soon)
 */

import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { useWorkspace } from '../foundation/WorkspaceContextProvider';
import { TeamBadge } from '../foundation/TeamBadge';
import { MOCK_TEAM_MEMBERS } from '../../../services/mock/teamDashboard';

interface TeamHeaderProps {
    teamCredits: number;
    onSwitchWorkspace?: () => void;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ teamCredits, onSwitchWorkspace }) => {
    const { currentTeam } = useWorkspace();

    if (!currentTeam) return null;

    const onlineCount = MOCK_TEAM_MEMBERS.filter(m => m.status === 'online').length;

    return (
        <div className="bg-gradient-to-r from-[#0e0f14] to-[#1a1b26] border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Team Info */}
                <div className="flex items-center gap-4">
                    {/* Team Avatar */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/20">
                        {currentTeam.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-xl font-bold text-white">{currentTeam.name}</h1>
                            <TeamBadge size="sm" />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <Icons.User className="w-4 h-4" />
                                {currentTeam.memberCount} members
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                {onlineCount} online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Credits & Actions */}
                <div className="flex items-center gap-3">
                    {/* Team Credits */}
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Icons.Bolt className="w-5 h-5 text-violet-400" />
                        <div>
                            <p className="text-xs text-slate-500">Team Credits</p>
                            <p className="text-lg font-bold text-white">{teamCredits.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Team Settings (Coming Soon) */}
                    <button
                        disabled
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed opacity-50"
                        title="Team Settings (Coming Soon)"
                    >
                        <Icons.Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
