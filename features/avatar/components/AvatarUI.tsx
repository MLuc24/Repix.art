
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton, GlassPanel } from '../../../shared/components/GlassUI';
import { AvatarStyle, UploadedPhoto, AvatarResult } from '../types';

// --- STEP 1: UPLOAD UI ---

export const UploadDropzone = ({ onUpload }: { onUpload: () => void }) => (
  <div 
    onClick={onUpload}
    className="
      relative group cursor-pointer w-full aspect-[3/1] rounded-3xl 
      border-2 border-dashed border-slate-300 dark:border-white/20 
      hover:border-violet-500 dark:hover:border-violet-500/50 
      bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 
      transition-all duration-300
      flex flex-col items-center justify-center gap-4 p-8
    "
  >
    <div className="w-16 h-16 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:scale-110 transition-all shadow-sm dark:shadow-none">
      <Icons.Image className="w-8 h-8" />
    </div>
    <div className="text-center">
      <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-1">Upload 3-6 Portrait Photos</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">Clear face, different angles recommended</p>
    </div>
  </div>
);

export const PhotoGrid = ({ photos, onRemove }: { photos: UploadedPhoto[], onRemove: (id: string) => void }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-8">
    {photos.map((photo) => (
      <div key={photo.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
        <img src={photo.url} alt="Uploaded" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => onRemove(photo.id)}
            className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors"
          >
            <Icons.Trash className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-violet-500/50 rounded-2xl pointer-events-none transition-colors" />
      </div>
    ))}
    {/* Empty slots placeholders */}
    {Array.from({ length: Math.max(0, 6 - photos.length) }).map((_, i) => (
      <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center">
        <Icons.User className="w-6 h-6 text-slate-300 dark:text-white/10" />
      </div>
    ))}
  </div>
);

export const TipsCard = ({ className = "" }: { className?: string }) => (
  <div className={`p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-md ${className}`}>
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 shrink-0">
         <Icons.Bolt className="w-5 h-5" />
      </div>
      <div className="text-left">
        <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Best Results Tips</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Avoid heavy filters, sunglasses, or masks. Use good lighting for sharper AI avatars.
        </p>
      </div>
    </div>
  </div>
);

// --- STEP 2: STYLE SELECTION ---

export const StyleCard = ({ style, isSelected, onClick }: { style: AvatarStyle, isSelected: boolean, onClick: () => void, key?: React.Key }) => (
  <div 
    onClick={onClick}
    className={`
      group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
      ${isSelected 
        ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-[#0e0f14] scale-105 shadow-[0_0_30px_rgba(139,92,246,0.3)]' 
        : 'opacity-80 hover:opacity-100 hover:scale-[1.02]'
      }
    `}
  >
    <img src={style.preview} alt={style.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
      <div className="flex items-center justify-between">
        <h3 className={`font-bold text-sm ${isSelected ? 'text-violet-300' : 'text-white'}`}>{style.name}</h3>
        {style.isPro && <Icons.Lock className="w-3 h-3 text-amber-400" />}
      </div>
      <p className="text-[10px] text-slate-400 line-clamp-1">{style.description}</p>
    </div>

    {style.isNew && (
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider">
        New
      </div>
    )}

    {/* Selection Overlay */}
    {isSelected && (
      <div className="absolute inset-0 bg-violet-500/10 border-2 border-violet-500 rounded-2xl pointer-events-none" />
    )}
  </div>
);

// --- STEP 3: LOADING ---

export const GeneratingLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in-up">
    <div className="relative w-32 h-32 mb-8">
      <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-white/5" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-cyan-500 animate-spin" style={{ animationDuration: '3s' }} />
      <div className="absolute inset-4 rounded-full bg-slate-50 dark:bg-white/5 backdrop-blur-md flex items-center justify-center">
        <Icons.Sparkles className="w-10 h-10 text-slate-800 dark:text-white animate-pulse" />
      </div>
      {/* Particles */}
      <div className="absolute -top-4 -right-4 w-4 h-4 bg-violet-500 rounded-full blur-md animate-float" />
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-500 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }} />
    </div>
    
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 mb-3">
      Creating your Avatars...
    </h2>
    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
      This usually takes 10-20 seconds. Our AI is analyzing your facial features to match the chosen style.
    </p>
  </div>
);

// --- STEP 4: RESULTS ---

export const ResultCard = ({ result }: { result: AvatarResult }) => (
  <div className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 transition-all hover:shadow-xl">
    <img src={result.src} alt="Avatar Result" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    
    {/* Actions */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[1px]">
       <button className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-lg">
         <Icons.Download className="w-5 h-5" />
       </button>
       <div className="flex gap-2">
         <button className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs text-white hover:bg-black/80">Edit</button>
         <button className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs text-white hover:bg-black/80">Share</button>
       </div>
    </div>
  </div>
);

export const UpsellBanner = () => (
  <div className="mt-12 p-1 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 animate-fade-in-up">
    <div className="bg-white dark:bg-[#0e0f14] rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 text-center md:text-left">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unlock Complete Avatar Pack</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md">
          Get 20+ HD variations, 4K resolution, and commercial usage rights. Generated instantly based on your style.
        </p>
      </div>

      <div className="relative z-10 flex-none">
        <button className="group relative px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl overflow-hidden transition-transform active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 dark:from-violet-200 dark:to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            Unlock for 3 Credits <Icons.ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  </div>
);
