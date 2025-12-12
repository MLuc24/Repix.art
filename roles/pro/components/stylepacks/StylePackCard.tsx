
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { StylePack } from '../../../../features/style-packs/types';

interface StylePackCardProps {
  pack: StylePack;
  onClickPreview: () => void;
  onClickApply: () => void;
  onShowDetails: () => void;
  key?: React.Key;
}

export const StylePackCard = ({ pack, onClickPreview, onClickApply, onShowDetails }: StylePackCardProps) => {
  return (
    <div 
      className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1b26] border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Background Image */}
      <img 
        src={pack.previewCover} 
        alt={pack.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f13] via-transparent to-transparent opacity-90" />

      {/* Top Badges */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
        {pack.isPro && (
          <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm flex items-center gap-1">
            <Icons.Lock className="w-2.5 h-2.5" /> Pro Pack
          </span>
        )}
        <span className="px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
          {pack.price} Credits
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        <div className="mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between items-end mb-1">
             <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">{pack.name}</h3>
             <span className="text-[10px] text-slate-400 font-mono bg-white/5 px-1.5 rounded">{pack.presetsCount} Styles</span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-1">{pack.description}</p>
        </div>

        {/* Action Buttons (Visible on Hover) */}
        <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
          <button 
            onClick={(e) => { e.stopPropagation(); onClickPreview(); }}
            className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 backdrop-blur-md transition-colors"
          >
            Preview
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClickApply(); }}
            className="py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-900/20 transition-colors"
          >
            Apply
          </button>
        </div>
        
        {/* Detail Trigger Area (Hidden button for full card click if needed) */}
        <button className="absolute inset-0 w-full h-full z-[-1]" onClick={onShowDetails} />
      </div>
    </div>
  );
};
