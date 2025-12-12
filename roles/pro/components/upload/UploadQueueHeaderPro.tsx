
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';

interface UploadQueueHeaderProProps {
  count: number;
  selectedCount: number;
  overallProgress: number;
  onSelectAll: () => void;
  onBulkAction: (action: string) => void;
}

export const UploadQueueHeaderPro = ({ count, selectedCount, overallProgress, onSelectAll, onBulkAction }: UploadQueueHeaderProProps) => {
  return (
    <div className="bg-white dark:bg-[#0e0f13] border-b border-slate-200 dark:border-white/5 p-4 sticky top-0 z-10 transition-colors">
      
      {/* Top Stats */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Upload Queue <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] text-slate-500 dark:text-slate-400">{count}</span>
        </h2>
        <div className="flex items-center gap-2">
           <span className="text-[10px] text-slate-500 font-mono">{overallProgress}% Total</span>
           <div className="w-24 h-1 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${overallProgress}%` }} />
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button 
            onClick={onSelectAll}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white"
            title="Select All"
          >
            <Icons.Check className="w-4 h-4" />
          </button>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-white/5 mx-1" />

          <button 
            disabled={selectedCount === 0}
            onClick={() => onBulkAction('delete')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 border border-slate-100 dark:border-white/5 hover:border-red-200 dark:hover:border-red-500/20 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 text-xs font-medium transition-all disabled:opacity-30"
          >
            <Icons.Trash className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>

          <button 
            disabled={selectedCount === 0}
            onClick={() => onBulkAction('tag')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-all disabled:opacity-30"
          >
            <Icons.Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tag</span>
          </button>
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2 animate-fade-in-up">
             <span className="text-[10px] text-slate-500 uppercase font-bold hidden md:inline">{selectedCount} Selected</span>
             <button 
               onClick={() => onBulkAction('generate')}
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-900/20"
             >
               <Icons.Sparkles className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">Batch Remix</span>
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
