
import React, { useState, useMemo } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { FeedItem } from '../../../features/feed/types';
import { MOCK_FEED_ITEMS, MOCK_SAVED_COLLECTIONS } from '../../../services/mock/feed';
import { FeedFilterChips, SavedCollectionsWidget, RemixFeedCard } from './components/FeedUI';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';

interface RemixFeedProProps {
  onNavigate: (path: string) => void;
}

export const RemixFeedPro = ({ onNavigate }: RemixFeedProProps) => {
  const [filter, setFilter] = useState('For You');
  const [previewItem, setPreviewItem] = useState<FeedItem | null>(null);

  // --- FILTER LOGIC ---
  const filteredItems = useMemo(() => {
    if (filter === 'For You') return MOCK_FEED_ITEMS;
    // Simple mock filter logic
    return MOCK_FEED_ITEMS.filter(item => {
      if (filter === 'Trending') return item.badges?.includes('Trending') || item.badges?.includes('Popular');
      if (filter === 'Portraits') return item.title.toLowerCase().includes('portrait');
      if (filter === 'Product') return item.title.toLowerCase().includes('product') || item.title.toLowerCase().includes('e-commerce');
      if (filter === 'Video') return item.badges?.includes('Video');
      return true;
    });
  }, [filter]);

  // --- HANDLERS ---
  const handleAction = (item: FeedItem) => {
    // 1. Save params to session for "Pre-fill" effect
    if (item.targetParams) {
      if (item.targetParams.prompt) sessionStorage.setItem('gen_prompt', item.targetParams.prompt);
      if (item.targetParams.mode) sessionStorage.setItem('gen_mode', item.targetParams.mode);
      // In a real app, modelId would also be passed
    }
    // 2. Navigate
    onNavigate(item.targetRoute);
  };

  return (
    <div className="w-full animate-fade-in-up">
      
      <div className="flex flex-col gap-8">
        
        {/* MAIN FEED (Full Width) */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Icons.Sparkles className="w-5 h-5 text-violet-400" /> Daily Remix Feed
              </h2>
              <p className="text-xs text-slate-400">Fresh ideas picked for you.</p>
            </div>
            {/* Mobile Filter Toggle could go here */}
          </div>

          <FeedFilterChips active={filter} onChange={setFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredItems.map((item) => (
              <RemixFeedCard 
                key={item.id} 
                item={item} 
                onAction={handleAction} 
                onPreview={setPreviewItem}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-sm font-bold transition-colors">
              Load More Inspiration
            </button>
          </div>
        </div>

      </div>

      {/* PREVIEW MODAL */}
      <GlassModal 
        isOpen={!!previewItem} 
        onClose={() => setPreviewItem(null)}
        className="!bg-[#0e0f13] !border-white/10 text-white max-w-4xl"
      >
        {previewItem && (
          <div className="flex flex-col md:flex-row h-[70vh]">
             {/* Large Image */}
             <div className="flex-1 bg-black flex items-center justify-center relative rounded-xl overflow-hidden">
                <img src={previewItem.thumbnails[0]} className="w-full h-full object-contain" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                   {previewItem.thumbnails.slice(1).map((src, i) => (
                     <img key={i} src={src} className="w-16 h-16 rounded-lg object-cover border-2 border-white/20" />
                   ))}
                </div>
             </div>
             
             {/* Sidebar Info */}
             <div className="w-full md:w-80 md:pl-6 flex flex-col pt-6 md:pt-0">
                <div className="flex-1">
                   <h2 className="text-2xl font-bold text-white mb-2">{previewItem.title}</h2>
                   <p className="text-slate-400 text-sm mb-6">{previewItem.subtitle}</p>
                   
                   <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                         <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Target Model</span>
                         <span className="text-sm font-bold text-white flex items-center gap-2">
                           <Icons.Zap className="w-4 h-4 text-amber-400" /> 
                           {previewItem.targetParams?.modelId || 'Auto Select'}
                         </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                         <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Prompt</span>
                         <p className="text-xs text-slate-300 line-clamp-3 italic">
                           "{previewItem.targetParams?.prompt || 'N/A'}"
                         </p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                   <NeonButton onClick={() => handleAction(previewItem)} className="w-full">
                     Use This Style ({previewItem.creditCost} Credits)
                   </NeonButton>
                   <button onClick={() => setPreviewItem(null)} className="w-full py-3 text-xs font-bold text-slate-500 hover:text-white mt-2">
                     Close Preview
                   </button>
                </div>
             </div>
          </div>
        )}
      </GlassModal>

    </div>
  );
};
