
import React from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_PRO_USER } from '../../../services/mock/dashboard';
import { 
  MOCK_PRO_STATS, 
  MOCK_DAILY_USAGE,
  MOCK_DAILY_USAGE_30, 
  MOCK_PRO_INSIGHTS, 
  MOCK_PRO_TRANSACTIONS 
} from '../../../services/mock/billing_pro';
import { CreditOverviewCard } from './components/CreditOverviewCard';
import { UsageBreakdownList } from './components/UsageBreakdownList';
import { UsageTimelineChart } from './components/UsageTimelineChart';
import { CreditLogTable } from './components/CreditLogTable';
import { CreditInsightCard } from './components/CreditInsightCard';
import { Icons } from '../../../shared/components/Icons';

export const CreditUsageLogProPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [timeRange, setTimeRange] = React.useState<'7d' | '30d'>('7d');

  // Calculate aggregate stats for display
  const currentUsageData = timeRange === '7d' ? MOCK_DAILY_USAGE : MOCK_DAILY_USAGE_30;
  const totalSpent = currentUsageData.reduce((acc, curr) => acc + curr.amount, 0);
  const avgDaily = Math.round(totalSpent / currentUsageData.length);

  return (
    <DashboardLayout user={MOCK_PRO_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="credits-log">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Usage & Billing</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monitor your credit consumption and history.</p>
          </div>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-500 bg-slate-200 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/5 flex items-center gap-2">
            <Icons.Calendar className="w-3 h-3" /> Last {timeRange === '7d' ? '7' : '30'} Days
          </div>
        </div>

        {/* ROW 1: OVERVIEW & INSIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CreditOverviewCard 
              balance={MOCK_PRO_USER.credits} 
              spent7d={totalSpent} 
              avgDaily={avgDaily}
              onTopUp={() => onNavigate('credits')}
            />
          </div>
          <div className="lg:col-span-1">
            <CreditInsightCard 
              insight={MOCK_PRO_INSIGHTS[0]} 
              onAction={onNavigate}
            />
          </div>
        </div>

        {/* ROW 2: TIMELINE */}
        <UsageTimelineChart 
          data={currentUsageData} 
          activeRange={timeRange} 
          onRangeChange={setTimeRange} 
        />

        {/* ROW 3: BREAKDOWN & LOG */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
             <UsageBreakdownList stats={MOCK_PRO_STATS} />
          </div>
          <div className="lg:col-span-2">
             <CreditLogTable transactions={MOCK_PRO_TRANSACTIONS} />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
