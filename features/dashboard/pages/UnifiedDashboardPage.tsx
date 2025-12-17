
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  SpotlightWrapper, 
  DashboardImageGeneratorHero,
  DashboardQuickPrompt
} from '../components/SpotlightUI';
import { 
  ProCreditWidget, 
  ProRecentFilesSection,
  ProPromoBlock
} from '../components/ProWidgets';
import { RemixFeedPro } from '../../../roles/pro/feed/RemixFeedPro'; 
import { FreelancerDashboardCard } from '../../../roles/freelancer/foundation/FreelancerDashboardCard'; 
import { MOCK_USER, MOCK_PRO_USER, MOCK_FREELANCER_USER, MOCK_TEAM_USER } from '../../../services/mock/dashboard';

// --- ROLE CONFIG ---
const ROLE_LEVELS = {
  casual: 0,
  pro: 1,
  freelancer: 2,
  team: 3,
  agency: 4
};

interface UnifiedDashboardProps {
  onLogout: () => void;
  onNavigate: (path: string) => void;
  userRole: 'casual' | 'pro' | 'freelancer' | 'team' | 'agency';
  userCredits?: number;
}

// --- UNIFIED QUICK ACTIONS ---
const quickActions = [
  { id: 'editor', label: 'Editor', icon: <Icons.Sliders />, color: 'text-violet-500', minRole: 'casual' },
  { id: 'remix', label: 'Remix', icon: <Icons.Sparkles />, color: 'text-fuchsia-500', minRole: 'casual' },
  { id: 'enhance', label: 'Enhance', icon: <Icons.Bolt />, color: 'text-amber-500', minRole: 'casual' },
  // Pro Tools
  { id: 'batch_gen', label: 'Batch Gen', icon: <Icons.Layout />, color: 'text-cyan-500', minRole: 'pro' },
  { id: 'upscale', label: 'HD Upscale', icon: <Icons.Maximize />, color: 'text-emerald-500', minRole: 'pro' },
  { id: 'remove_bg', label: 'Smart Cutout', icon: <Icons.Scissors />, color: 'text-pink-500', minRole: 'pro' },
];

export const UnifiedDashboardPage = ({ onLogout, onNavigate, userRole, userCredits }: UnifiedDashboardProps) => {
  const [quickPrompt, setQuickPrompt] = useState('');
  
  // Determine User Context based on Role
  const currentUser = 
    userRole === 'team' || userRole === 'agency' ? MOCK_TEAM_USER :
    userRole === 'freelancer' ? MOCK_FREELANCER_USER :
    userRole === 'pro' ? MOCK_PRO_USER :
    MOCK_USER;

  const currentRoleLevel = ROLE_LEVELS[userRole] ?? 0;

  // Handlers
  const handleQuickGenerate = () => {
    if (quickPrompt.trim()) {
      sessionStorage.setItem('gen_prompt', quickPrompt);
      sessionStorage.setItem('gen_mode', 'text-to-image');
      onNavigate('generator');
    }
  };

  const handleAction = (id: string, minRole: string) => {
    const requiredLevel = ROLE_LEVELS[minRole as keyof typeof ROLE_LEVELS] || 0;
    
    // Lock Check
    if (currentRoleLevel < requiredLevel) {
      onNavigate('subscription');
      return;
    }

    // Navigation Logic
    switch(id) {
      case 'batch_gen': 
        sessionStorage.setItem('gen_mode', 'text-to-image'); 
        onNavigate('generator'); 
        break;
      case 'editor': onNavigate('editor'); break;
      case 'enhance': onNavigate('editor'); break;
      case 'remix': 
      case 'remove_bg': 
        onNavigate('remix'); 
        break;
      case 'upscale': onNavigate('editor'); break;
      default: onNavigate('dashboard');
    }
  };

  return (
    <DashboardLayout 
      user={currentUser} 
      onLogout={onLogout} 
      onNavigate={onNavigate} 
      activePage="dashboard"
      currentCredits={userCredits ?? currentUser.credits}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- SECTION 1: HERO & CREATION (All Roles) --- */}
        <SpotlightWrapper>
           <DashboardImageGeneratorHero 
             onTextToImage={() => onNavigate('generator')}
             onRemix={() => onNavigate('remix')}
           />
           <DashboardQuickPrompt 
             value={quickPrompt}
             onChange={setQuickPrompt}
             onSubmit={handleQuickGenerate}
             credits={userCredits ?? currentUser.credits}
             onBuyCredits={() => onNavigate('credits')}
           />
        </SpotlightWrapper>

        {/* --- SECTION 2: QUICK TOOLS (Moved Up & Full Width) --- */}
        <div>
           <div className="flex items-center justify-between mb-4 px-1">
             <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quick Tools</h2>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
             {quickActions.map((action) => {
               const isLocked = currentRoleLevel < ROLE_LEVELS[action.minRole as keyof typeof ROLE_LEVELS];
               
               return (
                 <button
                   key={action.id}
                   onClick={() => handleAction(action.id, action.minRole)}
                   className={`
                     relative p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-4 group overflow-hidden h-full min-h-[140px]
                     ${isLocked 
                       ? 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 cursor-not-allowed opacity-80' 
                       : 'bg-white dark:bg-[#1a1b26] border-slate-200 dark:border-white/5 hover:border-violet-500 dark:hover:border-violet-500/50 hover:shadow-lg'
                     }
                   `}
                 >
                   <div className={`p-4 rounded-xl mb-1 transition-transform group-hover:scale-110 ${isLocked ? 'bg-slate-200 dark:bg-white/10 text-slate-400' : `bg-opacity-10 dark:bg-opacity-20 ${action.color.replace('text-', 'bg-')} ${action.color}`}`}>
                     {React.cloneElement(action.icon as React.ReactElement<any>, { width: 28, height: 28 })}
                   </div>
                   <span className={`text-sm font-bold ${isLocked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'} text-center leading-tight`}>{action.label}</span>
                   
                   {/* Lock Overlay */}
                   {isLocked && (
                     <>
                       {/* Static Badge */}
                       <div className="absolute top-1 right-1">
                          <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[8px] font-black text-white uppercase tracking-wider flex items-center gap-1">
                            <Icons.Lock className="w-2 h-2" /> {action.minRole === 'pro' ? 'PRO' : 'PLUS'}
                          </span>
                       </div>

                       {/* Hover CTA */}
                       <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 p-2 text-center">
                          <p className="text-[9px] text-slate-400 mb-1 font-medium">Requires</p>
                          <p className="text-xs font-bold text-white mb-2">{action.minRole === 'pro' ? 'Pro Plan' : 'Freelancer'}</p>
                          <div className="px-3 py-1.5 rounded-full bg-violet-600 shadow-lg shadow-violet-500/30 text-white text-[9px] font-bold uppercase tracking-wider">
                            Upgrade
                          </div>
                       </div>
                     </>
                   )}
                 </button>
               );
             })}
           </div>
        </div>

        {/* --- SECTION 3: WORKSPACE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN (2/3): RECENT FILES (Priority) & FEED */}
          <div className="lg:col-span-2 space-y-10">
             
             {/* RECENT FILES - Moved Up for Importance */}
             <div>
                <ProRecentFilesSection onNavigate={onNavigate} />
             </div>

             {/* COMMUNITY FEED */}
             <div>
                <RemixFeedPro onNavigate={onNavigate} />
             </div>
          </div>

          {/* RIGHT COLUMN (1/3): WIDGETS stack */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
             
             {/* 1. CREDITS (Highest Priority Status) */}
             <div>
                <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Balance</h2>
                <ProCreditWidget credits={userCredits ?? currentUser.credits} onTopUp={() => onNavigate('credits')} />
             </div>

             {/* 2. FREELANCER CARD */}
             {currentRoleLevel >= ROLE_LEVELS.freelancer ? (
               <div className="h-40 animate-fade-in-up cursor-pointer">
                 <FreelancerDashboardCard onClick={() => onNavigate('freelancer-analytics')} />
               </div>
             ) : (
               <div className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer" onClick={() => onNavigate('subscription')}>
                  {/* Blurred Background Mockup */}
                  <div className="absolute inset-0 blur-sm scale-110 opacity-50 pointer-events-none">
                     <FreelancerDashboardCard onClick={() => {}} />
                  </div>
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 transition-all group-hover:bg-slate-900/50">
                     <div className="bg-white/10 p-3 rounded-full mb-3 backdrop-blur-md border border-white/20 text-white shadow-xl">
                       <Icons.Briefcase className="w-6 h-6" />
                     </div>
                     <h3 className="text-white font-bold text-sm mb-1">Freelancer Workspace</h3>
                     <p className="text-xs text-white/70 max-w-[200px] mb-3">Upgrade to manage clients, projects, and contracts.</p>
                     
                     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-wider">
                       <Icons.Lock className="w-3 h-3" /> Freelancer Plan
                     </div>
                  </div>
               </div>
             )}
             
             {/* 3. PROMO & TIPS */}
             <ProPromoBlock />

             {/* 4. SAVED COLLECTIONS (New) */}
             <div>
                <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Saved</h2>
                <div className="bg-[#1a1b26] border border-white/5 rounded-2xl overflow-hidden">
                   {/* Mock Saved Item */}
                   <div className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Icons.Folder className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Cyberpunk References</p>
                        <p className="text-[10px] text-slate-400">12 items</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Icons.Image className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Product Backgrounds</p>
                        <p className="text-[10px] text-slate-400">8 items</p>
                      </div>
                   </div>
                   <button className="w-full py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">
                      + New Collection
                   </button>
                </div>
             </div>

             <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 flex items-start gap-3 shadow-sm">
                <div className="p-1.5 rounded bg-blue-500/10 text-blue-500 mt-0.5"><Icons.Sparkles className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Batch Workflow</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Did you know you can batch process up to 20 images at once using the "E-Commerce" preset?
                  </p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
