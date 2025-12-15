/**
 * TeamImageGrid Component (R4.5)
 * 
 * Grid of project images with team collaboration info:
 * - Image preview
 * - Assigned member avatar
 * - Status badge
 * - Actions (Edit, Reassign)
 */

import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamProjectImage, ImageStatus } from '../../../services/mock/teamProjects';
import { TeamMember, MOCK_TEAM_MEMBERS } from '../../../services/mock/teamDashboard';
import { ImageAssignmentBadge } from './ImageAssignmentBadge';

interface TeamImageGridProps {
    images: TeamProjectImage[];
    onOpenEditor?: (imageId: string) => void;
    onReassign?: (imageId: string, member: TeamMember) => void;
    onStatusChange?: (imageId: string, status: ImageStatus) => void;
}

export const TeamImageGrid: React.FC<TeamImageGridProps> = ({
    images,
    onOpenEditor,
    onReassign,
    onStatusChange,
}) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(image => (
                <div
                    key={image.id}
                    className="group relative bg-[#1a1b26] border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all"
                >
                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden">
                        <img
                            src={image.src}
                            alt={image.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                onClick={() => onOpenEditor?.(image.id)}
                                className="p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                                title="Open in Editor"
                            >
                                <Icons.Sliders className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setActiveMenu(activeMenu === image.id ? null : image.id)}
                                className="p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                                title="More options"
                            >
                                <Icons.MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Assignment badge (top-left) */}
                        <div className="absolute top-2 left-2">
                            <ImageAssignmentBadge
                                assignedTo={image.assignedTo}
                                status={image.status}
                            />
                        </div>
                    </div>

                    {/* Image info */}
                    <div className="p-3">
                        <p className="text-sm font-medium text-white truncate mb-1">{image.name}</p>
                        <p className="text-xs text-slate-500">
                            {image.lastEditedBy && (
                                <>Last edited by {image.lastEditedBy}</>
                            )}
                        </p>
                    </div>

                    {/* Dropdown menu */}
                    {activeMenu === image.id && (
                        <>
                            <div className="fixed inset-0 z-20" onClick={() => setActiveMenu(null)} />
                            <div className="absolute top-2 right-2 z-30 bg-[#1a1b26] border border-white/10 rounded-xl shadow-xl overflow-hidden min-w-[180px]">
                                {/* Reassign section */}
                                <div className="px-3 py-2 border-b border-white/5">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-2">Reassign to</p>
                                    <div className="flex flex-wrap gap-1">
                                        {MOCK_TEAM_MEMBERS.slice(1).map(member => (
                                            <button
                                                key={member.id}
                                                onClick={() => {
                                                    onReassign?.(image.id, member);
                                                    setActiveMenu(null);
                                                }}
                                                className={`w-7 h-7 rounded-full border-2 transition-all ${image.assignedTo?.id === member.id
                                                        ? 'border-cyan-500'
                                                        : 'border-transparent hover:border-white/30'
                                                    }`}
                                                title={member.name}
                                            >
                                                <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Status section */}
                                <div className="px-3 py-2">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-2">Set status</p>
                                    <div className="space-y-1">
                                        {(['editing', 'ready-for-review', 'approved', 'needs-revision'] as ImageStatus[]).map(status => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    onStatusChange?.(image.id, status);
                                                    setActiveMenu(null);
                                                }}
                                                className={`w-full px-3 py-1.5 rounded-lg text-left text-xs font-medium transition-colors ${image.status === status
                                                        ? 'bg-cyan-500/20 text-cyan-400'
                                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};
