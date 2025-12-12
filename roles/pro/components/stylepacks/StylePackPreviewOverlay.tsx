
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { StylePack } from '../../../../features/style-packs/types';
import { NeonButton } from '../../../../shared/components/GlassUI';

interface StylePackPreviewOverlayProps {
  pack: StylePack | null;
  onClose: () => void;
  onApply: () => void;
}

export const StylePackPreviewOverlay = ({ pack, onClose, onApply }: StylePackPreviewOverlayProps) => {
  if (!pack) return null;

  // Use previewImages if available, otherwise fill with cover
  const images = pack.previewImages && pack.previewImages.length > 0 
    ? [...pack.previewImages, pack.previewCover].slice(0, 4) 
    : [pack.previewCover, pack.previewCover, pack.previewCover, pack.previewCover];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-[#0e0f13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row max-h-[80vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors border border-white/5"
        >
          <Icons.Close className="w-5 h-5" />
        </button>

        {/* LEFT: GRID VISUAL */}
        <div className="flex-1 bg-[#050507] p-2 overflow-y-auto custom-scrollbar">
           <div className="grid grid-cols-2 gap-2 h-full">
              {images.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                   <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-white uppercase tracking-wider">
                     Preset {i + 1}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* RIGHT: INFO SIDEBAR */}
        <div className="w-full md:w-80 bg-[#1a1b26] border-l border-white/5 flex flex-col p-6 relative z-10">
           
           <div className="flex-1">
             <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-bold uppercase tracking-wider">
                  {pack.category}
                </span>
                {pack.isPro && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Icons.Lock className="w-3 h-3" /> Pro
                  </span>
                )}
             </div>

             <h2 className="text-2xl font-bold text-white mb-2">{pack.name}</h2>
             <p className="text-sm text-slate-400 leading-relaxed mb-6">{pack.description}</p>

             <div className="space-y-4 border-t border-white/5 pt-4">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                   <div className="p-1.5 rounded-lg bg-white/5"><Icons.Wand className="w-4 h-4" /></div>
                   <span>{pack.presetsCount} Included Presets</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                   <div className="p-1.5 rounded-lg bg-white/5"><Icons.Zap className="w-4 h-4" /></div>
                   <span>Instant AI Apply</span>
                </div>
             </div>
           </div>

           <div className="mt-8 pt-6 border-t border-white/5">
              <NeonButton onClick={onApply} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20">
                 Unlock for {pack.price} Credits
              </NeonButton>
              <button 
                onClick={onClose}
                className="w-full mt-3 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors"
              >
                Close Preview
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};
