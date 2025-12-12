
import React from 'react';
import { TimeRange } from '../types';

interface CreditTimeFilterProps {
  value: TimeRange;
  onChange: (val: TimeRange) => void;
}

export const CreditTimeFilter = ({ value, onChange }: CreditTimeFilterProps) => {
  return (
    <div className="flex bg-[#1a1b26] p-1 rounded-xl border border-white/5 w-fit">
      {[
        { id: '7d', label: 'Last 7 Days' },
        { id: '30d', label: 'Last 30 Days' },
        { id: 'all', label: 'All Time' },
      ].map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id as TimeRange)}
          className={`
            px-4 py-2 rounded-lg text-xs font-bold transition-all
            ${value === opt.id 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/20' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
