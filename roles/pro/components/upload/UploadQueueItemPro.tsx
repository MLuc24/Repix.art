
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { ProUploadItem } from '../../../../services/mock/upload_pro';

interface UploadQueueItemProProps {
  item: ProUploadItem;
  isActive: boolean;
  onSelect: () => void;
  onClick: () => void;
  onAction: (action: string) => void;
  key?: React.Key;
}

export const UploadQueueItemPro = ({ item, isActive, onSelect, onClick, onAction }: UploadQueueItemProProps) => {
  return (
    <div 
      className={`
        group flex items-center gap-3 p-2 rounded-lg border transition-all cursor-pointer relative
        ${isActive 
          ? 'bg-violet-50 dark:bg-violet-500/10 border-violet-500 dark:border-violet-500/50' 
          : 'bg-white dark:bg-[#1a1b26] border-slate-200 dark:border-white/5 hover:border-violet-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-[#1f202e]'
        }
      `}
      onClick={onClick}
    >
      {/* Checkbox */}
      <div className="flex items-center justify-center w-8 h-full" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.isSelected ? 'bg-violet-600 border-violet-600' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'}`}>
          {item.isSelected && <Icons.Check className="w-3 h-3 text-white" />}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative w-12 h-12 rounded overflow-hidden bg-slate-100 dark:bg-black flex-none border border-slate-200 dark:border-white/10">
        <img src={item.previewUrl} className="w-full h-full object-cover" alt="" />
        {item.status === 'uploading' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Icons.Refresh className="w-4 h-4 text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex justify-between items-center">
          <span className={`text-xs font-bold truncate ${isActive ? 'text-violet-700 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{item.name}</span>
          <span className="text-[10px] text-slate-500 font-mono">{item.status === 'completed' ? 'Done' : `${item.progress}%`}</span>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span>{item.type}</span>
          <span>•</span>
          <span>{item.dimensions}</span>
          <span>•</span>
          <span>{item.size}</span>
          {item.tags.length > 0 && (
            <span className="px-1.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300">{item.tags[0]}</span>
          )}
        </div>

        {/* Progress Line */}
        <div className="h-0.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mt-1">
          <div 
            className={`h-full transition-all duration-300 ${item.status === 'completed' ? 'bg-green-500' : 'bg-violet-500'}`} 
            style={{ width: `${item.progress}%` }}
          />
        </div>
      </div>

      {/* Inline Actions (Hover) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 bg-white dark:bg-[#1a1b26] pl-2 shadow-[-10px_0_10px_#fff] dark:shadow-[-10px_0_10px_#1a1b26]">
        <button 
          onClick={(e) => { e.stopPropagation(); onAction('edit'); }}
          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          title="Edit"
        >
          <Icons.Sliders className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onAction('delete'); }}
          className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-500/20 text-slate-400 hover:text-red-500 dark:hover:text-red-400"
          title="Remove"
        >
          <Icons.Trash className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
