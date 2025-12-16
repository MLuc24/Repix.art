
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { BackgroundPack, BackgroundItem } from '../../../../features/backgrounds/types';
import { NeonButton } from '../../../../shared/components/GlassUI';

interface BackgroundPreviewOverlayProps {
  pack: BackgroundPack | null;
  onClose: () => void;
  onApply: () => void;
}

export const BackgroundPreviewOverlay = ({ pack, onClose, onApply }: BackgroundPreviewOverlayProps) => {
  const [activeItem, setActiveItem] = useState<BackgroundItem | null>(pack ? pack.items[0] : null);

  if (!pack) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:pl-64">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0e0f13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors border border-white/5"
        >
          <Icons.Close className="w-5 h-5" />
        </button>

        {/* LEFT: LARGE PREVIEW */}
        <div className="flex-1 bg-[#050507] relative flex items-center justify-center p-8 overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#050507_100%)]" />
           
           <div className="relative z-10 max-h-full shadow-2xl rounded-lg overflow-hidden border border-white/10">
              <img 
                src={activeItem?.src || pack.thumbnail} 
                alt="Preview" 
                className="max-h-[70vh] object-contain"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-xs font-bold text-white">
                 Live Preview
              </div>
           </div>
        </div>

        {/* RIGHT: GRID & INFO */}
        <div className="w-full md:w-80 bg-[#1a1b26] border-l border-white/5 flex flex-col p-6 relative z-10">
           
           <div className="mb-6">
             <h2 className="text-xl font-bold text-white mb-1">{pack.title}</h2>
             <p className="text-xs text-slate-400">{pack.items.length} backgrounds included</p>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2">
              <div className="grid grid-cols-2 gap-3">
                 {pack.items.map((item) => (
                   <button 
                     key={item.id}
                     onClick={() => setActiveItem(item)}
                     className={`
                       relative aspect-video rounded-xl overflow-hidden border transition-all
                       ${activeItem?.id === item.id 
                         ? 'border-violet-500 ring-2 ring-violet-500/20' 
                         : 'border-white/5 hover:border-white/20'
                       }
                     `}
                   >
                     <img src={item.src} className="w-full h-full object-cover" />
                     {activeItem?.id === item.id && (
                       <div className="absolute inset-0 bg-violet-500/10" />
                     )}
                   </button>
                 ))}
              </div>
           </div>

           <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
              <NeonButton onClick={onApply} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20">
                 Unlock Pack ({pack.price} Credits)
              </NeonButton>
              <button onClick={onApply} className="w-full py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                 Apply Single BG (1 Credit)
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};
