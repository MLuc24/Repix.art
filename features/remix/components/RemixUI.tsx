
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

// --- 1. STYLE PICKER ---
interface StylePillProps {
  id: string;
  label: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  key?: React.Key;
}

export const StylePill = ({ label, color, isSelected, onClick }: StylePillProps) => (
  <button
    onClick={onClick}
    className={`
      flex-none px-6 py-3 rounded-2xl border transition-all duration-300 font-semibold text-sm tracking-wide
      ${isSelected 
        ? `bg-gradient-to-r ${color} border-transparent text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-105` 
        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-105'
      }
    `}
  >
    {label}
  </button>
);

// --- 2. ORIGINAL PHOTO CARD ---
interface OriginalPhotoCardProps {
  imageSrc: string;
  onChangeClick: () => void;
}

export const OriginalPhotoCard = ({ imageSrc, onChangeClick }: OriginalPhotoCardProps) => (
  <div className="relative group w-full h-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1b26]">
    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
      <span className="text-xs font-bold text-white uppercase tracking-wider">Original</span>
    </div>
    <img 
      src={imageSrc} 
      alt="Original" 
      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
    
    {/* Change Photo Button */}
    <button 
      onClick={onChangeClick}
      className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium transition-all group-hover:-translate-y-1 group-active:scale-95"
    >
      <Icons.Image className="w-4 h-4" /> Change Photo
    </button>
  </div>
);

// --- 3. REMIX RESULT CARD ---
interface RemixCardProps {
  src: string;
  styleName: string;
  onHDClick: () => void;
  onApply: () => void;
}

export const RemixCard = ({ src, styleName, onHDClick, onApply }: RemixCardProps) => (
  <div className="group relative w-full aspect-square rounded-[24px] overflow-hidden border border-white/5 hover:border-violet-500/50 bg-[#1a1b26] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:-translate-y-2">
    <img 
      src={src} 
      alt={styleName} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    
    {/* OVERLAY ACTIONS */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
      <button 
        onClick={onApply}
        className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
      >
        <Icons.Check className="w-3 h-3" /> Apply
      </button>
      <button 
        onClick={onHDClick}
        className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-black/60 text-white font-bold text-xs border border-white/20 hover:bg-black/80 transition-all backdrop-blur-md"
      >
        <Icons.Download className="w-3 h-3" />
        HD Export <span className="text-[9px] bg-amber-400 text-black px-1 rounded ml-1">PRO</span>
      </button>
    </div>
  </div>
);

// --- 4. SKELETON LOADING ---
export const RemixSkeleton = () => (
  <div className="w-full aspect-square rounded-[24px] bg-white/5 animate-pulse relative overflow-hidden border border-white/5">
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
    <div className="absolute inset-0 flex items-center justify-center">
       <Icons.Sparkles className="w-8 h-8 text-white/10 animate-spin" />
    </div>
  </div>
);

// --- 5. ACTION BAR ---
interface RemixActionBarProps {
  isGenerating: boolean;
  onRegenerate: () => void;
  onRandom: () => void;
  onNavigate: (p: string) => void;
}

export const RemixActionBar = ({ isGenerating, onRegenerate, onRandom, onNavigate }: RemixActionBarProps) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
    <div className="p-2 rounded-2xl bg-[#0f0f12]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-between gap-4">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <button 
        onClick={onRegenerate}
        disabled={isGenerating}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors disabled:opacity-50"
      >
        <Icons.Refresh className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline">Regenerate</span>
      </button>

      <button 
        onClick={onRandom}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-medium transition-colors"
      >
        <Icons.Wand className="w-5 h-5" />
        <span className="hidden sm:inline">Random Style</span>
      </button>

      <div className="h-8 w-px bg-white/10" />

      <NeonButton onClick={() => onNavigate('editor')} className="!w-auto px-8 !py-3 !text-sm">
        Open in Editor
      </NeonButton>
    </div>
  </div>
);
