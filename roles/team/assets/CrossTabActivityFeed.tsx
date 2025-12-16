import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface Activity {
    id: string;
    type: 'shared' | 'saved' | 'uploaded' | 'moved';
    user: string;
    assetTitle: string;
    timestamp: string;
    from?: 'personal' | 'team';
    to?: 'personal' | 'team';
}

const MOCK_ACTIVITIES: Activity[] = [
    {
        id: '1',
        type: 'shared',
        user: 'You',
        assetTitle: 'My Draft Design',
        timestamp: '2 minutes ago',
        from: 'personal',
        to: 'team'
    },
    {
        id: '2',
        type: 'saved',
        user: 'You',
        assetTitle: 'Product Shot v2',
        timestamp: '15 minutes ago',
        from: 'team',
        to: 'personal'
    },
    {
        id: '3',
        type: 'shared',
        user: 'Sarah K.',
        assetTitle: 'Q3 Campaign Hero',
        timestamp: '1 hour ago',
        from: 'personal',
        to: 'team'
    }
];

export const CrossTabActivityFeed = () => {
    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'shared':
                return <Icons.User className="w-4 h-4 text-blue-500" />;
            case 'saved':
                return <Icons.Download className="w-4 h-4 text-violet-500" />;
            case 'uploaded':
                return <Icons.Upload className="w-4 h-4 text-green-500" />;
            case 'moved':
                return <Icons.ArrowRight className="w-4 h-4 text-orange-500" />;
        }
    };

    const getActivityText = (activity: Activity) => {
        switch (activity.type) {
            case 'shared':
                return `shared "${activity.assetTitle}" to team`;
            case 'saved':
                return `saved "${activity.assetTitle}" to personal library`;
            case 'uploaded':
                return `uploaded "${activity.assetTitle}"`;
            case 'moved':
                return `moved "${activity.assetTitle}"`;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Icons.Activity className="w-4 h-4 text-blue-500" />
                        Recent Activity
                    </h3>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                        View All
                    </button>
                </div>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {MOCK_ACTIVITIES.map(activity => (
                    <div key={activity.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-900 dark:text-white">
                                    <span className="font-medium">{activity.user}</span>{' '}
                                    <span className="text-slate-600 dark:text-slate-400">
                                        {getActivityText(activity)}
                                    </span>
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                                    {activity.timestamp}
                                </p>
                            </div>
                            {activity.from && activity.to && (
                                <div className="flex items-center gap-1 text-xs">
                                    <span className={`px-2 py-0.5 rounded ${activity.from === 'personal' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                                        {activity.from === 'personal' ? 'My' : 'Team'}
                                    </span>
                                    <Icons.ArrowRight className="w-3 h-3 text-slate-400" />
                                    <span className={`px-2 py-0.5 rounded ${activity.to === 'personal' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                                        {activity.to === 'personal' ? 'My' : 'Team'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
