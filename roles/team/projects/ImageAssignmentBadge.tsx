/**
 * ImageAssignmentBadge Component (R4.5)
 * 
 * Shows assigned team member avatar on an image card.
 * Used to indicate who is responsible for this image.
 */

import React from 'react';
import { TeamMember } from '../../../services/mock/teamDashboard';
import { ImageStatus } from '../../../services/mock/teamProjects';

interface ImageAssignmentBadgeProps {
    assignedTo?: TeamMember;
    status: ImageStatus;
    size?: 'sm' | 'md';
}

// Status colors and labels
const STATUS_CONFIG: Record<ImageStatus, { color: string; label: string; bgColor: string }> = {
    'editing': {
        color: 'text-amber-400',
        label: 'Editing',
        bgColor: 'bg-amber-500/20 border-amber-500/30'
    },
    'ready-for-review': {
        color: 'text-cyan-400',
        label: 'Ready',
        bgColor: 'bg-cyan-500/20 border-cyan-500/30'
    },
    'approved': {
        color: 'text-emerald-400',
        label: 'Approved',
        bgColor: 'bg-emerald-500/20 border-emerald-500/30'
    },
    'needs-revision': {
        color: 'text-red-400',
        label: 'Revise',
        bgColor: 'bg-red-500/20 border-red-500/30'
    },
};

export const ImageAssignmentBadge: React.FC<ImageAssignmentBadgeProps> = ({
    assignedTo,
    status,
    size = 'sm'
}) => {
    const config = STATUS_CONFIG[status];
    const sizeClass = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';

    return (
        <div className="flex items-center gap-1.5">
            {/* Assigned member avatar */}
            {assignedTo && (
                <div className="relative" title={`Assigned to ${assignedTo.name}`}>
                    <img
                        src={assignedTo.avatar}
                        alt={assignedTo.name}
                        className={`${sizeClass} rounded-full border-2 border-[#1a1b26]`}
                    />
                    {/* Online indicator */}
                    {assignedTo.status === 'online' && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1a1b26]" />
                    )}
                </div>
            )}

            {/* Status badge */}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${config.bgColor} ${config.color}`}>
                {config.label}
            </span>
        </div>
    );
};

/**
 * Inline status badge without avatar
 */
export const ImageStatusBadge: React.FC<{ status: ImageStatus }> = ({ status }) => {
    const config = STATUS_CONFIG[status];

    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${config.bgColor} ${config.color}`}>
            {config.label}
        </span>
    );
};
