/**
 * Agency Projects Page
 * 
 * Re-exports FreelancerProjectsPage with Agency-specific user context.
 * This allows sharing the same UI while using Agency mock data.
 * 
 * Future: Add agency-specific features like client tagging, bulk operations.
 */

import React from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_AGENCY_USER } from '../../../services/mock/dashboard';
import { MOCK_PROJECTS, MOCK_CLIENTS, Project, Client } from '../../../services/mock/freelancer';
import { Icons } from '../../../shared/components/Icons';
import { ProjectStatusTabs } from '../../freelancer/projects/ProjectStatusTabs';
import { ProjectCard } from '../../freelancer/projects/ProjectCard';
import { ProjectsEmptyState } from '../../freelancer/projects/ProjectsEmptyState';
import { CreateProjectModal } from '../../freelancer/projects/CreateProjectModal';
import { NeonButton } from '../../../shared/components/GlassUI';
import { useState, useMemo } from 'react';

interface AgencyProjectsPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
}

export const AgencyProjectsPage: React.FC<AgencyProjectsPageProps> = ({ onLogout, onNavigate }) => {
    // State
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Derived State: Filtered Projects
    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const matchesTab = activeTab === 'All' || p.status === activeTab;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [projects, activeTab, searchQuery]);

    // Derived State: Counts for Tabs
    const counts = useMemo(() => {
        const c: Record<string, number> = { All: projects.length };
        projects.forEach(p => {
            c[p.status] = (c[p.status] || 0) + 1;
        });
        return c;
    }, [projects]);

    // Helpers
    const getClient = (clientId: string): Client | undefined => {
        return MOCK_CLIENTS.find(c => c.id === clientId);
    };

    const handleCreateProject = (data: { projectName: string; clientName: string; clientEmail: string; status: string }) => {
        const newProject: Project = {
            id: `p_${Date.now()}`,
            name: data.projectName,
            clientId: 'c_temp',
            status: data.status as any,
            createdAt: new Date().toISOString(),
            thumbnail: undefined
        };
        setProjects([newProject, ...projects]);
    };

    const handleOpenProject = (projectId: string) => {
        console.log("Open Agency Project Workspace", projectId);
        onNavigate('project-detail');
    };

    const handleDeliver = (projectId: string) => {
        console.log("Deliver Agency Project", projectId);
        onNavigate('delivery');
    };

    return (
        <DashboardLayout user={MOCK_AGENCY_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="projects">
            <div className="max-w-7xl mx-auto py-4 md:py-8 space-y-8 min-h-[calc(100vh-140px)] flex flex-col">

                {/* --- A. PAGE HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Agency Projects</h1>
                        <p className="text-slate-400 text-sm">Manage all client projects across your agency.</p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                                <Icons.Search className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>
                        <NeonButton onClick={() => setIsModalOpen(true)} className="!w-auto px-6 bg-gradient-to-r from-violet-600 to-purple-600">
                            <div className="flex items-center gap-2">
                                <Icons.Plus className="w-4 h-4" /> <span className="hidden sm:inline">New Project</span>
                            </div>
                        </NeonButton>
                    </div>
                </div>

                {/* --- B. STATUS FILTER --- */}
                <ProjectStatusTabs
                    activeTab={activeTab}
                    onChange={(tab) => setActiveTab(tab as any)}
                    counts={counts}
                />

                {/* --- C. PROJECT GRID / EMPTY STATE --- */}
                <div className="flex-1">
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProjects.map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    client={getClient(project.clientId)}
                                    onOpen={() => handleOpenProject(project.id)}
                                    onDeliver={() => handleDeliver(project.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <ProjectsEmptyState onCreate={() => setIsModalOpen(true)} />
                        </div>
                    )}
                </div>

                {/* --- D. CREATE MODAL --- */}
                <CreateProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleCreateProject}
                />

            </div>
        </DashboardLayout>
    );
};
