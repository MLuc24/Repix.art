
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { Template } from '../types';
import { MOCK_TEMPLATES } from '../../../services/mock/templates';

// --- APPLY TEMPLATE MODAL ---
export const ApplyTemplateModal = ({ isOpen, onClose, template, onConfirm }: { isOpen: boolean, onClose: () => void, template: Template | null, onConfirm: () => void }) => {
  if (!template) return null;

  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Apply Template</h3>
        <p className="text-slate-400 mb-8">Choose a photo to use with <span className="text-violet-400 font-medium">"{template.title}"</span></p>

        <div className="grid grid-cols-2 gap-4 mb-8">
           {/* Option 1: Upload */}
           <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500 hover:bg-white/10 transition-all group">
             <div className="p-4 rounded-full bg-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform">
               <Icons.Upload className="w-6 h-6" />
             </div>
             <span className="text-sm font-medium text-white">Upload New</span>
           </button>

           {/* Option 2: Recent */}
           <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-white/10 transition-all group">
             <div className="p-4 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
               <Icons.Image className="w-6 h-6" />
             </div>
             <span className="text-sm font-medium text-white">Select Recent</span>
           </button>
        </div>

        <NeonButton onClick={onConfirm} className="w-full">
          Continue to Editor
        </NeonButton>
      </div>
    </GlassModal>
  );
};

// --- PREVIEW MODAL ---
interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  onUse: (t: Template) => void;
  onSelectSimilar?: (t: Template) => void;
}

export const TemplatePreviewModal = ({ isOpen, onClose, template, onUse, onSelectSimilar }: TemplatePreviewModalProps) => {
  // Infinite scroll state
  const [displayCount, setDisplayCount] = useState(8);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset display count when template changes
  useEffect(() => {
    if (isOpen) {
      setDisplayCount(8);
      // Scroll to top
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, template]);

  // Optimize derived data: memoize similar templates list
  const allTemplates = React.useMemo(() => {
    if (!template) return [];
    // Generate a long list of similar items by duplicating MOCK_TEMPLATES
    return [...MOCK_TEMPLATES, ...MOCK_TEMPLATES, ...MOCK_TEMPLATES].filter(t => t.id !== template.id);
  }, [template?.id]);

  const visibleTemplates = React.useMemo(() => {
    return allTemplates.slice(0, displayCount);
  }, [allTemplates, displayCount]);

  const handleScroll = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Load more when scrolled close to bottom
      if (scrollTop + clientHeight >= scrollHeight - 200) { // Increased threshold
        // Use functional state update with check to prevent unneeded re-renders
        setDisplayCount(prev => {
          if (prev >= allTemplates.length) return prev;
          return Math.min(prev + 8, allTemplates.length); // Load 8 at a time instead of 4
        });
      }
    }
  }, [allTemplates.length]);

  if (!template) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center lg:pl-64 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-sm" onClick={onClose} />

      {/* Content Container */}
      <div className={`
        relative w-full max-w-6xl h-[90vh] bg-[#0e0f14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl 
        transition-transform duration-500 flex flex-col
        ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}
      `}>
        
        {/* Close Button - Sticky/Fixed z-index high */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/60 text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/10 backdrop-blur-md"
        >
          <Icons.Close className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto custom-scrollbar"
        >
            {/* Top Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[60vh] lg:min-h-[600px]">
                
                {/* LEFT: IMAGE */}
                <div className="lg:col-span-2 relative bg-black flex items-center justify-center p-8 lg:p-12 overflow-hidden group">
                  {/* Radial Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#333_0%,_#000_100%)] opacity-40" />
                  
                  <img 
                    src={template.thumbnail} 
                    alt={template.title} 
                    className="relative z-10 max-h-[50vh] lg:max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-white/5 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  
                  {template.isPro && (
                    <div className="absolute top-8 left-8 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 z-20">
                      <Icons.Lock className="w-3 h-3" /> Premium Template
                    </div>
                  )}
                </div>

                {/* RIGHT: DETAILS */}
                <div className="bg-[#1a1b26] p-8 lg:p-10 flex flex-col border-l border-white/5">
                  <div className="mb-auto">
                    <div className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">{template.category}</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{template.title}</h2>
                    <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                      Professionally designed template specifically for {template.category.toLowerCase()}. 
                      Includes fully customizable layers, smart object replacement, and auto-color grading.
                      Perfect for high-engagement social media posts.
                    </p>

                    <div className="space-y-5">
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5"><Icons.Layout className="w-5 h-5 text-slate-400" /></div>
                          <div>
                             <p className="font-bold text-white">1080x1350</p>
                             <p className="text-xs text-slate-500">Portrait (4:5)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5"><Icons.User className="w-5 h-5 text-slate-400" /></div>
                          <div>
                             <p className="font-bold text-white">{template.author}</p>
                             <p className="text-xs text-slate-500">Verified Creator</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5"><Icons.Download className="w-5 h-5 text-slate-400" /></div>
                          <div>
                             <p className="font-bold text-white">{template.downloads} Downloads</p>
                             <p className="text-xs text-slate-500">Popularity</p>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="mt-10 space-y-4">
                    {template.isPro ? (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3 mb-4">
                           <Icons.Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                           <p className="text-sm text-amber-100/80 leading-snug">This is a Premium Template. Unlock high-resolution export and commercial rights.</p>
                        </div>
                        <NeonButton onClick={() => onUse(template)} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20 text-black font-bold">
                          Unlock for 1 Credit
                        </NeonButton>
                      </div>
                    ) : (
                      <NeonButton onClick={() => onUse(template)} className="w-full py-4 text-base">
                        Use This Template
                      </NeonButton>
                    )}
                    
                    <button className="w-full py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm">
                      Save to Favorites
                    </button>
                  </div>
                </div>
            </div>

            {/* Bottom Section: Similar Templates Grid */}
            <div className="bg-[#0e0f14] border-t border-white/5 p-8 md:p-10 pb-20">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Similar templates</h3>
                  {/* Optional 'See All' if we weren't doing infinite scroll */}
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {visibleTemplates.map((item, idx) => (
                    <div 
                      key={`${item.id}-${idx}`} // Use index for unique key since we duplicated mock data
                      onClick={() => onSelectSimilar && onSelectSimilar(item)}
                      className="group cursor-pointer flex flex-col gap-3"
                    >
                       <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group-hover:border-violet-500/50 transition-all shadow-sm group-hover:shadow-violet-900/20 group-hover:-translate-y-1 duration-300">
                          <img 
                            loading="lazy"
                            src={item.thumbnail} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                          
                          {/* Top Badges */}
                          {item.isPro && (
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded-lg p-1.5 border border-white/10">
                               <Icons.Lock className="w-3 h-3 text-amber-400" />
                            </div>
                          )}

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                               View
                             </span>
                          </div>
                       </div>
                       
                       <div>
                         <h4 className="text-sm font-bold text-slate-200 group-hover:text-white truncate transition-colors">{item.title}</h4>
                         <p className="text-xs text-slate-500">{item.category}</p>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Loader for Infinite Scroll */}
               {displayCount < allTemplates.length && (
                 <div className="flex justify-center py-10">
                    <div className="w-8 h-8 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                 </div>
               )}
            </div>

        </div>
      </div>
    </div>
  );
};
