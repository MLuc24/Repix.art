
import React from 'react';
import { UsageStat } from '../../../../features/billing/types';

export const UsageBreakdownList = ({ stats }: { stats: UsageStat[] }) => {
  return (
    <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-2xl p-6 h-full shadow-sm dark:shadow-none">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Usage by Tool</h3>
      
      <div className="space-y-5">
        {stats.map((stat) => (
          <div key={stat.id}>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-600 dark:text-slate-300 font-medium">{stat.toolName}</span>
              <span className="text-slate-500">{stat.creditsSpent} credits</span>
            </div>
            
            <div className="h-2 w-full bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden flex items-center">
              <div 
                className={`h-full rounded-full ${stat.color}`} 
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 text-center">
        <button className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-white transition-colors font-medium">
          View Detailed Report
        </button>
      </div>
    </div>
  );
};
