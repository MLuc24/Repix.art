
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ProAlbum } from '../types';

interface AlbumCardProProps {
  album: ProAlbum;
  onClick: () => void;
  index?: number;
  key?: React.Key;
}

export const AlbumCardPro = ({ album, onClick, index = 0 }: AlbumCardProProps) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full flex flex-col gap-3 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* 2x2 Grid Cover */}
      <div className="relative aspect-square rounded-[20px] overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1a1b26] hover:border-violet-500/30 hover:shadow-2xl transition-all duration-300">
        <div className="grid grid-cols-2 h-full gap-0.5 bg-slate-200 dark:bg-black/20">
          {album.coverImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden bg-slate-100 dark:bg-white/5">
              <img 
                src={src} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt=""
              />
            </div>
          ))}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
           {album.isRefined && (
             <div className="px-2 py-0.5 rounded bg-amber-500 text-black text-[9px] font-bold uppercase flex items-center gap-1 shadow-sm">
               <Icons.Star className="w-2.5 h-2.5" /> AI Refined
             </div>
           )}
           {album.location && (
             <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur border border-white/10 text-white text-[9px] font-bold uppercase flex items-center gap-1">
               <Icons.Sun className="w-2.5 h-2.5" /> {album.location}
             </div>
           )}
        </div>

        {/* Hover Actions (Center) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="px-5 py-2 bg-white text-black font-bold text-xs rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105">
             Open Album
           </button>
        </div>

        {/* Stats (Bottom Right) */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur text-white text-[10px] font-bold border border-white/10">
          {album.count} photos
        </div>
      </div>

      {/* Meta Info */}
      <div className="px-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
            {album.title}
          </h3>
          <div className="flex -space-x-2">
             {album.faces?.slice(0,3).map((avatar, i) => (
               <img key={i} src={avatar} className="w-5 h-5 rounded-full border border-white dark:border-[#0e0f13]" />
             ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
           <span className="bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">{album.type}</span>
           <span>•</span>
           <span>{album.date}</span>
        </div>
      </div>
    </div>
  );
};
