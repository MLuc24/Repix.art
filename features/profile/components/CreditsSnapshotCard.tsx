
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

interface CreditsSnapshotCardProps {
  credits: number;
  onBuy: () => void;
  onLog: () => void;
}

export const CreditsSnapshotCard = ({ credits, onBuy, onLog }: CreditsSnapshotCardProps) => {
  return (
    <div className="group relative w-full rounded-[24px] overflow-hidden bg-white dark:bg-[#131418] border border-slate-200 dark:border-white/5 transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-none">
      
      {/* Background Gradient & Texture (Adaptive) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-violet-900/20 dark:via-[#0f0f14] dark:to-indigo-900/20 opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-200/50 dark:bg-violet-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-violet-300/50 dark:group-hover:bg-violet-500/30 transition-colors duration-500" />

      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Balance Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-white/5 border border-violet-200 dark:border-white/5 text-violet-600 dark:text-violet-300 shadow-sm">
              <Icons.Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Available Credits</span>
          </div>

          <div className="flex items-baseline justify-center md:justify-start gap-1 mb-6">
            <span className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tighter drop-shadow-sm">{credits}</span>
            <span className="text-lg text-slate-500 font-medium">cr</span>
          </div>

          {/* Mini Stats */}
          <div className="flex items-center justify-center md:justify-start gap-8">
             <div className="text-left">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mb-0.5">Used Today</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">12</p>
             </div>
             <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
             <div className="text-left">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mb-0.5">Expires</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Never</p>
             </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="w-full md:w-auto flex flex-col gap-3 min-w-[200px]">
          <NeonButton onClick={onBuy} className="!w-full shadow-lg shadow-violet-500/20 !py-3">
            <div className="flex items-center justify-center gap-2">
              <Icons.Plus className="w-4 h-4" /> Top Up Balance
            </div>
          </NeonButton>
          <button 
            onClick={onLog}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
          >
            <Icons.FileText className="w-4 h-4 group-hover/btn:text-violet-500 dark:group-hover/btn:text-violet-400 transition-colors" /> View History
          </button>
        </div>

      </div>
    </div>
  );
};
