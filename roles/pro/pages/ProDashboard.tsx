
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { 
  SpotlightWrapper,
  DashboardImageGeneratorHero,
  DashboardQuickPrompt
} from '../../../features/dashboard/components/SpotlightUI';
import { 
  ProQuickActionsBar, 
  ProCreditWidget, 
  ProRecentFilesSection,
  ProPromoBlock
} from '../../../features/dashboard/components/ProWidgets';
import { RemixFeedPro } from '../feed/RemixFeedPro'; 
import { MOCK_PRO_USER, MOCK_FREELANCER_USER } from '../../../services/mock/dashboard';
import { FreelancerDashboardCard } from '../../freelancer/foundation/FreelancerDashboardCard'; // NEW IMPORT

interface ProDashboardProps {
  onLogout: () => void;
  onNavigate: (path: string) => void;
  isFreelancer?: boolean; // Prop to force layout
}

export const ProDashboard = ({ onLogout, onNavigate, isFreelancer }: ProDashboardProps) => {
  const [quickPrompt, setQuickPrompt] = useState('');
  
  // Use correct user mock
  const user = isFreelancer ? MOCK_FREELANCER_USER : MOCK_PRO_USER;

  // Handlers
  const handleQuickGenerate = () => {
    if (quickPrompt.trim()) {
      sessionStorage.setItem('gen_prompt', quickPrompt);
      sessionStorage.setItem('gen_mode', 'text-to-image');
      onNavigate('generator');
    }
  };

  const handleAction = (id: string) => {
    switch(id) {
      case 'batch_gen': 
        sessionStorage.setItem('gen_mode', 'text-to-image'); 
        onNavigate('generator'); 
        break;
      case 'editor': onNavigate('editor'); break;
      case 'remove_bg': onNavigate('remix'); break;
      case 'upscale': onNavigate('editor'); break;
      default: onNavigate('dashboard');
    }
  };

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      onNavigate={onNavigate} 
      activePage="dashboard"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* SECTION 1: HERO & CREATION */}
        <SpotlightWrapper>
           <DashboardImageGeneratorHero 
             onTextToImage={() => onNavigate('generator')}
             onRemix={() => onNavigate('remix')}
           />
           <DashboardQuickPrompt 
             value={quickPrompt}
             onChange={setQuickPrompt}
             onSubmit={handleQuickGenerate}
             credits={user.credits}
             onBuyCredits={() => onNavigate('credits')}
           />
        </SpotlightWrapper>

        {/* SECTION 2: PRO WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (2/3): Tools & Feed */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Quick Actions Bar */}
             <div>
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pro Tools</h2>
               </div>
               <ProQuickActionsBar onAction={handleAction} />
             </div>

             {/* Remix Feed */}
             <div className="pt-2">
                <RemixFeedPro onNavigate={onNavigate} />
             </div>
          </div>

          {/* RIGHT COLUMN (1/3): Status, Promo, FREELANCER CARD */}
          <div className="lg:col-span-1 space-y-6">
             
             {/* FREELANCER ENTRY (Only if Freelancer) */}
             {isFreelancer && (
               <div className="h-40 animate-fade-in-up">
                 <FreelancerDashboardCard onClick={() => onNavigate('projects')} />
               </div>
             )}

             {/* Credit Status */}
             <div>
                <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Workspace Status</h2>
                <ProCreditWidget credits={user.credits} onTopUp={() => onNavigate('credits')} />
             </div>
             
             {/* Feature Promo */}
             {!isFreelancer && <ProPromoBlock />}

             {/* Mini Notification / Tip */}
             <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 flex items-start gap-3 shadow-sm">
                <div className="p-1.5 rounded bg-blue-500/10 text-blue-500 mt-0.5"><Icons.Sparkles className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Batch Workflow</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    You can now select multiple files in "Upload" and apply the same preset to all of them instantly.
                  </p>
                </div>
             </div>
          </div>

        </div>

        {/* SECTION 3: RECENT ASSETS */}
        <div className="border-t border-white/5 pt-8">
           <ProRecentFilesSection onNavigate={onNavigate} />
        </div>

      </div>
    </DashboardLayout>
  );
};
