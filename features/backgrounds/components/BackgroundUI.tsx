
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { BackgroundPack } from '../types';

// --- FEATURED BANNER ---
export const FeaturedPackBanner = () => (
  <div className="relative w-full rounded-[40px] overflow-hidden border border-slate-200 group mb-12 animate-fade-in-up shadow-xl shadow-indigo-100">
    {/* Background & Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600" />
    <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

    <div className="relative z-10 p-10 md:p-16 flex flex-col items-start gap-6 max-w-2xl">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
        <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">New Arrival</span>
      </div>
      
      <div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
          Aesthetic Studio Pack
        </h2>
        <p className="text-lg text-slate-100/90 leading-relaxed font-medium">
          Upgrade your product shots with 20+ premium studio lighting setups and podiums.
        </p>
      </div>

      <div className="flex gap-4 mt-2">
        <NeonButton className="!w-auto px-8 py-4 !rounded-2xl shadow-lg shadow-violet-900/20">
          View Pack
        </NeonButton>
        <button className="px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold backdrop-blur-md border border-white/30 transition-colors">
          Preview All
        </button>
      </div>
    </div>
  </div>
);

// --- PACK CARD (MASONRY COMPATIBLE) ---
interface BackgroundPackCardProps {
  pack: BackgroundPack;
  onClick: () => void;
  index?: number;
  className?: string; // Allow passing aspect ratio class
  key?: React.Key;
}

export const BackgroundPackCard = ({ pack, onClick, index = 0, className = "aspect-[4/5]" }: BackgroundPackCardProps) => (
  <div 
    onClick={onClick}
    className={`group relative w-full rounded-[26px] overflow-hidden border border-slate-200 bg-white cursor-pointer animate-fade-in-up hover:z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200 mb-4 break-inside-avoid ${className}`}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    {/* Image */}
    <img 
      src={pack.thumbnail} 
      alt={pack.title} 
      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${pack.isPro ? 'contrast-110' : ''}`}
    />

    {/* Overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
    
    {/* Badges */}
    <div className="absolute top-4 right-4 flex gap-2">
       <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/50 text-xs font-bold text-slate-800 shadow-sm">
         {pack.count} items
       </div>
       {pack.isPro && (
        <div className="px-3 py-1 rounded-full bg-amber-400 text-xs font-bold text-black uppercase tracking-wide flex items-center gap-1">
          <Icons.Lock className="w-3 h-3" /> PRO
        </div>
       )}
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-200 transition-colors drop-shadow-md">{pack.title}</h3>
      <p className="text-sm text-slate-300 mb-4 line-clamp-1">{pack.description}</p>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-violet-400 pb-0.5">
          View Pack <Icons.ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  </div>
);

// --- UPSELL BANNER ---
export const BackgroundUpsellBanner = () => (
  <div className="relative mt-16 rounded-[32px] overflow-hidden p-[1px] bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 animate-fade-in-up shadow-xl">
    <div className="relative bg-white rounded-[31px] px-8 py-10 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-violet-100 blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Unlock All Background Packs</h2>
        <p className="text-slate-600 max-w-lg text-lg">
          Get instant access to 60+ premium backdrops, future releases, and commercial license for just <span className="text-violet-600 font-bold">8 credits</span>.
        </p>
      </div>

      <div className="relative z-10 flex-none">
        <NeonButton className="px-10 py-4 shadow-violet-500/30">
          Unlock All Packs
        </NeonButton>
      </div>
    </div>
  </div>
);
