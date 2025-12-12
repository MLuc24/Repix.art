
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { StylePack } from '../../../../features/style-packs/types';
import { NeonButton } from '../../../../shared/components/GlassUI';

interface StylePackDetailSheetProps {
  pack: StylePack | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const StylePackDetailSheet = ({ pack, isOpen, onClose, onApply }: StylePackDetailSheetProps) => {
  if (!pack) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[60] flex justify-end transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div 
        className={`
          relative w-full max-w-md h-full bg-[#0e0f13] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header Image */}
        <div className="relative h-64 w-full">
           <img src={pack.previewCover} className="w-full h-full object-cover opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0e0f13]" />
           <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors">
             <Icons.Close className="w-5 h-5" />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 -mt-12 relative z-10 overflow-y-auto">
           <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-bold uppercase tracking-wider">
                {pack.category}
              </span>
              <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                {pack.price} Credits
              </span>
           </div>

           <h2 className="text-3xl font-bold text-white mb-2">{pack.name}</h2>
           <p className="text-slate-400 leading-relaxed mb-8">{pack.description}</p>

           <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Included Styles</h4>
           <ul className="space-y-3 mb-8">
              {Array.from({ length: pack.presetsCount }).map((_, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                   <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                   {pack.name} Preset {i + 1}
                </li>
              ))}
           </ul>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#131418]">
           <NeonButton onClick={onApply} className="w-full">
             Apply to Project
           </NeonButton>
        </div>
      </div>
    </div>
  );
};
