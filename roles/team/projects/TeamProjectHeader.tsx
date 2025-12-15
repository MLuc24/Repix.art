/**
 * TeamProjectHeader Component (R4.5)
 * 
 * Project header with:
 * - Project name & client
 * - Status badge
 * - Assigned members (avatars)
 * - Actions (Change status, Client Review, Deliver)
 */

import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamBadge } from '../foundation/TeamBadge';
import { TeamProject } from '../../../services/mock/teamProjects';
import { TeamMember } from '../../../services/mock/teamDashboard';

interface TeamProjectHeaderProps {
    project: TeamProject;
    onStatusChange?: (status: TeamProject['status']) => void;
    onOpenClientReview?: () => void;
    onDelivery?: () => void;
    onBack?: () => void;
}

const STATUS_OPTIONS: TeamProject['status'][] = ['In Progress', 'In Review', 'Approved', 'Delivered'];

const STATUS_COLORS: Record<TeamProject['status'], string> = {
    'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'In Review': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'Approved': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Delivered': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

export const TeamProjectHeader: React.FC<TeamProjectHeaderProps> = ({
    project,
    onStatusChange,
    onOpenClientReview,
    onDelivery,
    onBack,
}) => {
    const [showStatusMenu, setShowStatusMenu] = useState(false);

    return (
        <div className="bg-gradient-to-r from-[#0e0f14] to-[#1a1b26] border border-white/10 rounded-2xl p-6 mb-6">
            {/* Top row: Back + Title + Badge */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                    {/* Back button */}
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                        >
                            <Icons.ChevronLeft className="w-5 h-5" />
                        </button>
                    )}

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-xl font-bold text-white">{project.name}</h1>
                            <TeamBadge size="sm" />
                        </div>
                        <p className="text-sm text-slate-400">
                            Client: <span className="text-white">{project.clientName}</span>
                            {project.deadline && (
                                <>
                                    {' • '}
                                    <span className="text-amber-400">
                                        Due: {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </>
                            )}
                        </p>
                    </div>
                </div>

                {/* Status dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowStatusMenu(!showStatusMenu)}
                        className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 transition-all ${STATUS_COLORS[project.status]}`}
                    >
                        {project.status}
                        <Icons.ChevronLeft className={`w-4 h-4 transition-transform ${showStatusMenu ? 'rotate-90' : '-rotate-90'}`} />
                    </button>

                    {showStatusMenu && (
                        <>
                            <div className="fixed inset-0 z-30" onClick={() => setShowStatusMenu(false)} />
                            <div className="absolute right-0 top-full mt-2 bg-[#1a1b26] border border-white/10 rounded-xl shadow-xl z-40 overflow-hidden min-w-[160px]">
                                {STATUS_OPTIONS.map(status => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            onStatusChange?.(status);
                                            setShowStatusMenu(false);
                                        }}
                                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-white/5 ${project.status === status ? 'text-cyan-400' : 'text-slate-300'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Bottom row: Members + Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Assigned members */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Team:</span>
                    <div className="flex -space-x-2">
                        {project.assignedMembers.slice(0, 5).map(member => (
                            <img
                                key={member.id}
                                src={member.avatar}
                                alt={member.name}
                                title={member.name}
                                className="w-8 h-8 rounded-full border-2 border-[#0e0f14]"
                            />
                        ))}
                        {project.assignedMembers.length > 5 && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0e0f14] flex items-center justify-center text-xs font-bold text-white">
                                +{project.assignedMembers.length - 5}
                            </div>
                        )}
                    </div>
                    <span className="text-xs text-slate-500">
                        {project.assignedMembers.length} members
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onOpenClientReview}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Icons.Eye className="w-4 h-4" />
                        Client Review
                    </button>

                    {project.status === 'Approved' && (
                        <button
                            onClick={onDelivery}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold text-white hover:brightness-110 transition-all flex items-center gap-2"
                        >
                            <Icons.Send className="w-4 h-4" />
                            Deliver
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
