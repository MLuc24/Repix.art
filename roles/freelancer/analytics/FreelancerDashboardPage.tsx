
import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_FREELANCER_USER } from '../../../services/mock/dashboard';
import { MOCK_PROJECT_METRICS, MOCK_INSIGHTS } from '../../../services/mock/freelancer_analytics';
import { TimeRange, PerformanceStat } from './types';
import { TimeRangeFilter } from './TimeRangeFilter';
import { OverviewStatCard } from './OverviewStatCard';
import { InsightCard } from './InsightCard';
import { ProjectPerformanceTable } from './ProjectPerformanceTable';
import { Icons } from '../../../shared/components/Icons';

export const FreelancerDashboardPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Derived Stats (Mock calculation)
  const totalProjects = MOCK_PROJECT_METRICS.length;
  const avgTime = (MOCK_PROJECT_METRICS.reduce((acc, curr) => acc + curr.completionTime, 0) / totalProjects).toFixed(1);
  const avgRevisions = (MOCK_PROJECT_METRICS.reduce((acc, curr) => acc + curr.revisions, 0) / totalProjects).toFixed(1);
  const avgCredits = Math.round(MOCK_PROJECT_METRICS.reduce((acc, curr) => acc + curr.creditsUsed, 0) / totalProjects);

  const stats: PerformanceStat[] = [
    { label: 'Projects Done', value: 12, trend: '+4 vs last month', isPositiveTrend: true, iconType: 'check' }, // Hardcoded total for demo feel
    { label: 'Avg Time / Project', value: avgTime, unit: 'days', trend: '-0.2 days', isPositiveTrend: true, iconType: 'clock' },
    { label: 'Avg Revisions', value: avgRevisions, trend: '+0.5', isPositiveTrend: false, iconType: 'refresh' },
    { label: 'Avg Credits Cost', value: avgCredits, unit: 'cr', iconType: 'bolt' },
  ];

  return (
    <DashboardLayout user={MOCK_FREELANCER_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="analytics">
      <div className="max-w-7xl mx-auto py-8 animate-fade-in-up space-y-8 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Performance</h1>
            <p className="text-slate-400 text-sm">Analyze your efficiency and optimize your workflow.</p>
          </div>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <OverviewStatCard key={idx} stat={stat} />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Project Table */}
          <div className="lg:col-span-2">
             <ProjectPerformanceTable data={MOCK_PROJECT_METRICS} />
          </div>

          {/* Right: Insights & Tips */}
          <div className="space-y-6">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">AI Insights</h3>
             {MOCK_INSIGHTS.map((insight, idx) => (
               <InsightCard key={idx} insight={insight} />
             ))}

             {/* Upsell for Role 4 */}
             <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-cyan-500/20 text-center">
                <div className="w-12 h-12 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-3 border border-cyan-500/30">
                   <Icons.User className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold mb-2">Expanding your team?</h4>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Upgrade to Agency plan to track performance for multiple team members.
                </p>
                <button className="text-xs font-bold text-cyan-400 hover:text-white transition-colors">
                  View Team Plans &rarr;
                </button>
             </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
