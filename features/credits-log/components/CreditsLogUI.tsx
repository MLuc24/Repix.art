
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { CreditTransaction, TransactionCategory } from '../types';

// --- HELPERS ---

const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case 'credits_added': return <Icons.Wallet />;
    case 'avatar': return <Icons.User />;
    case 'export_hd': return <Icons.Download />;
    case 'template': return <Icons.Layout />;
    case 'background': return <Icons.Image />;
    case 'ai_tools': return <Icons.Sparkles />;
    default: return <Icons.Bolt />;
  }
};

const getCategoryColor = (category: TransactionCategory) => {
  switch (category) {
    case 'credits_added': return 'text-green-400 bg-green-500/10 border-green-500/20';
    case 'avatar': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    case 'export_hd': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'template': return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
    case 'background': return 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20';
    default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
  }
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// --- COMPONENTS ---

export const UsageSummaryCard = ({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) => (
  <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export const UsageFilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  onSearchChange 
}: { 
  activeFilter: string, 
  onFilterChange: (f: string) => void,
  onSearchChange: (s: string) => void
}) => {
  const filters = ['All', 'Purchases', 'Exports', 'Avatar', 'Tools'];
  
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
          <Icons.Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="Search usage history..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1b26] border border-white/10 text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mask-gradient-x">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium border transition-all
              ${activeFilter === f 
                ? 'bg-violet-600/20 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
};

export const TransactionCard = ({ transaction }: { transaction: CreditTransaction, key?: React.Key }) => {
  const isPositive = transaction.amount > 0;
  const colorClass = getCategoryColor(transaction.category);

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all animate-fade-in-up">
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorClass} group-hover:scale-105 transition-transform`}>
        {getCategoryIcon(transaction.category)}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h4 className="font-bold text-white text-sm truncate">{transaction.description}</h4>
          <span className={`font-mono text-sm font-bold ${isPositive ? 'text-green-400' : 'text-slate-200'}`}>
            {isPositive ? '+' : ''}{transaction.amount}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 text-xs text-slate-500">
             <span>{transaction.metadata}</span>
           </div>
           <span className="text-xs text-slate-600 font-medium">{formatTime(transaction.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export const DateGroupDivider = ({ dateLabel }: { dateLabel: string }) => (
  <div className="flex items-center gap-4 my-6">
    <span className="text-xs font-bold text-violet-400 uppercase tracking-widest whitespace-nowrap px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
      {dateLabel}
    </span>
    <div className="h-px flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
  </div>
);

export const EmptyLogState = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
       <Icons.FileText className="w-8 h-8 text-slate-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">No activity yet</h3>
    <p className="text-slate-400 max-w-xs mb-8">Start using AI tools or add credits to see your history here.</p>
    <div className="flex gap-4">
      <button 
        onClick={() => onNavigate('dashboard')}
        className="px-6 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-500"
      >
        Explore Tools
      </button>
    </div>
  </div>
);
