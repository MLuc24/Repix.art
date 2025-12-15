
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { NeonButton } from '../../../../shared/components/GlassUI';

interface CreditOverviewCardProps {
  balance: number;
  spent7d: number;
  avgDaily: number;
  onTopUp: () => void;
}

export const CreditOverviewCard = ({ balance, spent7d, avgDaily, onTopUp }: CreditOverviewCardProps) => {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#1a1b26] dark:to-[#0f0f12] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm dark:shadow-none">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 w-full md:w-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-500/10 dark:bg-violet-500/20 rounded-lg text-violet-600 dark:text-violet-400">
            <Icons.Wallet className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Available Credits</h2>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">{balance}</span>
          <span className="text-sm text-slate-500 font-medium">credits</span>
        </div>
      </div>

      {/* Stats Divider */}
      <div className="w-full h-px md:w-px md:h-16 bg-slate-200 dark:bg-white/10" />

      <div className="flex gap-8 md:gap-12 w-full md:w-auto">
        <div>
          <p className="text-xs text-slate-500 font-medium mb-1">Used (7d)</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{spent7d}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium mb-1">Daily Avg</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">~{avgDaily}</p>
        </div>
      </div>

      <div className="w-full md:w-auto">
        <NeonButton onClick={onTopUp} className="!py-3 !px-6 text-sm shadow-violet-900/20">
          Buy Credits
        </NeonButton>
      </div>
    </div>
  );
};
