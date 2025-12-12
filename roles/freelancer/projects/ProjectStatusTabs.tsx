
import React from 'react';

type ProjectStatus = 'All' | 'Draft' | 'In Review' | 'Approved' | 'Completed';

interface ProjectStatusTabsProps {
  activeTab: string;
  onChange: (status: ProjectStatus) => void;
  counts: Record<string, number>;
}

export const ProjectStatusTabs = ({ activeTab, onChange, counts }: ProjectStatusTabsProps) => {
  const tabs: ProjectStatus[] = ['All', 'Draft', 'In Review', 'Approved', 'Completed'];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mask-gradient-x">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const count = counts[tab] || 0;
        
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap
              ${isActive 
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                : 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10'
              }
            `}
          >
            {tab}
            {count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${isActive ? 'bg-cyan-500 text-black' : 'bg-white/10 text-slate-400'}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
