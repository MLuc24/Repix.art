/**
 * MemberDetailPanel - Side panel to view detailed member information
 * Opens when user clicks on a member card
 */

import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamMember, ROLE_INFO, PERMISSIONS } from './types';

interface MemberDetailPanelProps {
    member: TeamMember | null;
    onClose: () => void;
}

export const MemberDetailPanel: React.FC<MemberDetailPanelProps> = ({ member, onClose }) => {
    if (!member) return null;

    const roleInfo = ROLE_INFO[member.role];
    const memberPermissions = PERMISSIONS.filter(p => p[member.role]);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-[#1a1b26] border-l border-white/10 z-50 overflow-y-auto shadow-2xl animate-slide-in-right">
                {/* Header */}
                <div className="sticky top-0 bg-[#1a1b26] border-b border-white/10 p-6 z-10">
                    <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Member Details</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                        >
                            <Icons.Close className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Member Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-16 h-16 rounded-2xl border-2 border-white/10"
                            />
                            {member.status === 'active' && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#1a1b26]" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white truncate">{member.name}</h3>
                            <p className="text-sm text-slate-400 truncate">{member.email}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Role */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Current Role</h4>
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${roleInfo.color} text-white`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-bold">{roleInfo.label}</span>
                                <Icons.Shield className="w-5 h-5 opacity-50" />
                            </div>
                            <p className="text-sm opacity-90">{roleInfo.description}</p>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Status</h4>
                        <div className="flex items-center gap-3">
                            <span className={`
                                px-3 py-1.5 rounded-lg text-sm font-semibold
                                ${member.status === 'active'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-orange-500/20 text-orange-400'
                                }
                            `}>
                                {member.status === 'active' ? 'Active' : 'Pending Invitation'}
                            </span>
                        </div>
                    </div>

                    {/* Join Date */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Joined</h4>
                        <div className="flex items-center gap-2 text-white">
                            <Icons.Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium">
                                {new Date(member.joinedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Permissions */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                            Permissions ({memberPermissions.length})
                        </h4>
                        <div className="space-y-2">
                            {memberPermissions.map(permission => (
                                <div
                                    key={permission.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <Icons.Check className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span className="text-sm text-white font-medium">{permission.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Stats */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Activity</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-slate-400 mb-1">Projects</p>
                                <p className="text-xl font-bold text-white">8</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-slate-400 mb-1">Edits</p>
                                <p className="text-xl font-bold text-white">142</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-slate-400 mb-1">Uploads</p>
                                <p className="text-xl font-bold text-white">56</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-slate-400 mb-1">Comments</p>
                                <p className="text-xl font-bold text-white">23</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-[#1a1b26] border-t border-white/10 p-6">
                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                        View Activity History
                    </button>
                </div>
            </div>
        </>
    );
};
