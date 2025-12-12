import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { Preset } from '../../../features/presets/types';

interface PresetCardProps {
  preset: Preset;
  onApply: () => void;
  onEdit: () => void;
  onExport: () => void;
  onDelete: () => void;
  key?: React.Key;
}

export const PresetCard = ({ preset, onApply, onEdit, onExport, onDelete }: PresetCardProps) => {
  return (
    <div className="group relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#1a1b26] border border-white/5 hover:border-violet-500/30 transition-all duration-300">
      {/* Thumbnail */}
      <img 
        src={preset.thumbnail} 
        alt={preset.name} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Badges */}
      <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
        {preset.isCustom && (
          <span className="px-1.5 py-0.5 rounded bg-violet-600 text-white text-[8px] font-bold uppercase tracking-wider shadow-sm">
            My Preset
          </span>
        )}
        {!preset.isCustom && preset.isPro && (
          <span className="px-1.5 py-0.5 rounded bg-amber-500/90 text-black text-[8px] font-bold uppercase tracking-wider shadow-sm">
            Pro
          </span>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-3">
        <p className="text-[9px] text-violet-300 font-bold uppercase mb-0.5">{preset.category}</p>
        <h4 className="text-sm font-bold text-white leading-tight mb-2 truncate">{preset.name}</h4>
        
        {/* Hover Actions */}
        <div className="grid grid-cols-4 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-2 group-hover:translate-y-0">
           <button 
             onClick={(e) => { e.stopPropagation(); onApply(); }} 
             className="col-span-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold rounded mb-1 shadow-lg"
           >
             Apply
           </button>
           
           <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white" title="Edit">
             <Icons.Settings className="w-3 h-3 mx-auto" />
           </button>
           <button onClick={(e) => { e.stopPropagation(); onExport(); }} className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white" title="Export JSON">
             <Icons.Download className="w-3 h-3 mx-auto" />
           </button>
           <button className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white" title="Share Link">
             <Icons.ArrowRight className="w-3 h-3 mx-auto -rotate-45" />
           </button>
           {preset.isCustom && (
             <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 rounded bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white" title="Delete">
               <Icons.Trash className="w-3 h-3 mx-auto" />
             </button>
           )}
        </div>
      </div>
    </div>
  );
};
