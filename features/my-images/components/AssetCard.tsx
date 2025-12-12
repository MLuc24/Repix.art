
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { AssetItem } from '../types';

interface AssetCardProps {
  asset: AssetItem;
  isSelected?: boolean;
  isSelectMode?: boolean;
  onSelect?: () => void;
  onClick: () => void;
  onAction: (action: string) => void;
  index?: number;
  key?: React.Key;
}

const getBadge = (source: string) => {
  switch (source) {
    case 'generated': return { icon: <Icons.Sparkles className="w-3 h-3" />, label: 'AI', color: 'bg-violet-500' };
    case 'upload': return { icon: <Icons.Upload className="w-3 h-3" />, label: 'UP', color: 'bg-blue-500' };
    case 'remix': return { icon: <Icons.Wand className="w-3 h-3" />, label: 'RMX', color: 'bg-fuchsia-500' };
    case 'export': return { icon: <Icons.Download className="w-3 h-3" />, label: 'EXP', color: 'bg-green-500' };
    default: return { icon: <Icons.Image className="w-3 h-3" />, label: 'IMG', color: 'bg-slate-500' };
  }
};

export const AssetCard = ({ asset, isSelected, isSelectMode, onSelect, onClick, onAction, index = 0 }: AssetCardProps) => {
  const badge = getBadge(asset.source);

  return (
    <div 
      className={`
        group relative w-full aspect-square rounded-2xl overflow-hidden 
        bg-white dark:bg-[#1a1b26] 
        border transition-all duration-300 animate-fade-in-up
        ${isSelected 
          ? 'border-violet-500 ring-2 ring-violet-500/30' 
          : 'border-slate-200 dark:border-white/5 hover:border-violet-500/50 dark:hover:border-white/20 hover:shadow-xl'
        }
      `}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={isSelectMode ? onSelect : onClick}
    >
      <img src={asset.src} alt={asset.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-90" />
      
      {/* Selection Checkbox (Pro) */}
      {isSelectMode && onSelect && (
        <div className="absolute top-2 left-2 z-20">
           <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-violet-600 border-violet-600' : 'bg-black/40 border-white/30 backdrop-blur hover:bg-black/60'}`}>
              {isSelected && <Icons.Check className="w-3.5 h-3.5 text-white" />}
           </div>
        </div>
      )}

      {/* Type Badge */}
      <div className="absolute top-2 right-2 z-10">
         <div className={`px-1.5 py-1 rounded-md ${badge.color} text-white flex items-center gap-1 shadow-lg`}>
            {badge.icon}
            <span className="text-[9px] font-bold uppercase">{badge.label}</span>
         </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
         <p className="text-white text-xs font-bold truncate mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform drop-shadow-md">{asset.title}</p>
         
         {/* Quick Actions */}
         {!isSelectMode && (
           <div className="flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
              <button 
                onClick={(e) => { e.stopPropagation(); onAction('edit'); }}
                className="flex-1 py-1.5 rounded-lg bg-white text-black text-[10px] font-bold hover:bg-slate-200 transition-colors shadow-lg"
              >
                Edit
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onAction('download'); }}
                className="p-1.5 rounded-lg bg-black/40 backdrop-blur hover:bg-black/60 text-white border border-white/10"
              >
                <Icons.Download className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onAction('delete'); }}
                className="p-1.5 rounded-lg bg-red-500/20 backdrop-blur hover:bg-red-500 text-red-100 hover:text-white border border-red-500/30"
              >
                <Icons.Trash className="w-3.5 h-3.5" />
              </button>
           </div>
         )}
      </div>
    </div>
  );
};
