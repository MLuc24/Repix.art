
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';

interface MaskQuickActionsProps {
  onAction: (action: 'grow' | 'shrink' | 'smooth' | 'invert') => void;
}

export const MaskQuickActions = ({ onAction }: MaskQuickActionsProps) => {
  const actions = [
    { id: 'grow', label: 'Grow', icon: <Icons.ZoomIn className="w-4 h-4" /> },
    { id: 'shrink', label: 'Shrink', icon: <Icons.ZoomOut className="w-4 h-4" /> },
    { id: 'smooth', label: 'Smooth', icon: <Icons.Wand className="w-4 h-4" /> }, // Wand represents magic/smooth
    { id: 'invert', label: 'Invert', icon: <Icons.Refresh className="w-4 h-4" /> },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction(action.id as any)}
          className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
          title={action.label}
        >
          <div className="text-slate-400 group-hover:text-teal-400 transition-colors">
            {action.icon}
          </div>
          <span className="text-[9px] font-bold text-slate-500 uppercase">{action.label}</span>
        </button>
      ))}
    </div>
  );
};
