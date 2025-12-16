
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { CreditInsight } from '../types';

export const CreditInsightCard: React.FC<{ insight: CreditInsight }> = ({ insight }) => {
  const getStyle = () => {
    switch(insight.type) {
      case 'warning': return { icon: <Icons.AlertTriangle className="w-5 h-5" />, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      case 'positive': return { icon: <Icons.Check className="w-5 h-5" />, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' };
      default: return { icon: <Icons.Zap className="w-5 h-5" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' };
    }
  };

  const style = getStyle();

  return (
    <div className={`p-5 rounded-2xl border flex items-start gap-4 ${style.bg} ${style.border}`}>
      <div className={`p-2 rounded-full shrink-0 bg-white/5 ${style.color}`}>
        {style.icon}
      </div>
      <div>
        <h4 className={`text-sm font-bold mb-1 ${style.color}`}>
          {insight.title}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed opacity-90">
          {insight.description}
        </p>
      </div>
    </div>
  );
};
