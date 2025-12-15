
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { UsageSummary } from './types';

interface CreditUsageSummaryProps {
    summary: UsageSummary;
}

export const CreditUsageSummary = ({ summary }: CreditUsageSummaryProps) => {
    const stats = [
        {
            icon: Icons.Zap,
            label: 'Credits Used (30 days)',
            value: summary.totalCreditsUsed.toLocaleString(),
            color: 'from-violet-500 to-purple-500',
            bgColor: 'bg-violet-500/10'
        },
        {
            icon: Icons.TrendingUp,
            label: 'Avg Credits / Day',
            value: summary.avgCreditsPerDay.toString(),
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10'
        },
        {
            icon: Icons.Sparkles,
            label: 'Most Used Tool',
            value: summary.mostUsedTool,
            color: 'from-fuchsia-500 to-pink-500',
            bgColor: 'bg-fuchsia-500/10'
        },
        {
            icon: Icons.User,
            label: 'Top User',
            value: summary.topUser,
            subValue: `${summary.topUserCredits} credits`,
            color: 'from-emerald-500 to-teal-500',
            bgColor: 'bg-emerald-500/10'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} ${stat.bgColor} flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                        {stat.label}
                    </p>

                    <div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                            {stat.value}
                        </p>
                        {stat.subValue && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {stat.subValue}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
