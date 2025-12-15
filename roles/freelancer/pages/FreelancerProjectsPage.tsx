
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_FREELANCER_USER } from '../../../services/mock/dashboard';
import { MOCK_PROJECTS, MOCK_CLIENTS, Project, Client } from '../../../services/mock/freelancer';
import { Icons } from '../../../shared/components/Icons';
import { ProjectStatusTabs } from '../projects/ProjectStatusTabs';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectsEmptyState } from '../projects/ProjectsEmptyState';
import { CreateProjectModal } from '../projects/CreateProjectModal';
import { NeonButton, GlassModal } from '../../../shared/components/GlassUI';
import { UploadDropzone } from '../../../features/upload-sync/components/UploadUI';
import { SyncLiteModal } from '../../../features/sync/components/SyncLiteModal';
import { FolderPickerModal, SyncProgressView } from '../../../features/upload-sync/components/SyncLiteUI';

export const FreelancerProjectsPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  // State
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sync State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false);
  const [isSyncingFolder, setIsSyncingFolder] = useState(false);
  const [isSyncSuccessOpen, setIsSyncSuccessOpen] = useState(false);
  const [isSyncSelectionOpen, setIsSyncSelectionOpen] = useState(false);
  
  // Multi-Upload State (New)
  const [isUploadSelectionOpen, setIsUploadSelectionOpen] = useState(false);
  const [activeUploadTab, setActiveUploadTab] = useState<'local' | 'drive' | 'cloud' | 'link'>('local');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccessOpen, setIsUploadSuccessOpen] = useState(false);

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
      clientId: 'c_temp', // In a real app, we'd create the client or link existing
      status: data.status as any,
      createdAt: new Date().toISOString(),
      thumbnail: undefined // No image yet
    };
    setProjects([newProject, ...projects]);
  };

  const handleOpenProject = (projectId: string) => {
    // Navigate to Project Detail Workspace instead of Editor directly
    console.log("Open Project Workspace", projectId);
    onNavigate('project-detail');
  };

  const handleDeliver = (projectId: string) => {
    // Mock delivery flow
    console.log("Deliver Project", projectId);
    onNavigate('delivery');
  };

  return (
    <DashboardLayout user={MOCK_FREELANCER_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="projects">
      <div className="max-w-7xl mx-auto py-4 md:py-8 space-y-8 min-h-[calc(100vh-140px)] flex flex-col">
        
        {/* --- A. PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Client Projects</h1>
            <p className="text-slate-400 text-sm">Manage your freelance jobs efficiently.</p>
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
             <NeonButton onClick={() => setIsSyncSelectionOpen(true)} className="!w-auto px-4 bg-white/5 border border-white/10 hover:bg-white/10">
                <div className="flex items-center gap-2">
                   <Icons.Refresh className="w-4 h-4" /> <span className="hidden sm:inline">Sync</span>
                </div>
             </NeonButton>
             <NeonButton onClick={() => setIsModalOpen(true)} className="!w-auto px-6 bg-gradient-to-r from-cyan-600 to-blue-600">
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

        {/* --- MULTI-UPLOAD MODAL --- */}
        <GlassModal isOpen={isUploadSelectionOpen} onClose={() => setIsUploadSelectionOpen(false)}>
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Multi-Source Upload</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Import media from your device or cloud services.</p>
            </div>

            <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
                {[
                    { id: 'local', label: 'Device', icon: Icons.Smartphone, color: 'violet' },
                    { id: 'drive', label: 'Drive', icon: Icons.Google, color: 'blue' },
                    { id: 'cloud', label: 'Cloud', icon: Icons.Cloud, color: 'cyan' },
                    { id: 'link', label: 'Link', icon: Icons.Link, color: 'pink' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveUploadTab(tab.id as any)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all whitespace-nowrap
                            ${activeUploadTab === tab.id 
                                ? `bg-${tab.color}-100 dark:bg-${tab.color}-900/30 border-${tab.color}-500 text-${tab.color}-700 dark:text-${tab.color}-400` 
                                : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }
                        `}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[300px] flex flex-col">
                {activeUploadTab === 'local' && (
                    <div className="animate-fade-in">
                        <UploadDropzone onFilesSelected={() => {
                            setIsUploadSelectionOpen(false);
                            setIsUploading(true);
                        }} />
                    </div>
                )}
                {activeUploadTab !== 'local' && (
                     <div className="flex flex-col items-center justify-center h-full text-center">
                         <p className="mb-4 text-slate-500">Connect to {activeUploadTab}...</p>
                         <NeonButton onClick={() => { setIsUploadSelectionOpen(false); setIsUploading(true); }}>Connect</NeonButton>
                     </div>
                )}
            </div>
        </div>
      </GlassModal>

        {/* --- SYNC COMPONENT FAMILY --- */}
        <SyncLiteModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} onNavigate={onNavigate} />
        
        <FolderPickerModal 
            isOpen={isFolderPickerOpen} 
            onClose={() => setIsFolderPickerOpen(false)} 
            onConfirm={() => {
                setIsFolderPickerOpen(false);
                setIsSyncingFolder(true);
            }} 
        />

        <GlassModal isOpen={isSyncingFolder} onClose={() => {}}>
            <SyncProgressView onComplete={() => {
                setIsSyncingFolder(false);
                setIsSyncSuccessOpen(true);
            }} />
        </GlassModal>

        <GlassModal isOpen={isUploading} onClose={() => {}}>
            <SyncProgressView onComplete={() => {
                setIsUploading(false);
                setIsUploadSuccessOpen(true);
            }} />
        </GlassModal>

        <GlassModal isOpen={isUploadSuccessOpen} onClose={() => setIsUploadSuccessOpen(false)}>
            <div className="text-center p-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upload Successful!</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Assets added to project library.</p>
                <NeonButton onClick={() => setIsUploadSuccessOpen(false)} className="mx-auto">Finish</NeonButton>
            </div>
        </GlassModal>

        <GlassModal isOpen={isSyncSuccessOpen} onClose={() => setIsSyncSuccessOpen(false)}>
            <div className="text-center p-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sync Complete!</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Successfully organized and added new photos to your library.
                </p>
                <NeonButton onClick={() => setIsSyncSuccessOpen(false)} className="mx-auto">
                    Awesome
                </NeonButton>
              <NeonButton onClick={() => setIsUploadSelectionOpen(true)} className="!w-auto px-4 bg-white/5 border border-white/10 hover:bg-white/10">
                 <div className="flex items-center gap-2">
                    <Icons.Upload className="w-4 h-4" /> <span className="hidden sm:inline">Upload</span>
                 </div>
              </NeonButton>
            </div>
        </GlassModal>

        <GlassModal isOpen={isSyncSelectionOpen} onClose={() => setIsSyncSelectionOpen(false)}>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sync Source</h2>
                <p className="text-slate-500 dark:text-slate-400">Where would you like to import photos from?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => {
                        setIsSyncSelectionOpen(false);
                        setIsSyncModalOpen(true);
                    }}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-violet-50 dark:hover:bg-violet-600/20 hover:border-violet-500 hover:shadow-lg transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icons.Smartphone className="w-8 h-8 text-violet-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-xs text-slate-500 text-center">Scan QR to connect</p>
                </button>
                <button 
                    onClick={() => {
                        setIsSyncSelectionOpen(false);
                        setIsFolderPickerOpen(true);
                    }}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-600/20 hover:border-blue-500 hover:shadow-lg transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icons.Layout className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Computer</h3>
                    <p className="text-xs text-slate-500 text-center">Local folders</p>
                </button>
            </div>
        </GlassModal>

      </div>
    </DashboardLayout>
  );
};
