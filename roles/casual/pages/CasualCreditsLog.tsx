
import React, { useState, useMemo } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { MOCK_TRANSACTIONS, MOCK_SUMMARY_STATS } from '../../../services/mock/credits-log';
import { CreditTransaction } from '../../../features/credits-log/types';
import { 
  UsageSummaryCard, 
  UsageFilterBar, 
  TransactionCard, 
  DateGroupDivider,
  EmptyLogState
} from '../../../features/credits-log/components/CreditsLogUI';

// Helper to group by date
const groupTransactionsByDate = (transactions: CreditTransaction[]) => {
  const groups: { [key: string]: CreditTransaction[] } = {};
  
  transactions.forEach(tx => {
    const date = new Date(tx.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (date.toDateString() === today.toDateString()) {
      dateLabel = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateLabel = 'Yesterday';
    }

    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(tx);
  });

  return groups;
};

export const CasualCreditsLog = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredData = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(tx => {
      // 1. Category Filter
      let categoryMatch = true;
      if (activeFilter === 'Purchases') categoryMatch = tx.type === 'purchase' || tx.type === 'bonus';
      else if (activeFilter === 'Exports') categoryMatch = tx.category === 'export_hd';
      else if (activeFilter === 'Avatar') categoryMatch = tx.category === 'avatar';
      else if (activeFilter === 'Tools') categoryMatch = ['ai_tools', 'background', 'template'].includes(tx.category);

      // 2. Search Filter
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = 
        tx.description.toLowerCase().includes(searchLower) ||
        tx.metadata?.toLowerCase().includes(searchLower);

      return categoryMatch && searchMatch;
    });
  }, [activeFilter, searchQuery]);

  const groupedData = groupTransactionsByDate(filteredData);
  const dateKeys = Object.keys(groupedData); // Keys are already sorted implicitly if data is sorted, but robust sort handles better
  
  const hasData = filteredData.length > 0;

  return (
    <div className="min-h-screen bg-[#0e0f14] text-white selection:bg-violet-500/30 font-sans pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <button 
              onClick={() => onNavigate('credits')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 text-sm font-medium"
            >
              <Icons.ChevronLeft className="w-4 h-4" /> Back to Store
            </button>
            <h1 className="text-3xl font-bold text-white">Credit Usage Log</h1>
            <p className="text-slate-400">Track how your credits are used across tools.</p>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-800/50 border border-white/10 backdrop-blur-md">
             <div className="p-1.5 rounded-full bg-violet-500/20 text-violet-400">
                <Icons.Bolt className="w-5 h-5 animate-pulse" />
             </div>
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Current Balance</p>
               <p className="text-lg font-bold text-white leading-none">{MOCK_USER.credits} Credits</p>
             </div>
          </div>
        </div>

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <UsageSummaryCard 
            label="Spent this Month"
            value={`-${MOCK_SUMMARY_STATS.spentThisMonth}`}
            icon={<Icons.CreditCard className="w-5 h-5" />}
            color="bg-red-500/20 text-red-400"
          />
          <UsageSummaryCard 
             label="Added this Month"
             value={`+${MOCK_SUMMARY_STATS.addedThisMonth}`}
             icon={<Icons.Plus className="w-5 h-5" />}
             color="bg-green-500/20 text-green-400"
          />
          <UsageSummaryCard 
             label="Most Used"
             value={MOCK_SUMMARY_STATS.mostUsedCategory}
             icon={<Icons.Star className="w-5 h-5" />}
             color="bg-amber-500/20 text-amber-400"
          />
        </div>

        {/* --- FILTERS --- */}
        <UsageFilterBar 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchQuery}
        />

        {/* --- LOG LIST --- */}
        {!hasData ? (
          <EmptyLogState onNavigate={onNavigate} />
        ) : (
          <div className="space-y-2">
            {dateKeys.map((dateLabel) => (
              <div key={dateLabel}>
                <DateGroupDivider dateLabel={dateLabel} />
                <div className="space-y-3">
                  {groupedData[dateLabel].map((tx) => (
                    <TransactionCard key={tx.id} transaction={tx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* --- EXPORT ACTION --- */}
        {hasData && (
          <div className="mt-12 flex justify-center">
            <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-400 transition-colors">
              <Icons.Download className="w-4 h-4" /> Download Statement (CSV)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
