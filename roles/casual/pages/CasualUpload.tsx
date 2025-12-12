
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { 
  UploadDropzone, 
  UploadQueueCard, 
  SmartAlbumCard 
} from '../../../features/upload-sync/components/UploadUI';
import { 
  ScannerCard, 
  SyncSessionCard, 
  FolderPickerModal, 
  SyncProgressView 
} from '../../../features/upload-sync/components/SyncLiteUI';
import { MOCK_SMART_ALBUMS, MOCK_SYNC_SESSIONS } from '../../../services/mock/upload-sync';
import { UploadItem } from '../../../features/upload-sync/types';

type ViewMode = 'upload' | 'sync';
type FlowState = 'idle' | 'processing' | 'completed';

export const CasualUpload = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user: any }) => {
  const [mode, setMode] = useState<ViewMode>('upload');
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [showFolderPicker, setShowFolderPicker] = useState(false);

  // ... (Logic remains same, just updating JSX classes) ...
  const handleFilesSelected = () => {
    const mockFiles: UploadItem[] = [
      { id: '1', name: 'IMG_2024_01.jpg', size: '2.4 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60', file: null },
      { id: '2', name: 'IMG_2024_02.jpg', size: '3.1 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=60', file: null },
    ];
    setUploadQueue(mockFiles);
    setTimeout(() => {
      setUploadQueue(prev => prev.map(i => ({ ...i, progress: 100, status: 'completed' })));
    }, 1500);
  };

  const finishUpload = () => {
    setFlowState('processing');
    setTimeout(() => setFlowState('completed'), 2000);
  };

  const startSync = () => setShowFolderPicker(true);
  const confirmSync = () => { setShowFolderPicker(false); setFlowState('processing'); };
  const handleCompletion = () => setFlowState('completed');
  const reset = () => { setFlowState('idle'); setUploadQueue([]); };

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="upload">
      
        {flowState !== 'completed' && (
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Import Media</h1>
              <p className="text-slate-500 dark:text-slate-400">Add photos to your workspace to start editing.</p>
            </div>

            <div className="p-1 rounded-xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 flex shadow-sm">
              <button 
                onClick={() => { setMode('upload'); reset(); }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'upload' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Multi-Upload
              </button>
              <button 
                onClick={() => { setMode('sync'); reset(); }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'sync' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Sync Lite
              </button>
            </div>
          </div>
        )}

        {/* Removed the hardcoded light-mode override wrapper div here */}
        <div>
          
          {flowState === 'idle' && (
            <div className="animate-fade-in-up">
              {mode === 'upload' ? (
                <div className="space-y-8">
                  {uploadQueue.length === 0 && <UploadDropzone onFilesSelected={handleFilesSelected} />}
                  
                  {uploadQueue.length > 0 && (
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h3 className="font-bold text-slate-800 dark:text-white">Queue ({uploadQueue.length})</h3>
                         <button onClick={reset} className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400">Clear All</button>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {uploadQueue.map(item => (
                            <UploadQueueCard key={item.id} item={item} />
                          ))}
                       </div>
                       <div className="pt-4 flex justify-end">
                         <NeonButton onClick={finishUpload} className="!w-auto px-10">Process</NeonButton>
                       </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-12">
                  <ScannerCard onScan={startSync} />
                  <div>
                     <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Recent Sessions</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MOCK_SYNC_SESSIONS.map(sess => (
                          <SyncSessionCard 
                            key={sess.id}
                            session={sess}
                          />
                        ))}
                     </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {flowState === 'processing' && (
            <SyncProgressView onComplete={handleCompletion} />
          )}

          {flowState === 'completed' && (
            <div className="animate-fade-in-up">
               <div className="text-center mb-12">
                 <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 mb-4 border border-green-200 dark:border-green-500/30">
                   <Icons.Check className="w-8 h-8" />
                 </div>
                 <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Import Complete!</h2>
                 <p className="text-slate-500 dark:text-slate-400 text-lg">
                   Our AI has automatically organized <span className="text-slate-900 dark:text-white font-bold">35 photos</span> into smart albums.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {MOCK_SMART_ALBUMS.map((album, idx) => (
                    <SmartAlbumCard key={album.id} album={album} index={idx} />
                  ))}
               </div>

               <div className="flex justify-center gap-4">
                  <NeonButton onClick={() => onNavigate('dashboard')} className="!w-auto px-8">Go to Dashboard</NeonButton>
                  <button onClick={reset} className="px-8 py-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:bg-white dark:hover:bg-white/5 hover:border-slate-300 hover:shadow-sm transition-all">Import More</button>
               </div>
            </div>
          )}
        
        </div>

      <FolderPickerModal 
        isOpen={showFolderPicker} 
        onClose={() => setShowFolderPicker(false)}
        onConfirm={confirmSync}
      />

    </DashboardLayout>
  );
};
