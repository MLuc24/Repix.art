
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';

interface BatchActionBarProps {
  count: number;
  onClear: () => void;
  onAction: (action: string) => void;
}

export const BatchActionBar = ({ count, onClear, onAction }: BatchActionBarProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1b26] border border-white/10 shadow-2xl rounded-2xl p-2 flex items-center gap-4 z-50 animate-fade-in-up">
       <div className="flex items-center gap-3 pl-4 border-r border-white/10 pr-4">
          <span className="text-sm font-bold text-white whitespace-nowrap">{count} Selected</span>
          <button onClick={onClear} className="text-xs text-slate-400 hover:text-white underline">Clear</button>
       </div>

       <div className="flex items-center gap-1 pr-1">
          <button onClick={() => onAction('edit')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-violet-400 transition-colors w-16">
             <Icons.Sliders className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase">Edit</span>
          </button>
          <button onClick={() => onAction('folder')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-colors w-16">
             <Icons.ArrowRight className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase">Move</span>
          </button>
          <button onClick={() => onAction('download')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-green-400 transition-colors w-16">
             <Icons.Download className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase">Save</span>
          </button>
          <button onClick={() => onAction('delete')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-red-400 transition-colors w-16">
             <Icons.Trash className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase">Delete</span>
          </button>
       </div>
    </div>
  );
};
