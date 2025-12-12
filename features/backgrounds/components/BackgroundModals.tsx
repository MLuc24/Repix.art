
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { BackgroundPack, BackgroundItem } from '../types';

interface BackgroundPackDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pack: BackgroundPack | null;
  onUse: (item: BackgroundItem) => void;
  isUnlocked?: boolean; // New prop for Pro users
}

export const BackgroundPackDetailModal = ({ isOpen, onClose, pack, onUse, isUnlocked = false }: BackgroundPackDetailModalProps) => {
  if (!pack) return null;

  const [selectedItem, setSelectedItem] = useState<BackgroundItem>(pack.items[0]);

  // Reset selected item when pack changes
  React.useEffect(() => {
    if (pack) setSelectedItem(pack.items[0]);
  }, [pack]);

  // Determine if we should show the "Unlock" UI or the "Use" UI
  const showUnlockUI = pack.isPro && !isUnlocked;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Main Container */}
      <div className={`relative w-full max-w-7xl h-[90vh] bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row transition-transform duration-500 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white backdrop-blur-md border border-slate-200 shadow-sm transition-colors"
        >
          <Icons.Close className="w-5 h-5" />
        </button>

        {/* LEFT: PREVIEW AREA (60%) */}
        <div className="relative flex-1 bg-slate-100 flex items-center justify-center p-8 md:p-12 overflow-hidden">
          {/* Background Gradient Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f1f5f9_0%,_#cbd5e1_100%)] opacity-50" />
          
          <div className="relative z-10 w-full max-w-4xl h-full flex flex-col items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white max-h-full">
               <img 
                 src={selectedItem?.src || pack.thumbnail} 
                 alt={selectedItem?.title} 
                 className="max-h-[70vh] w-auto object-contain"
               />
               
               {/* Apply Overlay Button (Hover on Image) */}
               <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] cursor-pointer" onClick={() => onUse(selectedItem)}>
                  <button className="px-8 py-3 rounded-xl bg-white text-black font-bold transform scale-90 hover:scale-100 transition-all shadow-xl">
                    Use This Background
                  </button>
               </div>
            </div>
            <p className="mt-4 text-slate-500 font-bold">{selectedItem?.title}</p>
          </div>
        </div>

        {/* RIGHT: DETAILS & GRID (40%) */}
        <div className="w-full md:w-[450px] bg-white border-l border-slate-200 flex flex-col">
          
          {/* Header Info */}
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                {pack.category}
              </span>
              {pack.isPro && (
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${isUnlocked ? 'bg-green-100 text-green-600 border-green-200' : 'bg-amber-100 text-amber-600 border-amber-200'}`}>
                  {isUnlocked ? <Icons.Check className="w-3 h-3" /> : <Icons.Lock className="w-3 h-3" />}
                  {isUnlocked ? 'UNLOCKED' : 'PRO'}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{pack.title}</h2>
            <p className="text-slate-500 text-sm leading-relaxed">{pack.description}</p>
          </div>

          {/* Thumbnails Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Included Backgrounds ({pack.count})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {pack.items.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`
                    relative aspect-video rounded-xl overflow-hidden border transition-all duration-200 bg-white
                    ${selectedItem.id === item.id 
                      ? 'border-violet-500 ring-2 ring-violet-500/30' 
                      : 'border-slate-200 hover:border-violet-300'
                    }
                  `}
                >
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  {selectedItem.id === item.id && (
                    <div className="absolute inset-0 bg-violet-500/20" />
                  )}
                </button>
              ))}
              {/* Fake extra items for demo */}
              {Array.from({ length: pack.count - pack.items.length }).map((_, i) => (
                <div key={i} className="aspect-video rounded-xl bg-white border border-slate-200 flex items-center justify-center opacity-50">
                  <Icons.Image className="w-5 h-5 text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-200 bg-white">
            {showUnlockUI ? (
              <div className="space-y-3">
                 <NeonButton className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20">
                   <div className="flex items-center justify-center gap-2">
                     <Icons.Lock className="w-4 h-4" /> Unlock Pack (3 Credits)
                   </div>
                 </NeonButton>
                 <button onClick={() => onUse(selectedItem)} className="w-full py-3 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium">
                   Try with Watermark
                 </button>
              </div>
            ) : (
              <NeonButton onClick={() => onUse(selectedItem)} className="w-full">
                Use Background
              </NeonButton>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
