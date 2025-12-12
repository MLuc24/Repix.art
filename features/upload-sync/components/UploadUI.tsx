import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { UploadItem, SmartAlbum } from '../types';

// --- DROPZONE ---
export const UploadDropzone = ({ onFilesSelected }: { onFilesSelected: () => void }) => (
  <div 
    onClick={onFilesSelected}
    className="
      group relative w-full aspect-[2/1] md:aspect-[3/1] rounded-[32px] 
      border-2 border-dashed 
      border-slate-300 dark:border-white/10 
      hover:border-violet-500 dark:hover:border-violet-500/50 
      bg-slate-50 dark:bg-white/[0.02] 
      hover:bg-slate-100 dark:hover:bg-white/[0.05] 
      transition-all duration-300 cursor-pointer overflow-hidden
      flex flex-col items-center justify-center gap-6
    "
  >
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10 p-5 rounded-full bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl group-hover:scale-110 transition-transform duration-300">
      <Icons.Upload className="w-8 h-8 text-violet-500 dark:text-violet-400" />
    </div>

    <div className="relative z-10 text-center space-y-2">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
        Upload 5-20 photos at once
      </h3>
      <p className="text-slate-500 dark:text-slate-400">Drag & drop or click to select</p>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-violet-500/30 animate-pulse" />
    <div className="absolute bottom-10 right-10 w-3 h-3 rounded-full bg-cyan-500/30 animate-pulse" style={{ animationDelay: '1s' }} />
  </div>
);

// --- QUEUE ITEM CARD ---
export const UploadQueueCard = ({ item }: { item: UploadItem; key?: React.Key }) => (
  <div className="relative group rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 overflow-hidden flex items-center p-3 gap-4 animate-fade-in-up shadow-sm dark:shadow-none">
    {/* Thumbnail */}
    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-none bg-slate-100 dark:bg-white/5">
      <img src={item.previewUrl} alt="Preview" className="w-full h-full object-cover" />
      {item.status === 'uploading' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Icons.Refresh className="w-4 h-4 text-white animate-spin" />
        </div>
      )}
      {item.status === 'completed' && (
        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
          <div className="p-1 rounded-full bg-green-500 text-white"><Icons.Check className="w-3 h-3" /></div>
        </div>
      )}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.name}</p>
        <button className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Icons.Close className="w-4 h-4" /></button>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${item.status === 'completed' ? 'bg-green-500' : 'bg-violet-500'}`} 
          style={{ width: `${item.progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-500">{item.size}</span>
        <span className="text-[10px] font-mono text-slate-400">{item.progress}%</span>
      </div>
    </div>
  </div>
);

// --- SMART ALBUM CARD ---
export const SmartAlbumCard = ({ album, index = 0 }: { album: SmartAlbum, index?: number, key?: React.Key }) => (
  <div 
    className="group relative w-full cursor-pointer animate-fade-in-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Card Body */}
    <div className="aspect-[4/5] rounded-[24px] overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-[#15161b] relative">
      
      {/* Collage Layout */}
      <div className="absolute inset-0 grid grid-rows-2 gap-0.5">
         <div className="w-full h-full overflow-hidden">
            <img src={album.previews[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
         </div>
         <div className="grid grid-cols-2 gap-0.5">
            <div className="w-full h-full overflow-hidden">
              <img src={album.previews[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="w-full h-full overflow-hidden">
              <img src={album.previews[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
         </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
           <div className="flex items-center gap-2 mb-2">
             <span className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-[10px] font-bold uppercase tracking-wider text-violet-300 backdrop-blur-md">
               {album.tag}
             </span>
           </div>
           <h3 className="text-xl font-bold text-white mb-1">{album.title}</h3>
           <p className="text-sm text-slate-400">{album.count} photos</p>
        </div>
      </div>
      
      {/* Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-violet-500/30 rounded-[24px] transition-colors pointer-events-none" />
    </div>
  </div>
);