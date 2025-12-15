
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
type UploadSource = 'local' | 'drive' | 'link' | 'cloud';

export const CasualUpload = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user: any }) => {
  const [mode, setMode] = useState<ViewMode>('upload');
  const [activeSource, setActiveSource] = useState<UploadSource>('local');
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [showFolderPicker, setShowFolderPicker] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // ... (Logic remains same, just updating JSX classes) ...
  const handleFilesSelected = () => {
    const mockFiles: UploadItem[] = [
      { id: '1', name: 'IMG_2024_01.jpg', size: '2.4 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60', file: null },
      { id: '2', name: 'IMG_2024_02.jpg', size: '3.1 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=60', file: null },
    ];
    setUploadQueue(prev => [...prev, ...mockFiles]);
    setTimeout(() => {
      setUploadQueue(prev => prev.map(i => i.status === 'uploading' ? { ...i, progress: 100, status: 'completed' } : i));
    }, 1500);
  };

  const handleUrlAdd = () => {
    if (!urlInput) return;
    const newItem: UploadItem = {
        id: Date.now().toString(),
        name: 'Image from URL',
        size: 'Unknown',
        status: 'uploading',
        progress: 0,
        previewUrl: urlInput,
        file: null
    };
    setUploadQueue(prev => [...prev, newItem]);
    setUrlInput('');
    setTimeout(() => {
        setUploadQueue(prev => prev.map(i => i.id === newItem.id ? { ...i, progress: 100, status: 'completed' } : i));
    }, 1000);
  };

  const handleDriveSelect = () => {
    const mockDriveFiles: UploadItem[] = [
        { id: `d1_${Date.now()}`, name: 'Drive_Photo_01.jpg', size: '1.2 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=100&q=60', file: null },
        { id: `d2_${Date.now()}`, name: 'Drive_Photo_02.jpg', size: '2.5 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1682685797828-d3b2531de62e?auto=format&fit=crop&w=100&q=60', file: null },
    ];
    setUploadQueue(prev => [...prev, ...mockDriveFiles]);
    setTimeout(() => {
       setUploadQueue(prev => prev.map(i => i.status === 'uploading' ? { ...i, progress: 100, status: 'completed' } : i));
    }, 1500);
  };

  const handleCloudSelect = () => {
    const mockCloudFiles: UploadItem[] = [
        { id: `c1_${Date.now()}`, name: 'Cloud_Backup_01.jpg', size: '4.2 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=100&q=60', file: null },
        { id: `c2_${Date.now()}`, name: 'Cloud_Backup_02.jpg', size: '1.8 MB', status: 'uploading', progress: 0, previewUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=60', file: null },
    ];
    setUploadQueue(prev => [...prev, ...mockCloudFiles]);
    setTimeout(() => {
       setUploadQueue(prev => prev.map(i => i.status === 'uploading' ? { ...i, progress: 100, status: 'completed' } : i));
    }, 1500);
  };

  const finishUpload = () => {
    setFlowState('processing');
    setTimeout(() => setFlowState('completed'), 2000);
  };

  const startSync = () => setShowFolderPicker(true);
  const confirmSync = () => { setShowFolderPicker(false); setFlowState('processing'); };
  const handleCompletion = () => setFlowState('completed');
  const reset = () => { setFlowState('idle'); setUploadQueue([]); setUrlInput(''); };

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
                  {/* Source Selector */}
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveSource('local')}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all min-w-[160px] ${activeSource === 'local' ? 'bg-violet-50 border-violet-500 text-violet-700 dark:bg-violet-900/20 dark:border-violet-400 dark:text-violet-300 shadow-sm' : 'border-slate-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-500/50 bg-white dark:bg-[#1a1b26] text-slate-600 dark:text-slate-400'}`}
                    >
                      <div className={`p-2 rounded-lg ${activeSource === 'local' ? 'bg-violet-200 dark:bg-violet-800' : 'bg-slate-100 dark:bg-white/5'}`}>
                         <Icons.Smartphone className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">Local Device</div>
                        <div className="text-[10px] opacity-70">JPG, PNG, RAW</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveSource('drive')}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all min-w-[160px] ${activeSource === 'drive' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-300 shadow-sm' : 'border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 bg-white dark:bg-[#1a1b26] text-slate-600 dark:text-slate-400'}`}
                    >
                      <div className={`p-2 rounded-lg ${activeSource === 'drive' ? 'bg-blue-200 dark:bg-blue-800' : 'bg-slate-100 dark:bg-white/5'}`}>
                         <Icons.Google className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">Google Drive</div>
                        <div className="text-[10px] opacity-70">Connect Account</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveSource('link')}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all min-w-[160px] ${activeSource === 'link' ? 'bg-pink-50 border-pink-500 text-pink-700 dark:bg-pink-900/20 dark:border-pink-400 dark:text-pink-300 shadow-sm' : 'border-slate-200 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-500/50 bg-white dark:bg-[#1a1b26] text-slate-600 dark:text-slate-400'}`}
                    >
                      <div className={`p-2 rounded-lg ${activeSource === 'link' ? 'bg-pink-200 dark:bg-pink-800' : 'bg-slate-100 dark:bg-white/5'}`}>
                         <Icons.Link className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">Image URL</div>
                        <div className="text-[10px] opacity-70">Paste Link</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveSource('cloud')}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all min-w-[160px] ${activeSource === 'cloud' ? 'bg-cyan-50 border-cyan-500 text-cyan-700 dark:bg-cyan-900/20 dark:border-cyan-400 dark:text-cyan-300 shadow-sm' : 'border-slate-200 dark:border-white/10 hover:border-cyan-300 dark:hover:border-cyan-500/50 bg-white dark:bg-[#1a1b26] text-slate-600 dark:text-slate-400'}`}
                    >
                      <div className={`p-2 rounded-lg ${activeSource === 'cloud' ? 'bg-cyan-200 dark:bg-cyan-800' : 'bg-slate-100 dark:bg-white/5'}`}>
                         <Icons.Cloud className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">Cloud Storage</div>
                        <div className="text-[10px] opacity-70">Dropbox, OneDrive</div>
                      </div>
                    </button>
                  </div>

                  {activeSource === 'local' && uploadQueue.length === 0 && (
                    <UploadDropzone onFilesSelected={handleFilesSelected} />
                  )}

                  {activeSource === 'drive' && uploadQueue.length === 0 && (
                    <div className="border-2 border-dashed border-blue-200 dark:border-blue-500/30 rounded-3xl p-10 text-center bg-blue-50/50 dark:bg-blue-900/10">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Icons.Google className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Connect Google Drive</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                           Access your photos directly from Google Drive.
                        </p>
                        <NeonButton onClick={handleDriveSelect} className="!w-auto px-8 bg-blue-600 hover:bg-blue-700 shadow-blue-500/20">
                           Connect & Select
                        </NeonButton>
                    </div>
                  )}

                  {activeSource === 'link' && uploadQueue.length === 0 && (
                     <div className="border-2 border-dashed border-pink-200 dark:border-pink-500/30 rounded-3xl p-10 text-center bg-pink-50/50 dark:bg-pink-900/10">
                        <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Icons.Link className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Import via URL</h3>
                        <div className="max-w-md mx-auto flex gap-3">
                           <input 
                              type="text" 
                              value={urlInput}
                              onChange={(e) => setUrlInput(e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1b26] focus:outline-none focus:ring-2 focus:ring-pink-500"
                           />
                           <NeonButton onClick={handleUrlAdd} className="!w-auto px-6 bg-pink-600 hover:bg-pink-700 shadow-pink-500/20">
                              Import
                           </NeonButton>
                        </div>
                     </div>
                  )}

                  {activeSource === 'cloud' && uploadQueue.length === 0 && (
                     <div className="border-2 border-dashed border-cyan-200 dark:border-cyan-500/30 rounded-3xl p-10 text-center bg-cyan-50/50 dark:bg-cyan-900/10">
                        <div className="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Icons.Cloud className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">My Cloud Storage</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                           Connect Dropbox, OneDrive or Box to import photos.
                        </p>
                        <div className="flex justify-center gap-4">
                            <NeonButton onClick={handleCloudSelect} className="!w-auto px-6 bg-[#0061FE] hover:bg-[#0061FE]/90 shadow-blue-500/20">
                                Dropbox
                            </NeonButton>
                            <NeonButton onClick={handleCloudSelect} className="!w-auto px-6 bg-[#0078D4] hover:bg-[#0078D4]/90 shadow-blue-500/20">
                                OneDrive
                            </NeonButton>
                        </div>
                     </div>
                  )}
                  
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
