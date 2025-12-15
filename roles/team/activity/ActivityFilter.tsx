/**
 * ActivityFilter Component (R4.3)
 * 
 * Simple dropdown filter for activity types:
 * - All
 * - Edits
 * - Generates
 * - Approvals
 * - Exports
 */

import React from 'react';
import { Icons } from '../../../shared/components/Icons';

export type ActivityFilterType = 'all' | 'edits' | 'generates' | 'approvals' | 'exports';

interface ActivityFilterProps {
    value: ActivityFilterType;
    onChange: (filter: ActivityFilterType) => void;
}

const FILTER_OPTIONS: { value: ActivityFilterType; label: string }[] = [
    { value: 'all', label: 'All Activities' },
    { value: 'edits', label: 'Edits' },
    { value: 'generates', label: 'Generates' },
    { value: 'approvals', label: 'Approvals' },
    { value: 'exports', label: 'Exports' },
];

export const ActivityFilter: React.FC<ActivityFilterProps> = ({ value, onChange }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as ActivityFilterType)}
                className="
          appearance-none w-full md:w-48 px-4 py-2.5 pr-10
          bg-[#1a1b26] border border-white/10 rounded-xl
          text-sm text-white font-medium
          focus:border-cyan-500 focus:outline-none
          cursor-pointer transition-colors
        "
            >
                {FILTER_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icons.ChevronLeft className="w-4 h-4 text-slate-400 -rotate-90" />
            </div>
        </div>
    );
};

/**
 * Helper function to determine activity type from action text
 */
export const getActivityType = (action: string): ActivityFilterType => {
    const actionLower = action.toLowerCase();

    if (actionLower.includes('edit')) return 'edits';
    if (actionLower.includes('generat')) return 'generates';
    if (actionLower.includes('approv')) return 'approvals';
    if (actionLower.includes('export')) return 'exports';

    return 'all';
};
