
import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { Icons } from '../../../shared/components/Icons';
import { MOCK_TEAM_MEMBERS } from './types';
import { MemberRow } from './MemberRow';
import { RolePermissionTable } from './RolePermissionTable';
import { InviteMemberModal } from './InviteMemberModal';
import { ConfirmRoleChangeModal } from './ConfirmRoleChangeModal';
import type { TeamMember, TeamRole } from './types';

interface TeamMembersPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
}

export const TeamMembersPage = ({ onLogout, onNavigate }: TeamMembersPageProps) => {
    const [members, setMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        memberId: string;
        memberName: string;
        currentRole: TeamRole;
        newRole: TeamRole;
    } | null>(null);

    const currentUserRole: TeamRole = 'admin'; // In real app, get from context/store

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
            console.log(`Role changed for ${confirmModal.memberName} to ${confirmModal.newRole}`);
        }
        setConfirmModal(null);
    };

    const handleRemoveMember = (memberId: string) => {
        const member = members.find(m => m.id === memberId);
        if (member && window.confirm(`Remove ${member.name} from the team?`)) {
            setMembers(prev => prev.filter(m => m.id !== memberId));
            console.log(`Removed member: ${member.name}`);
        }
    };

    const handleInviteMember = (email: string, role: TeamRole) => {
        // Mock invite - in real app would send API request
        console.log(`Invited ${email} as ${role}`);
        alert(`Invitation sent to ${email} as ${role}!`);
    };

    return (
        <DashboardLayout
            user={MOCK_TEAM_USER}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="team-members"
        >
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Team Members</h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                Manage who can do what in your team
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                {members.filter(m => m.status === 'active').length} active members
                            </div>
                            <button
                                onClick={() => setIsInviteModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <Icons.Plus className="w-4 h-4" />
                                Invite Member
                            </button>
                        </div>
                    </div>
                </div>

                {/* Members List */}
                <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Member</h3>
                            </div>
                            <div className="hidden md:block w-40">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Role</h3>
                            </div>
                            <div className="hidden lg:block w-24">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Status</h3>
                            </div>
                            <div className="hidden xl:block w-32">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Joined</h3>
                            </div>
                            {currentUserRole === 'admin' && (
                                <div className="w-8" />
                            )}
                        </div>
                    </div>

                    <div>
                        {members.map(member => (
                            <MemberRow
                                key={member.id}
                                member={member}
                                onRoleChange={handleRoleChange}
                                onRemove={handleRemoveMember}
                                currentUserRole={currentUserRole}
                            />
                        ))}
                    </div>
                </div>

                {/* Permission Table */}
                <RolePermissionTable />

            </div>

            {/* Modals */}
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
