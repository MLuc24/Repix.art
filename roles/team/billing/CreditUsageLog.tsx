
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { CreditTransaction, ACTION_LABELS } from './types';

interface CreditUsageLogProps {
    transactions: CreditTransaction[];
}

export const CreditUsageLog = ({ transactions }: CreditUsageLogProps) => {
    const [filter, setFilter] = useState<'all' | CreditTransaction['action']>('all');

    const filteredTransactions = filter === 'all'
        ? transactions
        : transactions.filter(t => t.action === filter);

    const filters = [
        { value: 'all' as const, label: 'All Actions' },
        { value: 'generate' as const, label: 'Generate' },
        { value: 'remix' as const, label: 'Remix' },
        { value: 'export-hd' as const, label: 'Export HD' }
    ];

    const getActionIcon = (action: CreditTransaction['action']) => {
        const iconName = ACTION_LABELS[action]?.icon || 'Sparkles';
        const IconComponent = Icons[iconName as keyof typeof Icons];
        return IconComponent ? <IconComponent className="w-4 h-4" /> : <Icons.Sparkles className="w-4 h-4" />;
    };

    return (
        <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Credit Usage Log</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Recent credit transactions
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {filters.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`
                  px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all
                  ${filter === f.value
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }
                `}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Log Entries */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-96 overflow-y-auto">
                {filteredTransactions.map((tx) => {
                    const actionInfo = ACTION_LABELS[tx.action];

                    return (
                        <div key={tx.id} className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-start gap-4">
                                {/* User */}
                                <img
                                    src={tx.userAvatar}
                                    alt={tx.userName}
                                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-1">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                {tx.userName}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r ${actionInfo.color} text-white text-xs font-bold`}>
                                                    {getActionIcon(tx.action)}
                                                    {actionInfo.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Credits */}
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm font-black text-red-600 dark:text-red-400">
                                                -{tx.credits}
                                            </p>
                                            <p className="text-xs text-slate-500">credits</p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    {tx.details && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            {tx.details}
                                        </p>
                                    )}

                                    {/* Time */}
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                        {new Date(tx.timestamp).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
