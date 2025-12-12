
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { SyncSession } from '../../../../features/sync/types';

interface SyncSessionCardProps {
  session: SyncSession;
  onAction: (id: string, action: 'play' | 'pause' | 'retry' | 'settings') => void;
  key?: React.Key;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'syncing': return 'text-blue-500 dark:text-blue-400 border-blue-500/30 bg-blue-500/10';
    case 'completed': return 'text-green-500 dark:text-green-400 border-green-500/30 bg-green-500/10';
    case 'error': return 'text-red-500 dark:text-red-400 border-red-500/30 bg-red-500/10';
    default: return 'text-slate-500 dark:text-slate-400 border-slate-500/30 bg-slate-500/10';
  }
};

export const SyncSessionCard = ({ session, onAction }: SyncSessionCardProps) => {
  const progress = Math.round((session.stats.syncedFiles / session.stats.totalFiles) * 100);
  const statusColor = getStatusColor(session.status);

  return (
    <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-violet-500/30 transition-all group shadow-sm dark:shadow-none">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-300">
            <Icons.Image className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5 flex items-center gap-2">
              {session.name}
              {session.isPriority && <Icons.Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />}
            </h3>
            <p className="text-[10px] text-slate-500 font-mono truncate max-w-[150px]">{session.sourcePath}</p>
          </div>
        </div>
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusColor}`}>
          {session.status}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1.5">
          <span>{session.stats.syncedFiles} / {session.stats.totalFiles} items</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${session.status === 'error' ? 'bg-red-500' : session.status === 'paused' ? 'bg-slate-400' : 'bg-blue-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3 mt-3">
        <span className="text-[10px] text-slate-500 flex items-center gap-1">
          <Icons.Refresh className="w-3 h-3" /> {session.stats.lastSyncedAt}
        </span>

        <div className="flex gap-1">
          {session.status === 'syncing' ? (
            <button onClick={() => onAction(session.id, 'pause')} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" title="Pause">
              <div className="w-3 h-3 border-l-2 border-r-2 border-current" />
            </button>
          ) : (
            <button onClick={() => onAction(session.id, 'play')} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" title="Resume">
              <Icons.ArrowRight className="w-3 h-3" />
            </button>
          )}
          
          {session.status === 'error' && (
            <button onClick={() => onAction(session.id, 'retry')} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300" title="Retry Failed">
              <Icons.Refresh className="w-3 h-3" />
            </button>
          )}

          <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-1" />
          
          <button onClick={() => onAction(session.id, 'settings')} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" title="Settings">
            <Icons.Settings className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
