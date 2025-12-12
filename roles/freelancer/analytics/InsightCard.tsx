
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { PerformanceInsight } from './types';

export const InsightCard = ({ insight }: { insight: PerformanceInsight; key?: React.Key }) => {
  const isSuccess = insight.type === 'success';
  
  return (
    <div className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${isSuccess ? 'bg-green-500/5 border-green-500/20' : 'bg-orange-500/5 border-orange-500/20'}`}>
      <div className={`p-2 rounded-full shrink-0 ${isSuccess ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
        <Icons.Sparkles className="w-5 h-5" />
      </div>
      <div>
        <h4 className={`text-sm font-bold mb-1 ${isSuccess ? 'text-green-300' : 'text-orange-300'}`}>
          {insight.title}
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          {insight.description}
        </p>
      </div>
    </div>
  );
};
