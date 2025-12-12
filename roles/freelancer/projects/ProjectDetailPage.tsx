
import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_FREELANCER_USER } from '../../../services/mock/dashboard';
import { MOCK_PROJECTS, MOCK_CLIENTS, MOCK_PROJECT_ASSETS, Project, ProjectAsset } from '../../../services/mock/freelancer';
import { ProjectHeader } from './ProjectHeader';
import { ProjectQuickActions } from './ProjectQuickActions';
import { ProjectImageGrid } from './ProjectImageGrid';
import { ProjectInfoPanel } from './ProjectInfoPanel';
import { ProjectTimeline } from './ProjectTimeline';
import { Icons } from '../../../shared/components/Icons';

type TabView = 'assets' | 'timeline';

export const ProjectDetailPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  // Mock loading specific project (In real app, use ID from route)
  const [project, setProject] = useState<Project>(MOCK_PROJECTS[0]);
  const [assets, setAssets] = useState<ProjectAsset[]>(MOCK_PROJECT_ASSETS);
  const [activeTab, setActiveTab] = useState<TabView>('assets');
  
  const client = MOCK_CLIENTS.find(c => c.id === project.clientId);

  const handleStatusChange = (newStatus: Project['status']) => {
    setProject(prev => ({ ...prev, status: newStatus }));
  };

  const handleQuickAction = (action: string) => {
    if (action === 'generate') {
      // Set session to context-aware gen
      sessionStorage.setItem('gen_mode', 'image-to-image');
      onNavigate('generator');
    } else if (action === 'upload') {
      onNavigate('upload');
    }
  };

  const handleOpenAsset = (asset: ProjectAsset) => {
    // Pass asset context to Editor
    sessionStorage.setItem('editor_image', asset.src);
    onNavigate('editor');
  };

  const handleDeleteAsset = (id: string) => {
    if(confirm('Remove this asset from project?')) {
      setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <DashboardLayout user={MOCK_FREELANCER_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="projects">
      <div className="flex h-[calc(100vh-140px)] -mt-4 border-t border-white/5">
        
        {/* MAIN WORKSPACE (Left) */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#020617] relative">
           <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              
              <ProjectHeader 
                project={project}
                client={client}
                onStatusChange={handleStatusChange}
                onBack={() => onNavigate('projects')}
                onDeliver={() => onNavigate('delivery')}
                onOpenReview={() => onNavigate('client-review')}
              />

              {/* View Switcher Tabs */}
              <div className="flex gap-6 border-b border-white/5 mb-6">
                 <button 
                   onClick={() => setActiveTab('assets')}
                   className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'assets' ? 'text-white border-violet-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                 >
                   <Icons.Image className="w-4 h-4" /> Assets
                 </button>
                 <button 
                   onClick={() => setActiveTab('timeline')}
                   className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'timeline' ? 'text-white border-violet-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                 >
                   <Icons.Activity className="w-4 h-4" /> Status & Timeline
                 </button>
              </div>

              {activeTab === 'assets' ? (
                <>
                  <ProjectQuickActions onAction={handleQuickAction} />
                  <div className="mt-4">
                     <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                       Assets <span className="text-xs font-normal text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{assets.length}</span>
                     </h2>
                     <ProjectImageGrid 
                       assets={assets}
                       onOpen={handleOpenAsset}
                       onDelete={handleDeleteAsset}
                     />
                  </div>
                </>
              ) : (
                <ProjectTimeline />
              )}
           </div>
        </div>

        {/* INFO PANEL (Right) */}
        <ProjectInfoPanel project={project} assetCount={assets.length} />

      </div>
    </DashboardLayout>
  );
};
