
import React, { useState } from 'react';
import { MOCK_SYNC_SESSIONS, MOCK_CONFLICTS, MOCK_SYNC_LOGS } from '../../../services/mock/sync';
import { SyncSessionCard } from '../components/sync/SyncSessionCard';
import { CreateSessionModal } from '../components/sync/CreateSessionModal';
import { ConflictResolveModal } from '../components/sync/ConflictResolveModal';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { SyncConflict } from '../../../features/sync/types';

interface SyncProDashboardProps {
  onNavigate?: (path: string) => void;
  onLogout?: () => void; // Optional if not used directly
}

export const SyncProDashboard = ({ onNavigate }: SyncProDashboardProps) => {
  const [sessions, setSessions] = useState(MOCK_SYNC_SESSIONS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [conflict, setConflict] = useState<SyncConflict | null>(MOCK_CONFLICTS[0]);

  // Handlers
  const handleSessionAction = (id: string, action: 'play' | 'pause' | 'retry' | 'settings') => {
    console.log(`Action ${action} on session ${id}`);
    if (action === 'pause' || action === 'play') {
      setSessions(prev => prev.map(s => s.id === id ? { ...s, status: action === 'play' ? 'syncing' : 'paused' } : s));
    }
  };

  const handleCreateSession = (data: any) => {
    // Add mock session
    console.log("Creating session", data);
  };

  const handleResolveConflict = (decision: 'local' | 'cloud' | 'both') => {
    console.log(`Resolved conflict with: ${decision}`);
    setConflict(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
        
        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 lg:p-8 bg-slate-50 dark:bg-[#0e0f13] transition-colors rounded-3xl lg:rounded-r-none border border-slate-200 dark:border-white/5 border-r-0">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sync Sessions</h1>
                 <p className="text-slate-500 text-sm">Manage your local-to-cloud asset pipelines.</p>
              </div>
              <NeonButton onClick={() => setShowCreateModal(true)} className="!w-auto px-6">
                 <div className="flex items-center gap-2">
                    <Icons.Plus className="w-4 h-4" /> New Session
                 </div>
              </NeonButton>
           </div>

           {/* Conflict Alert Banner */}
           {conflict && (
             <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between animate-fade-in-up">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-full bg-red-500/20 text-red-500 dark:text-red-400"><Icons.AlertTriangle className="w-5 h-5" /></div>
                   <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sync Paused: Conflict Detected</h4>
                      <p className="text-xs text-red-600 dark:text-red-300">User intervention required for "{conflict.filename}"</p>
                   </div>
                </div>
                <button 
                  onClick={() => {}} // Modal is controlled by state
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-lg shadow-red-900/20"
                >
                  Resolve Now
                </button>
             </div>
           )}

           {/* Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {sessions.map(sess => (
                <SyncSessionCard 
                  key={sess.id}
                  session={sess}
                  onAction={handleSessionAction}
                />
              ))}
              
              {/* Add New Placeholder */}
              <button 
                onClick={() => setShowCreateModal(true)}
                className="rounded-2xl border border-dashed border-slate-300 dark:border-white/10 hover:border-violet-500/50 hover:bg-slate-100 dark:hover:bg-white/5 flex flex-col items-center justify-center gap-4 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all min-h-[200px]"
              >
                 <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center">
                    <Icons.Plus className="w-6 h-6" />
                 </div>
                 <span className="text-sm font-bold">Add Local Folder</span>
              </button>
           </div>
        </div>

        {/* SIDEBAR (Logs & Tools) */}
        <div className="w-full lg:w-80 border-l border-slate-200 dark:border-white/5 bg-white dark:bg-[#131418] p-6 transition-colors rounded-3xl lg:rounded-l-none border-y border-r">
           
           {/* Mobile Sync Hint */}
           <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 dark:from-violet-900/20 dark:to-indigo-900/20 border border-violet-500/20 mb-8">
              <div className="flex items-center gap-3 mb-3">
                 <div className="p-2 rounded-lg bg-violet-600 text-white shadow-lg"><Icons.Zap className="w-4 h-4" /></div>
                 <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mobile Sync</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                 Open Repix on your phone to instantly transfer photos to your workspace without cables.
              </p>
              <button className="w-full py-2 bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 rounded-lg text-xs font-bold text-violet-700 dark:text-white border border-violet-200 dark:border-white/5 transition-colors">
                 Send Link to Phone
              </button>
           </div>

           {/* Activity Log */}
           <div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-slate-900 dark:text-white">Activity Log</h3>
                 <button className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white">Clear</button>
              </div>
              <div className="space-y-4">
                 {MOCK_SYNC_LOGS.map(log => (
                   <div key={log.id} className="flex gap-3 text-xs">
                      <span className="text-slate-500 dark:text-slate-600 font-mono flex-none w-12">{log.timestamp}</span>
                      <div>
                         <p className={`font-medium ${log.type === 'error' ? 'text-red-500 dark:text-red-400' : log.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-slate-700 dark:text-slate-300'}`}>
                           {log.message}
                         </p>
                         <p className="text-slate-400 dark:text-slate-600 text-[10px] mt-0.5 uppercase tracking-wide">{log.sessionId}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>

      {/* MODALS */}
      <CreateSessionModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateSession}
      />

      <ConflictResolveModal 
        isOpen={!!conflict} // In real app, toggle this
        conflict={conflict}
        onResolve={handleResolveConflict}
      />

    </div>
  );
};
