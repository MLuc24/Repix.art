
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_PRO_USER } from '../../../services/mock/dashboard';
import { MOCK_PRO_UPLOAD_QUEUE, ProUploadItem } from '../../../services/mock/upload_pro';
import { UploadDropzone } from '../../../features/upload-sync/components/UploadUI'; // Reuse base dropzone
import { UploadQueueItemPro } from '../components/upload/UploadQueueItemPro';
import { UploadQueueHeaderPro } from '../components/upload/UploadQueueHeaderPro';
import { BatchPreviewPanel } from '../components/upload/BatchPreviewPanel';
import { AutoAlbumSuggestionBar } from '../components/upload/AutoAlbumSuggestionBar';
import { UploadControlsPro } from '../components/upload/UploadControlsPro';
import { SyncProDashboard } from './SyncProDashboard'; // Import Sync Content
import { Icons } from '../../../shared/components/Icons';

export const ProUpload = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [viewMode, setViewMode] = useState<'upload' | 'sync'>('upload');
  
  // Upload State
  const [queue, setQueue] = useState<ProUploadItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Computed
  const activeItem = queue.find(i => i.id === activeId) || null;
  const selectedCount = queue.filter(i => i.isSelected).length;
  const overallProgress = Math.floor(queue.reduce((acc, curr) => acc + curr.progress, 0) / (queue.length || 1));
  const isComplete = queue.length > 0 && queue.every(i => i.status === 'completed');

  // --- HANDLERS ---
  const handleDrop = () => {
    // Simulate drop
    setQueue(MOCK_PRO_UPLOAD_QUEUE);
    setActiveId(MOCK_PRO_UPLOAD_QUEUE[0].id);
  };

  const toggleSelect = (id: string) => {
    setQueue(prev => prev.map(i => i.id === id ? { ...i, isSelected: !i.isSelected } : i));
  };

  const toggleSelectAll = () => {
    const allSelected = queue.length > 0 && queue.every(i => i.isSelected);
    setQueue(prev => prev.map(i => ({ ...i, isSelected: !allSelected })));
  };

  const handleBulkAction = (action: string) => {
    if (action === 'delete') {
      const remaining = queue.filter(i => !i.isSelected);
      setQueue(remaining);
      if (remaining.length === 0) setActiveId(null);
      else if (activeItem?.isSelected) setActiveId(remaining[0].id);
    } else if (action === 'generate') {
      sessionStorage.setItem('gen_mode', 'image-to-image');
      onNavigate('generator');
    }
  };

  const handleItemAction = (id: string, action: string) => {
    if (action === 'delete') {
      const remaining = queue.filter(i => i.id !== id);
      setQueue(remaining);
      if (id === activeId) setActiveId(remaining[0]?.id || null);
    } else if (action === 'edit') {
      onNavigate('editor');
    }
  };

  const handleNav = (dir: 'next' | 'prev') => {
    if (!activeId) return;
    const idx = queue.findIndex(i => i.id === activeId);
    if (dir === 'next' && idx < queue.length - 1) setActiveId(queue[idx + 1].id);
    if (dir === 'prev' && idx > 0) setActiveId(queue[idx - 1].id);
  };

  return (
    <DashboardLayout user={MOCK_PRO_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="upload">
      
      {/* --- HEADER TABS --- */}
      <div className="flex items-center gap-1 bg-[#1a1b26] p-1 rounded-xl border border-white/5 mb-6 w-fit mx-auto md:mx-0">
        <button 
          onClick={() => setViewMode('upload')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'upload' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Icons.Upload className="w-3.5 h-3.5" /> Multi-Upload
        </button>
        <button 
          onClick={() => setViewMode('sync')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'sync' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Icons.Refresh className="w-3.5 h-3.5" /> Sync Sessions
        </button>
      </div>

      <div className="h-[calc(100vh-200px)] flex flex-col">
        
        {/* --- VIEW: FILE UPLOAD --- */}
        {viewMode === 'upload' && (
          <div className="flex-1 flex flex-col bg-white dark:bg-[#0e0f13] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl transition-colors">
            {queue.length === 0 ? (
              <div className="flex-1 p-8 flex flex-col items-center justify-center">
                 <div className="max-w-3xl w-full space-y-8">
                   <div className="text-center">
                     <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Multi-Upload Pro</h2>
                     <p className="text-slate-500">Drag & drop raw files, folders, or selection (up to 50 items).</p>
                   </div>
                   <UploadDropzone onFilesSelected={handleDrop} />
                 </div>
              </div>
            ) : (
              <>
                <div className="flex-1 flex overflow-hidden">
                  
                  {/* LEFT: QUEUE LIST */}
                  <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0e0f13]">
                    <UploadQueueHeaderPro 
                      count={queue.length}
                      selectedCount={selectedCount}
                      overallProgress={overallProgress}
                      onSelectAll={toggleSelectAll}
                      onBulkAction={handleBulkAction}
                    />
                    
                    {isComplete && <AutoAlbumSuggestionBar />}

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                       {queue.map(item => (
                         <UploadQueueItemPro 
                           key={item.id}
                           item={item}
                           isActive={item.id === activeId}
                           onSelect={() => toggleSelect(item.id)}
                           onClick={() => setActiveId(item.id)}
                           onAction={(action) => handleItemAction(item.id, action)}
                         />
                       ))}
                    </div>
                  </div>

                  {/* RIGHT: PREVIEW (Hidden on mobile) */}
                  <div className="w-[400px] hidden xl:block flex-none border-l border-slate-200 dark:border-white/5">
                     <BatchPreviewPanel 
                       item={activeItem} 
                       onNavigate={onNavigate}
                       onNext={() => handleNav('next')}
                       onPrev={() => handleNav('prev')}
                     />
                  </div>

                </div>

                {/* FOOTER CONTROLS */}
                <UploadControlsPro />
              </>
            )}
          </div>
        )}

        {/* --- VIEW: SYNC DASHBOARD --- */}
        {viewMode === 'sync' && (
          <div className="flex-1 overflow-hidden">
             <SyncProDashboard onNavigate={onNavigate} />
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
