/**
 * CreateTeamModal Component (R4.1)
 * 
 * Simple modal for creating a new team.
 * Features:
 * - Team name (required)
 * - Description (optional)
 * - Create / Cancel buttons
 * 
 * Note: No member invite at R4.1 - that comes in later releases.
 */

import React, { useState } from 'react';
import { GlassModal } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';
import { useWorkspace, Team } from './WorkspaceContextProvider';

interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
    const { addTeam } = useWorkspace();

    // Form state
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState('');

    // Reset form on close
    const handleClose = () => {
        setTeamName('');
        setDescription('');
        setError('');
        setIsCreating(false);
        onClose();
    };

    // Handle create
    const handleCreate = async () => {
        // Validate
        if (!teamName.trim()) {
            setError('Team name is required');
            return;
        }

        if (teamName.trim().length < 2) {
            setError('Team name must be at least 2 characters');
            return;
        }

        setError('');
        setIsCreating(true);

        // Simulate async creation
        await new Promise(resolve => setTimeout(resolve, 800));

        // Create team object
        const newTeam: Team = {
            id: `team_${Date.now()}`,
            name: teamName.trim(),
            description: description.trim() || undefined,
            ownerId: 'current_user', // Would come from auth
            createdAt: new Date().toISOString(),
            memberCount: 1, // Just the owner initially
        };

        // Add to context (this also auto-switches to the new team)
        addTeam(newTeam);

        // Close modal
        handleClose();
    };

    return (
        <GlassModal isOpen={isOpen} onClose={handleClose} className="max-w-md">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Icons.Layout className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Create New Team</h2>
                    <p className="text-sm text-slate-400">Start collaborating with others</p>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-4 mb-6">
                {/* Team Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Team Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g., Rocket Studio"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                        maxLength={50}
                        autoFocus
                    />
                    {error && (
                        <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                            <Icons.AlertTriangle className="w-3.5 h-3.5" />
                            {error}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description <span className="text-slate-500">(optional)</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What does your team do?"
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                        maxLength={200}
                    />
                </div>
            </div>

            {/* Info Note */}
            <div className="flex items-start gap-2 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-6">
                <Icons.Bolt className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-400">
                    You can invite team members after creating your team.
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={handleClose}
                    disabled={isCreating}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleCreate}
                    disabled={isCreating || !teamName.trim()}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isCreating ? (
                        <>
                            <Icons.Refresh className="w-4 h-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Icons.Plus className="w-4 h-4" />
                            Create Team
                        </>
                    )}
                </button>
            </div>
        </GlassModal>
    );
};
