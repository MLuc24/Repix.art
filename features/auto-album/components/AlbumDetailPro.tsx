
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { ProAlbum } from '../types';

interface AlbumDetailProProps {
  album: ProAlbum;
  onBack: () => void;
  onRefine: () => void;
  onNavigate: (path: string) => void;
}

export const AlbumDetailPro = ({ album, onBack, onRefine, onNavigate }: AlbumDetailProProps) => {
  return (
    <div className="h-full flex flex-col md:flex-row bg-[#0e0f13] animate-fade-in-up">
      
      {/* LEFT SIDEBAR: META */}
      <div className="w-full md:w-72 border-r border-white/5 p-6 flex flex-col bg-[#131418]">
         <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 text-sm font-bold transition-colors">
           <Icons.ChevronLeft className="w-4 h-4" /> Back to Albums
         </button>

         <div className="mb-8">
           <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative group">
             <img src={album.coverImages[0]} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs font-bold opacity-70 uppercase tracking-wider">{album.type}</p>
                <h2 className="text-xl font-bold leading-tight">{album.title}</h2>
             </div>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                 <Icons.Calendar className="w-4 h-4" /> {album.date}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                 <Icons.Image className="w-4 h-4" /> {album.count} Photos
              </div>
              {album.location && (
                <div className="flex items-center gap-3 text-sm text-slate-400">
                   <Icons.Sun className="w-4 h-4" /> {album.location}
                </div>
              )}
           </div>
         </div>

         {/* AI Refine Section (Monetization) */}
         <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 border border-violet-500/20">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Icons.Sparkles className="w-4 h-4 text-amber-400" /> AI Refine
            </h4>
            <ul className="text-xs text-slate-400 space-y-1 mb-4 pl-1">
               <li>• Remove duplicates</li>
               <li>• Auto-select best shots</li>
               <li>• Enhance lighting</li>
            </ul>
            <NeonButton onClick={onRefine} className="w-full text-xs py-2.5">
               Refine (1 Credit)
            </NeonButton>
         </div>
      </div>

      {/* MAIN CONTENT: GRID */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
         {/* Toolbar */}
         <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0e0f13]/90 backdrop-blur z-10">
            <div className="flex items-center gap-4">
               <button className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Select All</button>
               <div className="h-4 w-px bg-white/10" />
               <span className="text-xs text-slate-500">{album.count} items</span>
            </div>
            <div className="flex gap-2">
               <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"><Icons.Grid className="w-4 h-4" /></button>
               <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"><Icons.Layout className="w-4 h-4" /></button>
            </div>
         </div>

         {/* Photo Grid */}
         <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {album.photos.map((photo) => (
                 <div key={photo.id} className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-white/5 cursor-pointer" onClick={() => onNavigate('editor')}>
                    <img src={photo.src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-1.5 rounded-full bg-white text-black shadow-lg hover:scale-110 transition-transform">
                          <Icons.Sliders className="w-3 h-3" />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};
