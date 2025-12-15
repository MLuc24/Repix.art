/**
 * MemberCard - Premium Modern Card Design
 * Enhanced with glassmorphism, gradients, and smooth animations
 */

import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamMember, TeamRole, ROLE_INFO } from './types';
import { RoleDropdown } from './RoleDropdown';

interface MemberCardProps {
    member: TeamMember;
    onRoleChange: (memberId: string, newRole: TeamRole) => void;
    onRemove: (memberId: string) => void;
    onViewDetails: (member: TeamMember) => void;
    currentUserRole: TeamRole;
}

export const MemberCard: React.FC<MemberCardProps> = ({
    member,
    onRoleChange,
    onRemove,
    onViewDetails,
    currentUserRole
}) => {
    const canManage = currentUserRole === 'admin';
    const roleInfo = ROLE_INFO[member.role];

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1b26] via-[#1e1f2e] to-[#1a1b26] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer"
            onClick={() => onViewDetails(member)}
        >
            {/* Ambient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-transparent to-cyan-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-600/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 p-6">
                {/* Header: Avatar + Name + Quick Actions */}
                <div className="flex items-start gap-4 mb-5">
                    {/* Avatar with Glow Effect */}
                    <div className="relative flex-shrink-0 group/avatar">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-cyan-600/30 rounded-2xl blur-lg opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300" />
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="relative w-16 h-16 rounded-2xl border-2 border-white/20 group-hover:border-violet-400/50 transition-all duration-300 shadow-lg"
                        />
                        {/* Status Indicator */}
                        {member.status === 'active' ? (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-[#1a1b26] shadow-lg shadow-emerald-500/50 animate-pulse" />
                        ) : (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-3 border-[#1a1b26] flex items-center justify-center shadow-lg shadow-orange-500/50">
                                <Icons.Clock className="w-3 h-3 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate mb-1 group-hover:text-violet-300 transition-colors duration-300">
                            {member.name}
                        </h3>
                        <p className="text-sm text-slate-400 truncate mb-3 group-hover:text-slate-300 transition-colors">
                            {member.email}
                        </p>

                        {/* Role Badge with Gradient */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-br ${roleInfo.color} text-white text-xs font-bold shadow-lg`}>
                            <Icons.Shield className="w-3.5 h-3.5" />
                            <span>{roleInfo.label}</span>
                        </div>
                    </div>

                    {/* Quick Actions (Admin Only) */}
                    {canManage && (
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewDetails(member);
                                }}
                                className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-violet-500/20 hover:border-violet-400/30 text-slate-400 hover:text-violet-300 transition-all duration-300"
                                title="View details"
                            >
                                <Icons.Eye className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(member.id);
                                }}
                                className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-red-500/20 hover:border-red-400/30 text-slate-400 hover:text-red-300 transition-all duration-300"
                                title="Remove member"
                            >
                                <Icons.Trash className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Stats Grid with Glass Effect */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                        <p className="text-xs text-slate-500 mb-1.5 font-semibold uppercase tracking-wider">Status</p>
                        <span className={`
                            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold
                            ${member.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                : 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
                            }
                        `}>
                            <span className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-orange-400'}`} />
                            {member.status === 'active' ? 'Active' : 'Pending'}
                        </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                        <p className="text-xs text-slate-500 mb-1.5 font-semibold uppercase tracking-wider">Joined</p>
                        <div className="flex items-center gap-1.5">
                            <Icons.Calendar className="w-3.5 h-3.5 text-violet-400" />
                            <p className="text-xs text-white font-bold">
                                {new Date(member.joinedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Change Role Section (Admin Only) */}
                {canManage && member.status !== 'pending' && (
                    <div className="pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <RoleDropdown
                            currentRole={member.role}
                            onChange={(newRole) => {
                                onRoleChange(member.id, newRole);
                            }}
                            disabled={false}
                        />
                    </div>
                )}

                {/* View Details Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 backdrop-blur-sm">
                        <span className="text-xs text-violet-300 font-bold">View Details</span>
                        <Icons.ArrowRight className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};
