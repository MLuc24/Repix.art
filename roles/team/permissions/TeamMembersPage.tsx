/**
 * TeamMembersPage - Redesigned (R4.8 Enhanced)
 * 
 * Modern, professional team member management with:
 * - Card-based member grid layout
 * - Search and filter functionality
 * - Role permissions modal (info only, can hide)
 * - Member detail side panel
 * - Stats overview
 * - Invite member modal
 */

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { Icons } from '../../../shared/components/Icons';
import { MOCK_TEAM_MEMBERS } from './types';
import { MemberCard } from './MemberCard';
import { RolePermissionsModal } from './RolePermissionsModal';
import { MemberDetailPanel } from './MemberDetailPanel';
import { InviteMemberModal } from './InviteMemberModal';
import { ConfirmRoleChangeModal } from './ConfirmRoleChangeModal';
import type { TeamMember, TeamRole } from './types';

interface TeamMembersPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
}

export const TeamMembersPage = ({ onLogout, onNavigate }: TeamMembersPageProps) => {
    const [members, setMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<TeamRole | 'all'>('all');
    const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        memberId: string;
        memberName: string;
        currentRole: TeamRole;
        newRole: TeamRole;
    } | null>(null);

    const currentUserRole: TeamRole = 'admin';

    // Filter and search members
    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'all' || member.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [members, searchQuery, roleFilter]);

    // Calculate stats
    const stats = useMemo(() => ({
        total: members.length,
        active: members.filter(m => m.status === 'active').length,
        pending: members.filter(m => m.status === 'pending').length,
        admins: members.filter(m => m.role === 'admin').length,
        editors: members.filter(m => m.role === 'editor').length,
        viewers: members.filter(m => m.role === 'viewer').length,
    }), [members]);

    const handleRoleChange = (memberId: string, newRole: TeamRole) => {
        const member = members.find(m => m.id === memberId);
        if (member) {
            setConfirmModal({
                isOpen: true,
                memberId,
                memberName: member.name,
                currentRole: member.role,
                newRole
            });
        }
    };

    const confirmRoleChange = () => {
        if (confirmModal) {
            setMembers(prev =>
                prev.map(m =>
                    m.id === confirmModal.memberId
                        ? { ...m, role: confirmModal.newRole }
                        : m
                )
            );
        }
        setConfirmModal(null);
    };

    const handleRemoveMember = (memberId: string) => {
        const member = members.find(m => m.id === memberId);
        if (member && window.confirm(`Remove ${member.name} from the team?`)) {
            setMembers(prev => prev.filter(m => m.id !== memberId));
        }
    };

    const handleInviteMember = (email: string, role: TeamRole) => {
        console.log(`Invited ${email} as ${role}`);
        alert(`Invitation sent to ${email} as ${role}!`);
        setIsInviteModalOpen(false);
    };

    return (
        <DashboardLayout
            user={MOCK_TEAM_USER}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="team-members"
        >
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Premium Header with Enhanced Stats */}
                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#1a1b26] via-[#1e1f2e] to-[#1a1b26] p-8 shadow-2xl">
                    {/* Ambient Glow Effects */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* Decorative Grid Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />

                    <div className="relative z-10">
                        {/* Title and Actions Row */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                            <div>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-600/30 to-violet-500/10 border border-violet-400/30 shadow-lg shadow-violet-500/20">
                                        <Icons.Shield className="w-8 h-8 text-violet-400" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black text-white mb-1 bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text">
                                            Team Members
                                        </h1>
                                        <p className="text-slate-400 text-base font-medium">
                                            Manage roles and permissions for your team
                                        </p>
                                    </div>
                                    <span className="px-4 py-2 rounded-xl bg-gradient-to-br from-violet-600/20 to-violet-500/10 border border-violet-400/30 text-violet-300 text-lg font-black shadow-lg shadow-violet-500/10">
                                        {stats.total}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsPermissionsModalOpen(true)}
                                    className="group flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-violet-400/40 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    <Icons.Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    <span>View Permissions</span>
                                </button>
                                <button
                                    onClick={() => setIsInviteModalOpen(true)}
                                    className="group flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white rounded-xl text-sm font-black transition-all shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 hover:scale-105"
                                >
                                    <Icons.Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    <span>Invite Member</span>
                                </button>
                            </div>
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { label: 'Total', value: stats.total, color: 'from-white/10 to-white/5', border: 'border-white/20', textColor: 'text-white', icon: Icons.User },
                                { label: 'Active', value: stats.active, color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-400/30', textColor: 'text-emerald-400', icon: Icons.Check },
                                { label: 'Pending', value: stats.pending, color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-400/30', textColor: 'text-orange-400', icon: Icons.Clock },
                                { label: 'Admins', value: stats.admins, color: 'from-red-500/20 to-red-600/10', border: 'border-red-400/30', textColor: 'text-red-400', icon: Icons.Shield },
                                { label: 'Editors', value: stats.editors, color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-400/30', textColor: 'text-cyan-400', icon: Icons.Pencil },
                                { label: 'Viewers', value: stats.viewers, color: 'from-slate-500/20 to-slate-600/10', border: 'border-slate-400/30', textColor: 'text-slate-400', icon: Icons.Eye }
                            ].map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-br ${stat.color} border ${stat.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 group shadow-lg`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Icon Background */}
                                    <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <stat.icon className="w-16 h-16" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <stat.icon className={`w-4 h-4 ${stat.textColor}`} />
                                            <p className={`text-xs ${stat.textColor} font-bold uppercase tracking-wider`}>{stat.label}</p>
                                        </div>
                                        <p className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Icons.Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search members by name or email..."
                            className="w-full pl-10 pr-4 py-3 bg-[#1a1b26] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="flex gap-2">
                        {(['all', 'admin', 'editor', 'viewer'] as const).map(role => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={`
                                    px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap
                                    ${roleFilter === role
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                                        : 'bg-[#1a1b26] border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                                    }
                                `}
                            >
                                {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Members Grid */}
                {filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredMembers.map(member => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                onRoleChange={handleRoleChange}
                                onRemove={handleRemoveMember}
                                onViewDetails={setSelectedMember}
                                currentUserRole={currentUserRole}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-[#1a1b26] border border-white/10 rounded-2xl">
                        <Icons.Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-400 mb-2">No members found</h3>
                        <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Modals and Panels */}
            <RolePermissionsModal
                isOpen={isPermissionsModalOpen}
                onClose={() => setIsPermissionsModalOpen(false)}
            />

            <MemberDetailPanel
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
            />

            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onInvite={handleInviteMember}
            />

            {confirmModal && (
                <ConfirmRoleChangeModal
                    isOpen={confirmModal.isOpen}
                    onClose={() => setConfirmModal(null)}
                    onConfirm={confirmRoleChange}
                    memberName={confirmModal.memberName}
                    currentRole={confirmModal.currentRole}
                    newRole={confirmModal.newRole}
                />
            )}
        </DashboardLayout>
    );
};
