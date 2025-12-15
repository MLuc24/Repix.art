
import React from 'react';
import { DailyUsage } from '../../../../features/billing/types';

interface UsageTimelineChartProps {
  data: DailyUsage[];
  activeRange?: '7d' | '30d';
  onRangeChange?: (range: '7d' | '30d') => void;
}

export const UsageTimelineChart = ({ data, activeRange = '7d', onRangeChange }: UsageTimelineChartProps) => {
  const maxVal = Math.max(...data.map(d => d.amount));

  return (
    <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Spending History</h3>
        <div className="flex bg-slate-100 dark:bg-black/20 rounded-lg p-0.5">
          <button 
            onClick={() => onRangeChange?.('7d')}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${activeRange === '7d' ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm dark:shadow-none' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => onRangeChange?.('30d')}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${activeRange === '30d' ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm dark:shadow-none' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="h-48 flex justify-between gap-2 md:gap-4 mt-8">
        {data.map((day, idx) => {
          // Prevent division by zero
          const safeMax = maxVal || 1; 
          // Scale to max 80% to leave room for label at bottom
          const heightPercent = (day.amount / safeMax) * 80;
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-2 group relative h-full">
              
              {/* Tooltip */}
              <div className="absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 dark:bg-black/80 text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-20 border border-white/10 mb-1">
                {day.amount} Credits
              </div>

              {/* Bar */}
              <div 
                className="w-full max-w-[24px] bg-violet-100 dark:bg-violet-500/20 border-t-2 border-violet-500 rounded-t-sm hover:bg-violet-200 dark:hover:bg-violet-500/40 transition-all duration-300 min-h-[4px]"
                style={{ height: `${heightPercent}%` }}
              />
              
              {/* Label */}
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase h-4 flex items-center">{day.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
