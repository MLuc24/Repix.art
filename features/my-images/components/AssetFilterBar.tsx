
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface AssetFilterBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hideSearch?: boolean;
}

export const AssetFilterBar = ({ activeTab, onTabChange, searchQuery, onSearchChange, hideSearch }: AssetFilterBarProps) => {
  const tabs = [
    { id: 'All', label: 'All Assets' },
    { id: 'upload', label: 'Uploads' },
    { id: 'generated', label: 'AI Generated' },
    { id: 'remix', label: 'Remixes' },
    { id: 'export', label: 'Exports' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
      {/* Search */}
      {!hideSearch && (
        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
            <Icons.Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search images..."
            className="
            w-full py-2.5 pl-10 pr-4 rounded-xl 
            bg-white dark:bg-[#1a1b26] 
            border border-slate-200 dark:border-white/10 
            text-sm text-slate-900 dark:text-white placeholder-slate-400 
            outline-none focus:border-violet-500 dark:focus:border-violet-500 
            focus:ring-1 focus:ring-violet-500/20 
            transition-all shadow-sm focus:shadow-md
          "
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto mask-gradient-x">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border
              ${activeTab === tab.id
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md'
                : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
