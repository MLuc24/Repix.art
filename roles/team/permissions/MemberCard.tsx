/**
 * MemberCard - Modern card-based member display
 * Click to view details in side panel
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
        <div className="group relative bg-[#1a1b26] border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
            {/* Top Row: Avatar + Name + Status */}
            <div className="flex items-start gap-4 mb-4">
                <div className="relative flex-shrink-0">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-xl border-2 border-white/10 group-hover:border-violet-500/30 transition-colors"
                    />
                    {member.status === 'active' ? (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#1a1b26]" />
                    ) : (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#1a1b26] flex items-center justify-center">
                            <Icons.Clock className="w-2.5 h-2.5 text-white" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate mb-1">{member.name}</h3>
                    <p className="text-sm text-slate-400 truncate mb-2">{member.email}</p>

                    {/* Role Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-br ${roleInfo.color} text-white text-xs font-bold`}>
                        <Icons.Shield className="w-3 h-3" />
                        {roleInfo.label}
                    </div>
                </div>

                {/* Actions Menu */}
                {canManage && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onViewDetails(member)}
                            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            title="View details"
                        >
                            <Icons.Eye className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onRemove(member.id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                            title="Remove member"
                        >
                            <Icons.Trash className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Row: Info Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <p className="text-xs text-slate-500 mb-1">Status</p>
                    <span className={`
                        inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold
                        ${member.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }
                    `}>
                        {member.status === 'active' ? (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Active
                            </>
                        ) : (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                Pending
                            </>
                        )}
                    </span>
                </div>

                <div>
                    <p className="text-xs text-slate-500 mb-1">Joined</p>
                    <p className="text-xs text-white font-medium">
                        {new Date(member.joinedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Change Role Section (Only for Admins) */}
            {canManage && member.status !== 'pending' && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <RoleDropdown
                        currentRole={member.role}
                        onChange={(newRole) => onRoleChange(member.id, newRole)}
                        disabled={false}
                    />
                </div>
            )}

            {/* View Details Button (Mobile/Always visible alternative) */}
            <button
                onClick={() => onViewDetails(member)}
                className="absolute bottom-5 right-5 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
                <Icons.ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
};
