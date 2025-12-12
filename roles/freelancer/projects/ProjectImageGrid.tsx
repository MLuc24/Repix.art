
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ProjectAsset } from '../../../services/mock/freelancer';

interface ProjectImageGridProps {
  assets: ProjectAsset[];
  onOpen: (asset: ProjectAsset) => void;
  onDelete: (id: string) => void;
}

export const ProjectImageGrid = ({ assets, onOpen, onDelete }: ProjectImageGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {/* Upload Placeholder */}
      <button className="aspect-[4/5] rounded-2xl border border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-3 transition-all group">
         <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
            <Icons.Plus className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
         </div>
         <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-400">Add Asset</span>
      </button>

      {assets.map((asset) => (
        <div 
          key={asset.id}
          className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1b26] border border-white/5 hover:border-cyan-500/30 transition-all"
          onClick={() => onOpen(asset)}
        >
          <img src={asset.src} alt={asset.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
             {asset.type === 'generated' && <span className="p-1.5 rounded-md bg-violet-600/90 text-white shadow-sm"><Icons.Sparkles className="w-3 h-3" /></span>}
             {asset.type === 'remix' && <span className="p-1.5 rounded-md bg-fuchsia-600/90 text-white shadow-sm"><Icons.Wand className="w-3 h-3" /></span>}
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 backdrop-blur-[2px] cursor-pointer">
             <button className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
               Open Editor
             </button>
             <div className="flex gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform delay-75">
               <button 
                 onClick={(e) => { e.stopPropagation(); onDelete(asset.id); }}
                 className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 transition-colors border border-white/10"
                 title="Delete"
               >
                 <Icons.Trash className="w-4 h-4" />
               </button>
             </div>
          </div>
          
          {/* Footer Info */}
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
             <p className="text-[10px] font-bold text-white truncate">{asset.name}</p>
             <p className="text-[9px] text-slate-400 uppercase">{asset.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
