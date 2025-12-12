
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../../features/dashboard/components/DashboardLayout';
import { Icons } from '../../../../shared/components/Icons';
import { MOCK_PRO_BACKGROUND_PACKS } from '../../../../services/mock/backgrounds_pro';
import { BackgroundPack, BackgroundItem } from '../../../../features/backgrounds/types';
import { BackgroundPackCard } from './BackgroundPackCard';
import { FeaturedPackBanner } from '../../../../features/backgrounds/components/BackgroundUI';
import { BackgroundPreviewOverlay } from './BackgroundPreviewOverlay';
import { ApplyBackgroundModal } from './ApplyBackgroundModal';
import { CustomBackgroundUploader } from './CustomBackgroundUploader';
import { BackgroundPackDetailModal } from '../../../../features/backgrounds/components/BackgroundModals';

// Helper for "Sole" Layout - STRICTLY VERTICAL
const getAspectRatioClass = (index: number) => {
  const ratios = [
    'aspect-[3/4]',  // Standard Vertical
    'aspect-[2/3]',  // Tall Photo
    'aspect-[4/5]',  // Instagram Portrait
    'aspect-[9/16]', // Mobile/Story
  ];
  return ratios[index % ratios.length];
};

interface BackgroundPacksProPanelProps {
  user: any;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

export const BackgroundPacksProPanel = ({ user, onLogout, onNavigate }: BackgroundPacksProPanelProps) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Trending' | 'New' | 'Studio' | 'Creative'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [previewPack, setPreviewPack] = useState<BackgroundPack | null>(null);
  const [detailPack, setDetailPack] = useState<BackgroundPack | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const filteredPacks = useMemo(() => {
    return MOCK_PRO_BACKGROUND_PACKS.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesTab = true;
        if (activeTab !== 'All') {
            if (activeTab === 'Trending') matchesTab = p.isPro; 
            else if (activeTab === 'New') matchesTab = !p.isPro;
            else matchesTab = p.category === activeTab;
        }
        return matchesSearch && matchesTab;
    });
  }, [activeTab, searchQuery]);

  const handleUseBackground = (item: BackgroundItem) => {
    setDetailPack(null);
    onNavigate('editor');
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="backgrounds">
      <div className="min-h-[calc(100vh-140px)] flex flex-col relative transition-colors pb-20">
        
        {/* 1. HEADER & SEARCH */}
        <div className="sticky top-0 z-30 pt-4 pb-4 bg-slate-50/90 dark:bg-[#020617]/90 backdrop-blur-xl -mx-4 px-4 md:-mx-8 md:px-8 mb-4 border-b border-slate-200 dark:border-white/5 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl text-white shadow-lg shadow-teal-500/20">
                  <Icons.Image className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none">Backgrounds</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Premium studio lighting & environments</p>
                </div>
              </div>
              
              <div className="relative w-full md:max-w-sm group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <Icons.Search className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search packs..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#1a1b26]/80 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-teal-500 dark:focus:border-teal-500 transition-all shadow-sm focus:shadow-lg focus:shadow-teal-500/10"
                />
              </div>
            </div>

            {/* 2. FILTER BAR */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
               {['All', 'Trending', 'New', 'Studio', 'Creative'].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab as any)}
                   className={`
                     px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border
                     ${activeTab === tab 
                       ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/20' 
                       : 'bg-white dark:bg-[#1a1b26] border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/30'
                     }
                   `}
                 >
                   {tab}
                 </button>
               ))}
            </div>
        </div>

        {/* 3. FEATURED BANNER */}
        {activeTab === 'All' && !searchQuery && (
          <div className="mb-8">
             <FeaturedPackBanner />
          </div>
        )}

        {/* 4. MASONRY GRID */}
        {filteredPacks.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 px-1 pb-12">
             {filteredPacks.map((pack, idx) => (
               <BackgroundPackCard 
                 key={pack.id} 
                 pack={pack}
                 index={idx}
                 className={getAspectRatioClass(idx)}
                 onPreview={() => setPreviewPack(pack)}
                 onApply={() => setShowApplyModal(true)}
                 onClick={() => setDetailPack(pack)} 
               />
             ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
             <Icons.Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
             <p>No background packs found.</p>
             <button onClick={() => { setSearchQuery(''); setActiveTab('All'); }} className="text-teal-500 hover:underline mt-2 text-sm">Clear Filters</button>
          </div>
        )}

        {/* 5. CUSTOM UPLOADER */}
        <div className="p-8 rounded-[32px] bg-slate-100 dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 break-inside-avoid">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">My Backgrounds</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Upload your own assets for compositing.</p>
                </div>
            </div>
            <CustomBackgroundUploader />
        </div>

      </div>

      {/* MODALS */}
      <BackgroundPreviewOverlay 
        pack={previewPack}
        onClose={() => setPreviewPack(null)}
        onApply={() => { setPreviewPack(null); setShowApplyModal(true); }}
      />

      <ApplyBackgroundModal 
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onConfirm={() => { setShowApplyModal(false); onNavigate('editor'); }}
      />

      <BackgroundPackDetailModal 
        isOpen={!!detailPack}
        onClose={() => setDetailPack(null)}
        pack={detailPack}
        onUse={handleUseBackground}
        isUnlocked={true}
      />

    </DashboardLayout>
  );
};
