
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { 
  QuickActionCard, 
  SuggestionCard, 
  RecentFileCard,
} from '../../../features/dashboard/components/DashboardWidgets';
import { 
  SpotlightWrapper, 
  DashboardImageGeneratorHero,
  DashboardQuickPrompt
} from '../../../features/dashboard/components/SpotlightUI';
import { MOCK_USER, RECENT_FILES, SUGGESTIONS } from '../../../services/mock/dashboard';

interface CasualDashboardProps {
  onLogout: () => void;
  onNavigate: (path: string) => void;
  userCredits?: number;
}

export const CasualDashboard = ({ onLogout, onNavigate, userCredits }: CasualDashboardProps) => {
  const [quickPrompt, setQuickPrompt] = useState('');
  const credits = userCredits ?? MOCK_USER.credits;

  // --- HANDLERS (Version 19) ---
  const handleQuickGenerate = () => {
    if (quickPrompt.trim()) {
      // Save prompt to session storage to pass to Generator page
      sessionStorage.setItem('gen_prompt', quickPrompt);
      sessionStorage.setItem('gen_mode', 'text-to-image');
      onNavigate('generator');
    }
  };

  const handleTextToImageNav = () => {
    sessionStorage.setItem('gen_mode', 'text-to-image');
    onNavigate('generator');
  };

  const handleRemixNav = () => {
    sessionStorage.setItem('gen_mode', 'image-to-image');
    onNavigate('generator');
  };

  const handleBuyCredits = () => {
    onNavigate('credits');
  };

  const handleAction = (action: string) => {
    if (action === 'remix') onNavigate('remix');
    else if (action === 'templates') onNavigate('marketplace');
    else if (action === 'avatar') onNavigate('avatar');
    else if (action === 'upload') onNavigate('upload'); 
    else if (action === 'backgrounds') onNavigate('backgrounds');
    else if (action === 'editor' || action === 'enhance') onNavigate('editor');
  };

  return (
    <DashboardLayout user={MOCK_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="dashboard" currentCredits={credits}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* --- SECTION 1: HERO & GENERATOR FLOW (Version 19) --- */}
        <SpotlightWrapper>
          <DashboardImageGeneratorHero 
            onTextToImage={handleTextToImageNav}
            onRemix={handleRemixNav}
          />

          <DashboardQuickPrompt 
            value={quickPrompt}
            onChange={setQuickPrompt}
            onSubmit={handleQuickGenerate}
            credits={credits}
            onBuyCredits={handleBuyCredits}
          />
        </SpotlightWrapper>


        {/* --- SECTION 2: QUICK ACTIONS (COMPACT GRID) --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Quick Tools</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             <button 
               onClick={() => handleAction('upload')}
               className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500 dark:hover:border-violet-500/50 hover:shadow-lg transition-all flex flex-col items-center gap-3 group"
             >
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Icons.Upload className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">Upload Photo</span>
             </button>

             <button 
               onClick={() => handleAction('editor')}
               className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500 dark:hover:border-violet-500/50 hover:shadow-lg transition-all flex flex-col items-center gap-3 group"
             >
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                  <Icons.Sliders className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">Editor</span>
             </button>

             <button 
               onClick={() => handleAction('remix')}
               className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500 dark:hover:border-violet-500/50 hover:shadow-lg transition-all flex flex-col items-center gap-3 group"
             >
                <div className="p-3 rounded-xl bg-fuchsia-500/10 text-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
                  <Icons.Scissors className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">Remove BG</span>
             </button>

             <button 
               onClick={() => handleAction('editor')}
               className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500 dark:hover:border-violet-500/50 hover:shadow-lg transition-all flex flex-col items-center gap-3 group"
             >
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Icons.Bolt className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">AI Enhance</span>
             </button>
          </div>
        </section>


        {/* --- SECTION 3: RECENT & SUGGESTIONS --- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Recent Projects */}
          <div className="xl:col-span-8">
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Recent Projects</h2>
              <button className="text-sm text-violet-600 hover:text-violet-500 font-medium transition-colors">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {RECENT_FILES.map((file, idx) => (
                <div key={file.id} onClick={() => onNavigate('editor')}>
                  <RecentFileCard 
                    {...file} 
                    delay={`${0.1 + (idx * 0.1)}s`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="xl:col-span-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Suggested for you</h2>
            <div className="space-y-4">
              {SUGGESTIONS.map((s, idx) => (
                <div key={s.id} onClick={() => handleAction(s.id)}>
                  <SuggestionCard 
                    title={s.title} 
                    subtitle={s.subtitle}
                    icon={
                      s.iconType === 'Bolt' ? <Icons.Bolt /> :
                      s.iconType === 'Sparkles' ? <Icons.Sparkles /> :
                      <Icons.User />
                    }
                    delay={`${0.2 + (idx * 0.1)}s`}
                  />
                </div>
              ))}
            </div>

            {/* Pro Upsell Banner Small */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => onNavigate('subscription')}>
               <div className="flex items-center gap-3 mb-2">
                 <div className="p-1.5 rounded bg-white/20"><Icons.Star className="w-4 h-4" /></div>
                 <span className="font-bold text-sm">Go Professional</span>
               </div>
               <p className="text-xs text-violet-100 opacity-90">Unlock 4K exports and exclusive styles.</p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
