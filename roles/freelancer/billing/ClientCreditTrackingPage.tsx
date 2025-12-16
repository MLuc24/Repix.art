
import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_FREELANCER_USER } from '../../../services/mock/dashboard';
import { MOCK_CLIENT_CREDITS, MOCK_CREDIT_INSIGHTS } from '../../../services/mock/freelancer_billing';
import { TimeRange } from './types';
import { ClientCreditTable } from './components/ClientCreditTable';
import { CreditTimeFilter } from './components/CreditTimeFilter';
import { CreditInsightCard } from './components/CreditInsightCard';
import { ExportCreditReport } from './components/ExportCreditReport';
import { Icons } from '../../../shared/components/Icons';

export const ClientCreditTrackingPage = ({ onLogout, onNavigate, user = MOCK_FREELANCER_USER }: { onLogout: () => void, onNavigate: (path: string) => void, user?: any }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Filter logic could go here based on timeRange
  const sortedData = [...MOCK_CLIENT_CREDITS].sort((a, b) => b.totalCredits - a.totalCredits);

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="freelancer-billing">
      <div className="max-w-7xl mx-auto py-8 space-y-8 min-h-[calc(100vh-140px)] animate-fade-in-up">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Credit Tracking</h1>
            <p className="text-slate-400 text-sm">Monitor credit usage by client to maintain profitability.</p>
          </div>
          <div className="flex items-center gap-4">
             <CreditTimeFilter value={timeRange} onChange={setTimeRange} />
             <ExportCreditReport />
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {MOCK_CREDIT_INSIGHTS.map(insight => (
             <CreditInsightCard key={insight.id} insight={insight} />
           ))}
        </div>

        {/* Main Table */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Icons.Briefcase className="w-4 h-4" /> Usage By Client
              </h3>
              <span className="text-xs text-slate-500">Sorted by consumption</span>
           </div>
           
           <ClientCreditTable data={sortedData} />
        </div>

        {/* Footer Note */}
        <div className="text-center pt-8 border-t border-white/5">
           <p className="text-xs text-slate-600 max-w-md mx-auto">
             Note: This data is for your internal tracking only. Clients do not see these figures unless you export and share the report.
           </p>
        </div>

      </div>
    </DashboardLayout>
  );
};
