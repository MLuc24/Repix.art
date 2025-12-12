
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

// --- WRAPPER ---
export const SpotlightWrapper = ({ children }: { children?: React.ReactNode }) => (
  <section className="w-full flex flex-col items-center text-center py-8 md:py-12">
    {children}
  </section>
);

// --- HERO COMPONENT (Version 19) ---
export const DashboardImageGeneratorHero = ({ onTextToImage, onRemix }: { onTextToImage: () => void, onRemix: () => void }) => (
  <div className="mb-10 animate-fade-in-up w-full max-w-4xl mx-auto">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-white/5 border border-violet-100 dark:border-white/10 text-violet-600 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md transition-colors">
      <Icons.Sparkles className="w-3 h-3 animate-pulse text-violet-500 dark:text-violet-400" />
      <span>AI Studio v2.0</span>
    </div>
    
    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-sm dark:drop-shadow-xl transition-colors">
      Start with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">AI Image Generator</span>
    </h1>
    
    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 transition-colors">
      Type an idea or remix your photo into something new.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
      <NeonButton 
        onClick={onTextToImage} 
        className="flex-1 py-4 text-base shadow-violet-200 dark:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-violet-300 dark:hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] border border-transparent dark:border-white/20"
      >
        <Icons.Wand className="w-5 h-5" />
        <span className="ml-2">Generate from Text</span>
      </NeonButton>
      
      <button 
        onClick={onRemix}
        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-violet-500/30 transition-all backdrop-blur-md group shadow-sm dark:shadow-none"
      >
        <Icons.Image className="w-5 h-5 text-fuchsia-500 dark:text-fuchsia-400 group-hover:scale-110 transition-transform" />
        <span>Remix a Photo</span>
      </button>
    </div>
  </div>
);

// --- QUICK PROMPT INPUT (Version 19) ---
interface DashboardQuickPromptProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  credits: number;
  onBuyCredits: () => void;
}

export const DashboardQuickPrompt = ({ value, onChange, onSubmit, credits, onBuyCredits }: DashboardQuickPromptProps) => {
  const hasCredits = credits > 0;

  return (
    <div className="w-full max-w-3xl mx-auto mb-4 relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 rounded-2xl opacity-10 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-60 transition duration-500 blur"></div>
      
      <div className="relative flex flex-col md:flex-row items-center bg-white dark:bg-[#15161b] border border-slate-200 dark:border-transparent rounded-2xl p-2 shadow-xl dark:shadow-2xl transition-colors">
        <div className="pl-4 text-slate-400 dark:text-slate-500 hidden md:block">
          <Icons.Sparkles className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && hasCredits && onSubmit()}
          placeholder="Describe what you want to create..."
          className="w-full md:flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-4 py-3 font-medium transition-colors"
        />
        
        {hasCredits ? (
          <button 
            onClick={onSubmit}
            className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold hover:bg-slate-800 dark:hover:bg-violet-50 transition-colors flex items-center justify-center gap-2 mt-2 md:mt-0 shadow-lg shadow-slate-900/10 dark:shadow-none"
          >
            <span>Generate</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={onBuyCredits}
            className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors flex items-center justify-center gap-2 mt-2 md:mt-0 shadow-lg shadow-violet-500/20"
          >
            <Icons.Bolt className="w-4 h-4" />
            <span>Buy Credits</span>
          </button>
        )}
      </div>
      <p className="text-center text-[10px] text-slate-500 dark:text-slate-500 mt-3 transition-colors">
        AI Image Generator is the fastest way to start creating in REPIX. 1 credit per image.
      </p>
    </div>
  );
};

// --- LEGACY STYLE CAROUSEL ---
export const SpotlightCarousel = ({ styles, onSelectStyle }: { styles: any[], onSelectStyle: (style: any) => void }) => (
  <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
    {/* Implementation hidden to focus on V19 requirements */}
  </div>
);
