
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TemplatePack } from '../types';

interface TemplatePackCardProps {
  pack: TemplatePack;
  onClick: () => void;
  index?: number;
  className?: string; // Support for masonry sizing
  key?: React.Key;
}

export const TemplatePackCard: React.FC<TemplatePackCardProps> = ({ pack, onClick, index = 0, className = "aspect-[3/4]" }) => {
  const isLocked = pack.tier === 'Pro+'; // Assuming Role 2 can't access Pro+

  return (
    <div 
      onClick={onClick}
      className={`
        group relative w-full rounded-2xl overflow-hidden cursor-pointer animate-fade-in-up 
        bg-[#1a1b26] mb-4 break-inside-avoid shadow-md hover:shadow-2xl hover:shadow-violet-900/20 
        transition-all duration-500 hover:-translate-y-1 border border-slate-200 dark:border-white/5
        ${className}
      `}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Background Image */}
      <img 
        src={pack.thumbnail} 
        alt={pack.title} 
        className={`
          w-full h-full object-cover transition-transform duration-[800ms] ease-out 
          group-hover:scale-110 
          ${isLocked ? 'grayscale-[0.5] opacity-70' : 'opacity-100'}
        `} 
      />
      
      {/* Gradient Overlay - Darker at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Top Category Badge */}
      <div className="absolute top-3 left-3">
        <div className="px-2.5 py-1 rounded-lg bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
          {pack.category}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
           <h3 className="text-lg font-bold text-white leading-tight mb-1 text-shadow-sm">{pack.title}</h3>
           <p className="text-xs text-slate-300 line-clamp-1 opacity-80 mb-3">{pack.description}</p>
           
           <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
                <Icons.Layout className="w-3 h-3" /> {pack.items.length}
              </span>
              {pack.tier !== 'Free' && (
                <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] flex items-center gap-1 ${pack.tier === 'Pro+' ? 'bg-slate-700 text-slate-300' : 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'}`}>
                  {pack.tier === 'Pro+' && <Icons.Lock className="w-2.5 h-2.5" />}
                  {pack.tier}
                </span>
              )}
           </div>
        </div>
      </div>

      {/* Lock Overlay (Full Centered if locked) */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="p-3 bg-black/60 rounded-full border border-white/10 shadow-xl">
            <Icons.Lock className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      )}

      {/* Hover Action (View Button) */}
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
           <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             <span className="px-5 py-2.5 bg-white/90 text-slate-900 font-bold text-xs rounded-full shadow-xl flex items-center gap-2">
               View Pack <Icons.ArrowRight className="w-3 h-3" />
             </span>
           </div>
        </div>
      )}
    </div>
  );
};
