
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { Template } from '../types';
import { NeonButton } from '../../../shared/components/GlassUI';

// --- FILTER PILL ---
export const FilterPill = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void, key?: React.Key }) => (
  <button
    onClick={onClick}
    className={`
      whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300
      ${isActive 
        ? 'bg-gradient-to-r from-[#8A5CF6] to-[#C470F9] text-white shadow-[0_4px_20px_-5px_rgba(139,92,246,0.5)] transform -translate-y-[2px]' 
        : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/10'
      }
    `}
  >
    {label}
  </button>
);

// --- SEARCH BAR ---
export const SearchBar = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
  <div className="relative w-full group">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-400 transition-colors">
      <Icons.Search className="w-5 h-5" />
    </div>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search backgrounds..."
      className="
        w-full pl-12 pr-4 py-3 rounded-2xl bg-[#1a1b26]/50 border border-slate-200/5 dark:border-white/5
        text-slate-900 dark:text-white placeholder-slate-500 outline-none transition-all duration-300
        focus:border-violet-500/50 focus:bg-[#1a1b26] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)]
      "
    />
  </div>
);

// --- TEMPLATE HERO BANNER (Aesthetic Studio Style) ---
interface TemplateHeroProps {
  onViewPack: () => void;
  onPreviewAll: () => void;
}

export const TemplateHero = ({ onViewPack, onPreviewAll }: TemplateHeroProps) => (
  <div className="relative w-full h-[340px] rounded-[32px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group animate-fade-in-up transition-transform duration-500 hover:scale-[1.005]">
    
    {/* Gradient Background & Texture */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] via-[#a855f7] to-[#ec4899] transition-transform duration-[2s] group-hover:scale-110" />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-16 max-w-4xl">
       {/* Badge */}
       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/10 backdrop-blur-md border border-teal-400/20 w-fit mb-6 shadow-sm">
         <div className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse shadow-[0_0_8px_#5eead4]" />
         <span className="text-[10px] font-bold text-teal-200 uppercase tracking-widest">New Arrival</span>
       </div>

       {/* Title */}
       <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-xl leading-tight">
         Aesthetic Studio Pack
       </h2>

       {/* Desc */}
       <p className="text-lg md:text-xl text-violet-100/90 font-medium mb-8 leading-relaxed max-w-xl drop-shadow-md">
         Upgrade your product shots with 20+ premium studio lighting setups and podiums.
       </p>

       {/* Buttons */}
       <div className="flex flex-col sm:flex-row gap-4">
         <button 
           onClick={onViewPack} 
           className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-violet-900/30 hover:shadow-violet-600/50 hover:scale-105 transition-all duration-300"
         >
           View Pack
         </button>
         <button 
           onClick={onPreviewAll} 
           className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all hover:scale-105"
         >
           Preview All
         </button>
       </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/40 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-500/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
  </div>
);

// --- TEMPLATE CARD (Professional Vertical Rectangle) ---
interface TemplateCardProps {
  template: Template;
  onPreview: (t: Template) => void;
  onUse: (t: Template) => void;
  index?: number;
  className?: string; 
  key?: React.Key;
}

export const TemplateCard = ({ template, onPreview, onUse, index = 0, className = "aspect-[3/4]" }: TemplateCardProps) => (
  <div 
    className={`
      group relative w-full rounded-[20px] overflow-hidden bg-[#1a1b26] border border-white/5 
      animate-fade-in-up hover:z-10 transition-all duration-500 hover:-translate-y-1.5 
      hover:shadow-2xl hover:shadow-violet-500/10 mb-4 break-inside-avoid
      ${className}
    `}
    style={{ animationDelay: `${index * 0.08}s` }}
  >
    {/* Image - Ensure Object Cover for Vertical Ratios */}
    <img 
      src={template.thumbnail} 
      alt={template.title} 
      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

    {/* Top Badges */}
    <div className="absolute top-3 left-3">
       <span className="px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider shadow-sm">
         {template.category}
       </span>
    </div>

    {/* PRO Badge */}
    {template.isPro && (
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-amber-500/90 backdrop-blur-sm text-black text-[9px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-lg">
        <Icons.Lock className="w-2.5 h-2.5" /> Pro
      </div>
    )}

    {/* Hover Overlay Content */}
    <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end">
      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-base leading-tight mb-1 drop-shadow-md">{template.title}</h3>
        <p className="text-[10px] text-slate-300 mb-0 group-hover:mb-3 transition-all duration-300 opacity-80">{template.author}</p>

        <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 h-0 group-hover:h-auto overflow-hidden">
          <button 
            onClick={() => onPreview(template)}
            className="py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[10px] font-bold transition-colors backdrop-blur-md"
          >
            Preview
          </button>
          <button 
            onClick={() => onUse(template)}
            className={`
              py-2 rounded-lg text-[10px] font-bold transition-colors flex items-center justify-center gap-1 shadow-lg
              ${template.isPro 
                ? 'bg-amber-500 hover:bg-amber-400 text-black' 
                : 'bg-violet-600 hover:bg-violet-500 text-white'
              }
            `}
          >
            {template.isPro ? 'Unlock' : 'Use This'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- PROMO BANNER (Legacy support, kept just in case) ---
export const PackPromoBanner = TemplateHero;
