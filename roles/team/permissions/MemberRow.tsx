
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamMember, TeamRole, ROLE_INFO } from './types';
import { RoleDropdown } from './RoleDropdown';

interface MemberRowProps {
    member: TeamMember;
    onRoleChange: (memberId: string, newRole: TeamRole) => void;
    onRemove: (memberId: string) => void;
    currentUserRole: TeamRole;
}

export const MemberRow = ({ member, onRoleChange, onRemove, currentUserRole }: MemberRowProps) => {
    const canManage = currentUserRole === 'admin';
    const roleInfo = ROLE_INFO[member.role];

    return (
        <div className="group flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 last:border-b-0">

            {/* Avatar & Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800"
                    />
                    {member.status === 'pending' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                            <Icons.Clock className="w-2.5 h-2.5 text-white" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                            {member.name}
                        </p>
                        {member.status === 'pending' && (
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full">
                                Pending
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {member.email}
                    </p>
                </div>
            </div>

            {/* Role Indicator (Mobile) */}
            <div className="md:hidden">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-br ${roleInfo.color} text-white text-xs font-bold`}>
                    {roleInfo.label}
                </div>
            </div>

            {/* Role Dropdown (Desktop) */}
            <div className="hidden md:block w-40">
                <RoleDropdown
                    currentRole={member.role}
                    onChange={(newRole) => onRoleChange(member.id, newRole)}
                    disabled={!canManage || member.status === 'pending'}
                />
            </div>

            {/* Status */}
            <div className="hidden lg:block w-24">
                <span className={`
          px-2 py-1 rounded-md text-xs font-medium
          ${member.status === 'active'
                        ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                        : 'bg-orange-500/20 text-orange-600 dark:text-orange-400'
                    }
        `}>
                    {member.status === 'active' ? 'Active' : 'Pending'}
                </span>
            </div>

            {/* Joined Date */}
            <div className="hidden xl:block w-32 text-xs text-slate-500 dark:text-slate-400">
                {new Date(member.joinedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })}
            </div>

            {/* Actions */}
            {canManage && (
                <div className="w-8">
                    <button
                        onClick={() => onRemove(member.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Remove member"
                    >
                        <Icons.Trash className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};
