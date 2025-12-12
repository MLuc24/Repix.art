
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { PerformanceStat } from './types';

export const OverviewStatCard = ({ stat }: { stat: PerformanceStat; key?: React.Key }) => {
  const getIcon = () => {
    switch (stat.iconType) {
      case 'check': return <Icons.Check className="w-5 h-5" />;
      case 'clock': return <Icons.FileText className="w-5 h-5" />; // Clock icon proxy
      case 'refresh': return <Icons.Refresh className="w-5 h-5" />;
      case 'bolt': return <Icons.Bolt className="w-5 h-5" />;
      default: return <Icons.Activity className="w-5 h-5" />;
    }
  };

  const getColor = () => {
    switch (stat.iconType) {
      case 'check': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'clock': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'refresh': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'bolt': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col p-5 rounded-2xl bg-[#1a1b26] border border-white/5 hover:border-white/10 transition-colors shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-xl border ${getColor()}`}>
          {getIcon()}
        </div>
        {stat.trend && (
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.isPositiveTrend ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {stat.trend}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-3xl font-extrabold text-white mb-1">
          {stat.value}
          {stat.unit && <span className="text-sm font-medium text-slate-500 ml-1">{stat.unit}</span>}
        </p>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
      </div>
    </div>
  );
};
