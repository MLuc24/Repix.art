
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { FeedItem, SavedCollection } from '../../../../features/feed/types';

// --- FILTER CHIPS ---
export const FeedFilterChips = ({ active, onChange }: { active: string, onChange: (val: string) => void }) => {
  const filters = ['For You', 'Trending', 'Portraits', 'Product', 'Video'];
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`
            px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap
            ${active === f 
              ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/20' 
              : 'bg-white dark:bg-[#1a1b26] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            }
          `}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

// --- SAVED WIDGET ---
export const SavedCollectionsWidget = ({ items }: { items: SavedCollection[] }) => (
  <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-2xl p-4 sticky top-24 shadow-sm dark:shadow-none">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Icons.Star className="w-4 h-4 text-amber-400" /> Saved
      </h3>
      <button className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">View All</button>
    </div>
    
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer group transition-colors">
          <img src={item.thumbnail} className="w-10 h-10 rounded-lg object-cover opacity-90 group-hover:opacity-100 transition-opacity bg-slate-100 dark:bg-slate-800" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate">{item.name}</p>
            <p className="text-[10px] text-slate-500">{item.count} items</p>
          </div>
          <Icons.ChevronLeft className="w-3 h-3 text-slate-400 dark:text-slate-600 -rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
      
      <button className="w-full py-2 rounded-xl border border-dashed border-slate-300 dark:border-white/10 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/20 transition-all flex items-center justify-center gap-2">
        <Icons.Plus className="w-3 h-3" /> New Collection
      </button>
    </div>
  </div>
);

// --- FEED CARD ---
interface RemixFeedCardProps {
  item: FeedItem;
  onAction: (item: FeedItem) => void;
  onPreview: (item: FeedItem) => void;
  key?: React.Key;
}

export const RemixFeedCard = ({ item, onAction, onPreview }: RemixFeedCardProps) => {
  const isCollage = item.thumbnails.length > 1;

  return (
    <div className="group bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-1">
      
      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.author && (
            <>
              <img src={item.author.avatar} className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/10" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.author.name}</span>
            </>
          )}
        </div>
        <div className="flex gap-1">
          {item.badges?.map(badge => (
            <span key={badge} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${badge === 'Pro' ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300'}`}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* MEDIA */}
      <div className="relative aspect-video px-4 cursor-pointer" onClick={() => onPreview(item)}>
        {isCollage ? (
          <div className="grid grid-cols-3 gap-1 h-full rounded-xl overflow-hidden">
            <div className="col-span-2 h-full relative">
               <img src={item.thumbnails[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-1 h-full">
               <img src={item.thumbnails[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-200 dark:bg-slate-800" />
               <img src={item.thumbnails[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full rounded-xl overflow-hidden relative">
             <img src={item.thumbnails[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-200 dark:bg-slate-800" />
             {/* Play button overlay if video */}
             {item.badges?.includes('Video') && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                 <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                   <Icons.Sparkles className="w-6 h-6" />
                 </div>
               </div>
             )}
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 mx-4 rounded-xl bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
           <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur rounded-lg text-xs font-bold text-slate-900 dark:text-white border border-white/20 shadow-lg">Preview</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{item.title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 h-8">{item.subtitle}</p>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onAction(item)}
            className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
          >
            {item.type === 'remix' ? <Icons.Sparkles className="w-3 h-3" /> : item.type === 'batch' ? <Icons.Layout className="w-3 h-3" /> : <Icons.Wand className="w-3 h-3" />}
            {item.type === 'remix' ? 'Remix This' : item.type === 'model' ? 'Try Model' : 'Use Preset'}
            {item.creditCost && <span className="opacity-70 font-normal">({item.creditCost})</span>}
          </button>
          
          <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Icons.Star className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
