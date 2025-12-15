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
                {/* Header with Stats */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1b26] via-[#1e1f2e] to-[#1a1b26] p-8">
                    {/* Ambient Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-black text-white">Team Members</h1>
                                    <span className="px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm font-bold">
                                        {stats.total}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-lg">
                                    Manage roles and permissions for your team
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsPermissionsModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 text-white rounded-xl text-sm font-semibold transition-all"
                                >
                                    <Icons.Shield className="w-4 h-4" />
                                    View Permissions
                                </button>
                                <button
                                    onClick={() => setIsInviteModalOpen(true)}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-violet-500/20"
                                >
                                    <Icons.Plus className="w-4 h-4" />
                                    Invite Member
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <p className="text-xs text-slate-400 mb-1">Total</p>
                                <p className="text-2xl font-bold text-white">{stats.total}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                                <p className="text-xs text-emerald-300 mb-1">Active</p>
                                <p className="text-2xl font-bold text-emerald-400">{stats.active}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
                                <p className="text-xs text-orange-300 mb-1">Pending</p>
                                <p className="text-2xl font-bold text-orange-400">{stats.pending}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                                <p className="text-xs text-red-300 mb-1">Admins</p>
                                <p className="text-2xl font-bold text-red-400">{stats.admins}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
                                <p className="text-xs text-cyan-300 mb-1">Editors</p>
                                <p className="text-2xl font-bold text-cyan-400">{stats.editors}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-500/10 border border-slate-500/20 backdrop-blur-sm">
                                <p className="text-xs text-slate-300 mb-1">Viewers</p>
                                <p className="text-2xl font-bold text-slate-400">{stats.viewers}</p>
                            </div>
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
