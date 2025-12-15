
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { ProInsight } from '../../../../features/billing/types';

export const CreditInsightCard = ({ insight, onAction }: { insight: ProInsight, onAction: (path: string) => void }) => {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-cyan-900/20 border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-5 relative overflow-hidden h-full flex flex-col shadow-sm dark:shadow-none">
      <div className="absolute top-0 right-0 p-3 opacity-20">
        <Icons.Sparkles className="w-12 h-12 text-cyan-600 dark:text-cyan-400" />
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-[10px] font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider flex items-center gap-1">
          <Icons.Bolt className="w-3 h-3" /> AI Insight
        </span>
      </div>

      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{insight.title}</h4>
      <p className="text-xs text-slate-600 dark:text-cyan-100/70 leading-relaxed mb-4 flex-1">
        {insight.message}
      </p>

      {insight.actionLabel && (
        <button 
          onClick={() => insight.actionRoute && onAction(insight.actionRoute)}
          className="text-xs font-bold text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-white transition-colors flex items-center gap-1"
        >
          {insight.actionLabel} <Icons.ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
