
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { BackgroundPack } from '../../../../features/backgrounds/types';

interface BackgroundPackCardProps {
  pack: BackgroundPack;
  onClick: () => void;
  onPreview: () => void;
  onApply: () => void;
  index?: number;
  className?: string;
  key?: React.Key;
}

export const BackgroundPackCard = ({ pack, onClick, onPreview, onApply, index = 0, className = "aspect-[3/4]" }: BackgroundPackCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative w-full rounded-2xl overflow-hidden cursor-pointer animate-fade-in-up 
        bg-[#1a1b26] mb-4 break-inside-avoid shadow-md hover:shadow-2xl hover:shadow-teal-900/20 
        transition-all duration-500 hover:-translate-y-1 border border-slate-200 dark:border-white/5
        ${className}
      `}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Thumbnail - Full Bleed */}
      <img 
        src={pack.thumbnail} 
        alt={pack.title} 
        className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110" 
      />
      
      {/* Gradient Overlay - Cinematic */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        {pack.isPro && (
          <span className="px-2 py-0.5 rounded-lg bg-amber-500/90 text-black text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg flex items-center gap-1">
            <Icons.Lock className="w-2.5 h-2.5" /> Pro
          </span>
        )}
      </div>
      <div className="absolute top-3 right-3">
         <span className="px-2 py-0.5 rounded-lg bg-black/40 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
            {pack.count} BGs
         </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
           <p className="text-[9px] font-bold text-teal-300 uppercase tracking-wider mb-1 opacity-90">{pack.category}</p>
           <h3 className="text-base font-bold text-white leading-tight mb-3 text-shadow-sm">{pack.title}</h3>
           
           {/* Actions (Visible on Hover) */}
           <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
             <button 
                onClick={(e) => { e.stopPropagation(); onPreview(); }}
                className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold border border-white/10 backdrop-blur-md transition-colors"
             >
                Preview
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); onApply(); }}
                className="py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold shadow-lg shadow-teal-500/20 transition-colors"
             >
                Apply
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
