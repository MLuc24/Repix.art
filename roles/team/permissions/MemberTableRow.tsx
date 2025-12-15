/**
 * MemberTableRow - Compact table row for team members
 * Click row to view details in panel
 */

import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamMember, ROLE_INFO } from './types';

interface MemberTableRowProps {
    member: TeamMember;
    onViewDetails: (member: TeamMember) => void;
}

export const MemberTableRow: React.FC<MemberTableRowProps> = ({ member, onViewDetails }) => {
    const roleInfo = ROLE_INFO[member.role];

    return (
        <tr
            onClick={() => onViewDetails(member)}
            className="group border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all duration-200"
        >
            {/* Member Info */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-xl border-2 border-white/10 group-hover:border-violet-400/40 transition-all"
                        />
                        {member.status === 'active' ? (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#1a1b26]" />
                        ) : (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-[#1a1b26] flex items-center justify-center">
                                <Icons.Clock className="w-2 h-2 text-white" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate group-hover:text-violet-300 transition-colors">
                            {member.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{member.email}</p>
                    </div>
                </div>
            </td>

            {/* Role */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br ${roleInfo.color} text-white text-xs font-bold shadow-md`}>
                    <Icons.Shield className="w-3 h-3" />
                    <span>{roleInfo.label}</span>
                </div>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <span className={`
                    inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border
                    ${member.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                        : 'bg-orange-500/20 text-orange-300 border-orange-400/30'
                    }
                `}>
                    <span className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                    {member.status === 'active' ? 'Active' : 'Pending'}
                </span>
            </td>

            {/* Joined Date */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Icons.Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                        {new Date(member.joinedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            </td>

            {/* Arrow Indicator */}
            <td className="px-6 py-4 w-12">
                <Icons.ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </td>
        </tr>
    );
};
