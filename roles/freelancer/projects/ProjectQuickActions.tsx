
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface ProjectQuickActionsProps {
  onAction: (action: string) => void;
}

export const ProjectQuickActions = ({ onAction }: ProjectQuickActionsProps) => {
  const actions = [
    { id: 'upload', label: 'Upload', icon: <Icons.Upload className="w-4 h-4" />, color: 'text-blue-400' },
    { id: 'generate', label: 'Generate', icon: <Icons.Wand className="w-4 h-4" />, color: 'text-violet-400' },
    { id: 'remix', label: 'Remix', icon: <Icons.Sparkles className="w-4 h-4" />, color: 'text-fuchsia-400' },
    { id: 'batch', label: 'Batch Edit', icon: <Icons.Layout className="w-4 h-4" />, color: 'text-cyan-400' },
  ];

  return (
    <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
      {actions.map((act) => (
        <button
          key={act.id}
          onClick={() => onAction(act.id)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group whitespace-nowrap"
        >
          <div className={`${act.color} group-hover:scale-110 transition-transform`}>
            {act.icon}
          </div>
          <span className="text-xs font-bold text-slate-300 group-hover:text-white">{act.label}</span>
        </button>
      ))}
      
      <div className="w-px h-6 bg-white/10 mx-2" />
      
      <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Grid View">
        <Icons.Grid className="w-4 h-4" />
      </button>
    </div>
  );
};
