
import React from 'react';
import { PRO_HISTORY_STEPS } from '../../../services/mock/editor_pro';

export const HistoryProLiteBar = ({ activeStep, onJump }: { activeStep: number, onJump: (i: number) => void }) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl w-full px-4 z-30">
      <div className="bg-[#0e0f13]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
        <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">History</span>
        </div>
        
        <div className="h-8 w-px bg-white/10" />

        <div className="flex-1 overflow-x-auto no-scrollbar flex gap-1 items-center mask-gradient-x px-2">
           {PRO_HISTORY_STEPS.map((step, idx) => {
             const isActive = idx === activeStep;
             const isFuture = idx > activeStep;
             
             return (
               <button 
                 key={step.id}
                 onClick={() => onJump(idx)}
                 className={`
                   group relative w-10 h-10 rounded-lg overflow-hidden flex-none border transition-all duration-200
                   ${isActive 
                     ? 'border-violet-500 scale-110 z-10 shadow-[0_0_10px_rgba(139,92,246,0.5)]' 
                     : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                   }
                   ${isFuture ? 'grayscale opacity-30' : ''}
                 `}
                 title={step.label}
               >
                 <img src={step.thumbnail} className="w-full h-full object-cover" />
                 {isActive && <div className="absolute inset-0 bg-violet-500/20" />}
               </button>
             );
           })}
        </div>
        
        <div className="text-[10px] font-mono text-slate-500 px-2">
          {activeStep + 1}/{PRO_HISTORY_STEPS.length}
        </div>
      </div>
    </div>
  );
};
