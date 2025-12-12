
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { HistoryStep } from '../types';

// --- TYPES ---
interface HistoryProProps {
  steps: HistoryStep[];
  currentIndex: number;
  onJump: (index: number) => void; // Preview
  onCommit: (index: number) => void; // Revert
  onSnapshot: (index: number) => void;
}

// --- ICONS MAPPER ---
const getActionIcon = (action: string) => {
  switch(action) {
    case 'upload': return <Icons.Upload className="w-3 h-3" />;
    case 'filter': return <Icons.Wand className="w-3 h-3" />;
    case 'adjust': return <Icons.Sliders className="w-3 h-3" />;
    case 'crop': return <Icons.Layout className="w-3 h-3" />;
    case 'mask': return <Icons.Scissors className="w-3 h-3" />;
    default: return <Icons.Zap className="w-3 h-3" />;
  }
};

// --- COMPONENT: PRO HISTORY PANEL (Vertical for Right Sidebar) ---
export const ProHistoryPanel = ({ steps, currentIndex, onJump, onCommit, onSnapshot }: HistoryProProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to active item
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.children[currentIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-none">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Refresh className="text-slate-400" /> Edit History
        </h3>
        <button 
          onClick={() => onSnapshot(currentIndex)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-300 hover:text-white transition-colors border border-white/5"
        >
          <Icons.Star className="w-3 h-3" /> Snapshot
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1 flex-none">
        <span>Total Steps: {steps.length}</span>
        <span>Current: {currentIndex + 1}</span>
      </div>

      {/* Vertical Timeline List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2" ref={scrollRef}>
        <div className="space-y-1 relative">
          
          {/* Connecting Line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/5 -z-10" />

          {steps.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isPast = idx <= currentIndex;

            return (
              <div 
                key={step.id}
                className={`group flex items-start gap-3 p-2 rounded-xl transition-all cursor-pointer ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}
                onClick={() => onCommit(idx)}
                onMouseEnter={() => onJump(idx)} // Optional: Preview on hover
              >
                {/* Icon / Dot */}
                <div className={`
                  relative z-10 flex-none w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                  ${isActive 
                    ? 'bg-violet-600 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                    : isPast 
                      ? 'bg-[#0e0f13] border-violet-500/30 text-violet-400' 
                      : 'bg-[#0e0f13] border-white/10 text-slate-600'
                  }
                `}>
                  {getActionIcon(step.action)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={`text-xs font-bold ${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono">{step.timestamp}</span>
                  </div>
                  <p className={`text-[10px] truncate ${isActive ? 'text-violet-300' : 'text-slate-500'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- LEGACY HORIZONTAL BAR (Optional - kept if needed for other layouts, but renamed/hidden) ---
export const HistoryBarPro = ({ steps, currentIndex, onJump, onCommit, onSnapshot }: HistoryProProps) => {
  // ... (Keep existing implementation if you want to preserve it, otherwise it can be removed)
  return null; 
};
