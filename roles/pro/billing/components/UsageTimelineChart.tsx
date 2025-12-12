
import React from 'react';
import { DailyUsage } from '../../../../features/billing/types';

export const UsageTimelineChart = ({ data }: { data: DailyUsage[] }) => {
  const maxVal = Math.max(...data.map(d => d.amount));

  return (
    <div className="bg-[#1a1b26] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white">Spending History</h3>
        <div className="flex bg-black/20 rounded-lg p-0.5">
          <button className="px-3 py-1 text-[10px] font-bold bg-white/10 rounded text-white">7 Days</button>
          <button className="px-3 py-1 text-[10px] font-bold text-slate-500 hover:text-white transition-colors">30 Days</button>
        </div>
      </div>

      <div className="h-48 flex items-end justify-between gap-2 md:gap-4">
        {data.map((day, idx) => {
          const heightPercent = (day.amount / maxVal) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
              
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10 border border-white/10">
                {day.amount} Credits
              </div>

              {/* Bar */}
              <div 
                className="w-full max-w-[24px] bg-violet-500/20 border-t-2 border-violet-500 rounded-t-sm hover:bg-violet-500/40 transition-all duration-300"
                style={{ height: `${heightPercent}%` }}
              />
              
              {/* Label */}
              <span className="text-[10px] text-slate-500 font-medium uppercase">{day.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
