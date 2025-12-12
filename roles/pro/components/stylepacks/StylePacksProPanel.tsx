
import React, { useState, useMemo } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { StylePack } from '../../../../features/style-packs/types';
import { MOCK_STYLE_PACKS } from '../../../../services/mock/style_packs';
import { StylePackCard } from './StylePackCard';
import { StylePackPreviewOverlay } from './StylePackPreviewOverlay';
import { ApplyStylePackModal } from './ApplyStylePackModal';
import { StylePackDetailSheet } from './StylePackDetailSheet';

export const StylePacksProPanel = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Camera' | 'Creative' | 'Portrait'>('All');
  const [previewPack, setPreviewPack] = useState<StylePack | null>(null);
  const [applyingPack, setApplyingPack] = useState<StylePack | null>(null);
  const [detailPack, setDetailPack] = useState<StylePack | null>(null);

  // Filter logic
  const filteredPacks = useMemo(() => {
    if (activeTab === 'All') return MOCK_STYLE_PACKS;
    return MOCK_STYLE_PACKS.filter(p => p.category === activeTab);
  }, [activeTab]);

  const handleApplyConfirm = () => {
    // Logic to apply styles would go here
    console.log("Applying pack:", applyingPack?.name);
    setApplyingPack(null);
    setPreviewPack(null);
    setDetailPack(null);
  };

  return (
    <div className="h-full bg-[#0e0f13] flex flex-col relative">
      
      {/* HEADER */}
      <div className="p-6 pb-2 flex-none">
        <div className="flex items-center gap-2 mb-6">
           <div className="p-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white shadow-lg shadow-violet-900/20">
             <Icons.Sparkles className="w-5 h-5" />
           </div>
           <div>
             <h2 className="text-lg font-bold text-white leading-none">Style Packs</h2>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Pro Collection</p>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
           {['All', 'Camera', 'Creative', 'Portrait'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`
                 px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap
                 ${activeTab === tab 
                   ? 'bg-white text-black border-white' 
                   : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                 }
               `}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* GRID */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-2">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {filteredPacks.map((pack) => (
              <StylePackCard 
                key={pack.id} 
                pack={pack}
                onClickPreview={() => setPreviewPack(pack)}
                onClickApply={() => setApplyingPack(pack)}
                onShowDetails={() => setDetailPack(pack)}
              />
            ))}
         </div>
      </div>

      {/* MODALS & OVERLAYS */}
      <StylePackPreviewOverlay 
        pack={previewPack}
        onClose={() => setPreviewPack(null)}
        onApply={() => { setApplyingPack(previewPack); }}
      />

      <ApplyStylePackModal 
        isOpen={!!applyingPack}
        onClose={() => setApplyingPack(null)}
        pack={applyingPack}
        onConfirm={handleApplyConfirm}
      />

      <StylePackDetailSheet 
        isOpen={!!detailPack}
        onClose={() => setDetailPack(null)}
        pack={detailPack}
        onApply={() => { setApplyingPack(detailPack); }}
      />

    </div>
  );
};
