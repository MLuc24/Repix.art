/**
 * MemberDetailPanel - Premium Side Panel with Enhanced Design
 * Glassmorphism, gradients, and smooth animations
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
            {/* Enhanced Backdrop with Blur */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 animate-fade-in"
                onClick={onClose}
            />

            {/* Premium Panel with Slide Animation */}
            <div className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-gradient-to-br from-[#1a1b26] via-[#1e1f2e] to-[#1a1b26] border-l border-white/20 z-50 overflow-y-auto shadow-2xl shadow-black/50 animate-slide-in-right">
                {/* Ambient Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Sticky Header with Glassmorphism */}
                <div className="sticky top-0 bg-[#1a1b26]/80 backdrop-blur-2xl border-b border-white/10 p-6 z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-white mb-1">Member Profile</h2>
                            <p className="text-sm text-slate-400">Complete information overview</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-400/30 transition-all text-slate-400 hover:text-red-300 group"
                        >
                            <Icons.Close className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Member Card Header */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-5">
                        <div className="flex items-center gap-4">
                            <div className="relative group/avatar">
                                {/* Avatar Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 to-cyan-600/40 rounded-2xl blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />

                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="relative w-20 h-20 rounded-2xl border-3 border-white/20 shadow-2xl"
                                />
                                {member.status === 'active' && (
                                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-emerald-500 rounded-full border-3 border-[#1a1b26] shadow-lg shadow-emerald-500/50 animate-pulse">
                                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-white truncate mb-1">{member.name}</h3>
                                <p className="text-sm text-slate-400 truncate mb-3">{member.email}</p>

                                {/* Role Badge */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-br ${roleInfo.color} text-white text-sm font-bold shadow-lg`}>
                                    <Icons.Shield className="w-4 h-4" />
                                    <span>{roleInfo.label}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="relative z-10 p-6 space-y-6">
                    {/* Role Detail Card */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Icons.Shield className="w-4 h-4 text-violet-400" />
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role & Permissions</h4>
                        </div>

                        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${roleInfo.color} p-5 shadow-xl`}>
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <span className="text-2xl font-black text-white">{roleInfo.label}</span>
                                    </div>
                                    <Icons.Shield className="w-8 h-8 text-white/30" />
                                </div>
                                <p className="text-sm text-white/90 leading-relaxed">{roleInfo.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status & Join Date Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Status Card */}
                        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group">
                            <div className="flex items-center gap-2 mb-2">
                                <Icons.Check className="w-3.5 h-3.5 text-slate-400" />
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</p>
                            </div>
                            <span className={`
                                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border
                                ${member.status === 'active'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                                    : 'bg-orange-500/20 text-orange-300 border-orange-400/30'
                                }
                            `}>
                                <span className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-orange-400'}`} />
                                {member.status === 'active' ? 'Active' : 'Pending'}
                            </span>
                        </div>

                        {/* Join Date Card */}
                        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group">
                            <div className="flex items-center gap-2 mb-2">
                                <Icons.Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</p>
                            </div>
                            <p className="text-sm text-white font-bold">
                                {new Date(member.joinedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Permissions List */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Icons.Shield className="w-4 h-4 text-cyan-400" />
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Permissions</h4>
                            </div>
                            <span className="px-2 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                                {memberPermissions.length}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {memberPermissions.map((permission, index) => (
                                <div
                                    key={permission.id}
                                    className="group flex items-center gap-3 p-3.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-400/30 transition-all duration-300"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Icons.Check className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <span className="text-sm text-white font-semibold">{permission.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Stats with Gradient Cards */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Icons.Activity className="w-4 h-4 text-violet-400" />
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity Overview</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Projects', value: '8', color: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-400/30', icon: Icons.Folder },
                                { label: 'Edits', value: '142', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-400/30', icon: Icons.Pencil },
                                { label: 'Uploads', value: '56', color: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-400/30', icon: Icons.Upload },
                                { label: 'Comments', value: '23', color: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-400/30', icon: Icons.MessageSquare }
                            ].map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-br ${stat.color} border ${stat.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 group`}
                                >
                                    <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <stat.icon className="w-12 h-12" />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-xs text-slate-300 mb-1.5 font-semibold">{stat.label}</p>
                                        <p className="text-2xl font-black text-white">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced Footer */}
                <div className="sticky bottom-0 bg-[#1a1b26]/80 backdrop-blur-2xl border-t border-white/10 p-6 z-10">
                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold transition-all shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] group">
                        <div className="flex items-center justify-center gap-2">
                            <Icons.Activity className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>View Activity History</span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};
