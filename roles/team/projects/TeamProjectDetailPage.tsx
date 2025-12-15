/**
 * TeamProjectDetailPage Component (R4.5)
 * 
 * Main collaboration view for team projects:
 * - Project header with status & members
 * - Image grid with assignments
 * - Internal comment panel
 * - Project activity summary
 */

import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import {
    MOCK_TEAM_PROJECT,
    TeamProject,
    TeamProjectImage,
    ImageStatus,
    InternalComment
} from '../../../services/mock/teamProjects';
import { TeamMember } from '../../../services/mock/teamDashboard';
import { TeamProjectHeader } from './TeamProjectHeader';
import { TeamImageGrid } from './TeamImageGrid';
import { InternalCommentPanel } from './InternalCommentPanel';
import { ProjectActivitySummary } from './ProjectActivitySummary';

interface TeamProjectDetailPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
}

export const TeamProjectDetailPage: React.FC<TeamProjectDetailPageProps> = ({
    onLogout,
    onNavigate,
}) => {
    // State (in real app, this would come from API)
    const [project, setProject] = useState<TeamProject>(MOCK_TEAM_PROJECT);
    const [comments, setComments] = useState<InternalComment[]>(MOCK_TEAM_PROJECT.internalComments);

    // Handlers
    const handleStatusChange = (status: TeamProject['status']) => {
        setProject(prev => ({ ...prev, status }));
    };

    const handleOpenClientReview = () => {
        onNavigate('client-review');
    };

    const handleDelivery = () => {
        onNavigate('delivery');
    };

    const handleBack = () => {
        onNavigate('projects');
    };

    const handleOpenEditor = (imageId: string) => {
        console.log('Opening editor for image:', imageId);
        onNavigate('editor');
    };

    const handleReassign = (imageId: string, member: TeamMember) => {
        setProject(prev => ({
            ...prev,
            images: prev.images.map(img =>
                img.id === imageId ? { ...img, assignedTo: member } : img
            ),
        }));
    };

    const handleStatusChangeImage = (imageId: string, status: ImageStatus) => {
        setProject(prev => ({
            ...prev,
            images: prev.images.map(img =>
                img.id === imageId ? { ...img, status } : img
            ),
        }));
    };

    const handleAddComment = (content: string) => {
        const newComment: InternalComment = {
            id: `cmt_${Date.now()}`,
            userId: 'user_001',
            userName: MOCK_TEAM_USER.name,
            userAvatar: MOCK_TEAM_USER.avatar,
            content,
            timestamp: new Date().toISOString(),
        };
        setComments(prev => [newComment, ...prev]);
    };

    // Calculate stats
    const imageStats = {
        total: project.images.length,
        approved: project.images.filter(i => i.status === 'approved').length,
        inProgress: project.images.filter(i => i.status === 'editing').length,
        review: project.images.filter(i => i.status === 'ready-for-review').length,
    };

    return (
        <DashboardLayout
            user={MOCK_TEAM_USER}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="projects"
        >
            <div className="max-w-7xl mx-auto py-4 md:py-6">
                {/* Project Header */}
                <TeamProjectHeader
                    project={project}
                    onStatusChange={handleStatusChange}
                    onOpenClientReview={handleOpenClientReview}
                    onDelivery={handleDelivery}
                    onBack={handleBack}
                />

                {/* Stats bar */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-[#1a1b26] border border-white/10 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-white">{imageStats.total}</p>
                        <p className="text-xs text-slate-500">Total</p>
                    </div>
                    <div className="bg-[#1a1b26] border border-amber-500/20 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-amber-400">{imageStats.inProgress}</p>
                        <p className="text-xs text-slate-500">Editing</p>
                    </div>
                    <div className="bg-[#1a1b26] border border-cyan-500/20 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-cyan-400">{imageStats.review}</p>
                        <p className="text-xs text-slate-500">Review</p>
                    </div>
                    <div className="bg-[#1a1b26] border border-emerald-500/20 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-emerald-400">{imageStats.approved}</p>
                        <p className="text-xs text-slate-500">Approved</p>
                    </div>
                </div>

                {/* Main content: Grid + Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Image Grid (2/3) */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Project Images</h2>
                            <span className="text-sm text-slate-400">{project.images.length} images</span>
                        </div>
                        <TeamImageGrid
                            images={project.images}
                            onOpenEditor={handleOpenEditor}
                            onReassign={handleReassign}
                            onStatusChange={handleStatusChangeImage}
                        />
                    </div>

                    {/* Sidebar (1/3) */}
                    <div className="space-y-6">
                        {/* Internal Comments */}
                        <div className="h-[400px]">
                            <InternalCommentPanel
                                comments={comments}
                                onAddComment={handleAddComment}
                            />
                        </div>

                        {/* Project Activity */}
                        <ProjectActivitySummary
                            activities={project.activities}
                            maxItems={4}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
