import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { MOCK_ASSETS, MOCK_FOLDERS } from '../../../services/mock/my_images';
import { AssetItem } from '../../../features/my-images/types';
import { AssetCard } from '../../../features/my-images/components/AssetCard';
import { AssetDetailPanel } from '../../../features/my-images/components/AssetDetailPanel';
import { AssetFilterBar } from '../../../features/my-images/components/AssetFilterBar';
import { Icons } from '../../../shared/components/Icons';
import { SyncLiteModal } from '../../../features/sync/components/SyncLiteModal';
import { FolderPickerModal, SyncProgressView } from '../../../features/upload-sync/components/SyncLiteUI';
import { FolderList } from '../../pro/components/my-images/FolderList'; 
import { BatchActionBar } from '../../pro/components/my-images/BatchActionBar'; 
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';

// Refactored Components
import { MultiSourceUploadModal } from '../../../features/upload-sync/components/MultiSourceUploadModal';
import { CreateCollectionModal } from '../../../features/my-images/components/CreateCollectionModal';
import { DeleteConfirmationModal } from '../../../features/my-images/components/DeleteConfirmationModal';
import { MoveCollectionModal } from '../../../features/my-images/components/MoveCollectionModal';
import { ClassificationModal } from '../../../features/my-images/components/ClassificationModal';
import { SyncSelectionModal } from '../../../features/sync/components/SyncSelectionModal';

export const CasualMyImages = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(MOCK_FOLDERS[0]?.id || null);
  const [folders, setFolders] = useState(MOCK_FOLDERS);
  const [allAssets, setAllAssets] = useState<AssetItem[]>(MOCK_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);
  
  // Modals State
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false); // Phone Sync Modal
  const [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false); // Computer Sync Modal

  // Asset Action States
  const [actionAsset, setActionAsset] = useState<AssetItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSyncingFolder, setIsSyncingFolder] = useState(false); // Folder Sync Progress
  const [isSyncSuccessOpen, setIsSyncSuccessOpen] = useState(false); // Success Modal
  const [isSyncSelectionOpen, setIsSyncSelectionOpen] = useState(false); // Selection Modal

  // Multi-Upload State
  const [isUploadSelectionOpen, setIsUploadSelectionOpen] = useState(false);
  const [isUploadSuccessOpen, setIsUploadSuccessOpen] = useState(false);
  const [isSaveSuccessOpen, setIsSaveSuccessOpen] = useState(false);
  
  // Batch State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isSelectMode = selectedIds.size > 0;

  // Filter Logic
  const filteredAssets = useMemo(() => {
    return allAssets.filter(item => {
      const matchesTab = activeTab === 'All' || item.source === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
       // Simple mock folder logic
      const matchesFolder = activeFolder === null || item.folderId === activeFolder;
      return matchesTab && matchesSearch && matchesFolder;
    });
  }, [activeTab, searchQuery, activeFolder]);

  const handleAction = (action: string, asset?: AssetItem) => {
    if (!asset) return;

    if (action === 'delete') {
      setActionAsset(asset);
      setIsDeleteModalOpen(true);
    } else if (action === 'move') {
      setActionAsset(asset);
      setIsMoveModalOpen(true);
    } else if (action === 'filter') {
      setActionAsset(asset);
      setIsFilterModalOpen(true);
    } else if (action === 'edit' || action === 'remix') {
      onNavigate('editor');
    }
  };

  const confirmDelete = () => {
    // In a real app, delete from server/state
    if (actionAsset) {
      console.log("Deleted", actionAsset.id);
      // In a real implementation we would remove from 'allAssets'
    } else if (selectedIds.size > 0) {
      console.log("Deleted batch", Array.from(selectedIds));
      setSelectedIds(new Set());
    }
    setIsDeleteModalOpen(false);
    setActionAsset(null);
  };

  const confirmMove = (folderId: string) => {
    // In a real app, update asset folderId
    if (actionAsset) {
      console.log("Moved", actionAsset.id, "to", folderId);
    } else if (selectedIds.size > 0) {
      console.log("Moved batch", Array.from(selectedIds), "to", folderId);
      setSelectedIds(new Set());
    }
    setIsMoveModalOpen(false);
    setActionAsset(null);
  };

  const confirmFilterChange = (newSource: string) => {
    // In a real app, update asset source
    console.log("Changed filter", actionAsset?.id, "to", newSource);
    setIsFilterModalOpen(false);
    setActionAsset(null);
  };

  const handleBatchAction = (action: string) => {
    if (action === 'edit') {
      onNavigate('editor');
    } else if (action === 'folder') {
      setIsMoveModalOpen(true);
    } else if (action === 'download') {
      setIsSaveSuccessOpen(true);
      setSelectedIds(new Set());
    } else if (action === 'delete') {
      setIsDeleteModalOpen(true);
    }
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleCreateFolder = (name: string, icon: string) => {
    const newFolder = {
      id: `folder_${Date.now()}`,
      name: name,
      count: 0,
      icon: icon as any
    };
    setFolders([...folders, newFolder]);
  };

  const handleUploadConfirm = (newAssets: AssetItem[]) => {
      // Add pending uploads to main assets list
      const finalAssets = newAssets.map(p => ({
          ...p,
          folderId: activeFolder || 'f_client' // Fallback or current folder
      }));
      setAllAssets(prev => [...finalAssets, ...prev]);
      setIsUploadSelectionOpen(false);
      setIsUploadSuccessOpen(true);
  };

  return (
    <DashboardLayout user={MOCK_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="my-images">
      <div className="flex h-[calc(100vh-140px)] overflow-hidden border-t border-slate-200 dark:border-white/5 -mt-4">
        
        {/* SIDEBAR (Match Pro structure) */}
        <div className="w-64 bg-white dark:bg-[#0e0f13] border-r border-slate-200 dark:border-white/5 hidden lg:flex flex-col transition-colors">
            {/* Custom Sync Button placed ABOVE folders as requested */}
            <div className="p-4 pb-0">
                <button 
                  onClick={() => setIsSyncSelectionOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95 group mb-2"
                >
                  <Icons.Refresh className="w-4 h-4 group-hover:animate-spin" /> Sync
                </button>
                <button 
                  onClick={() => setIsUploadSelectionOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 hover:from-violet-600/20 hover:to-indigo-600/20 border border-violet-500/20 hover:border-violet-500/50 text-violet-400 hover:text-violet-300 rounded-xl text-sm font-bold shadow-lg shadow-violet-900/10 transition-all active:scale-95 group"
                >
                  <Icons.Upload className="w-4 h-4 group-hover:animate-bounce" /> Multi-Upload
                </button>
            </div>

            {/* Folder List (Reused from Pro) */}
            <FolderList 
              folders={folders}
              activeId={activeFolder}
              onSelect={setActiveFolder}
              onCreate={() => setIsCreateFolderOpen(true)}
            />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden bg-slate-50 dark:bg-[#020617] relative transition-colors">
           
           <div className="flex-none mb-6 flex items-center justify-between">
               <div>
                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   {activeFolder ? MOCK_FOLDERS.find(f => f.id === activeFolder)?.name : 'All Assets'} 
                   <span className="text-slate-500 font-normal text-sm bg-white dark:bg-white/5 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-white/5">{filteredAssets.length}</span>
                 </h1>
               </div>
              <div className="flex gap-2">
              </div>
           </div>

           <AssetFilterBar 
             activeTab={activeTab} 
             onTabChange={setActiveTab}
             searchQuery={searchQuery}
             onSearchChange={setSearchQuery}
           />

           <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
              {filteredAssets.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                   {filteredAssets.map((asset, idx) => (
                     <AssetCard 
                       key={asset.id}
                       asset={asset}
                       index={idx}
                       isSelectMode={true} // Enable selection like Pro
                       isSelected={selectedIds.has(asset.id)}
                       onSelect={() => toggleSelection(asset.id)}
                        onClick={() => {
                          if (isSelectMode) toggleSelection(asset.id);
                          else setSelectedAsset(asset);
                        }}
                        onAction={(action) => handleAction(action, asset)}
                      />
                   ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                   <Icons.Image className="w-12 h-12 mb-4 opacity-50" />
                   <p>No assets in this folder.</p>
                </div>
              )}
           </div>

           {/* Batch Selection Bar */}
           {isSelectMode && (
             <BatchActionBar 
               count={selectedIds.size}
               onClear={() => setSelectedIds(new Set())}
               onAction={handleBatchAction}
             />
           )}
        </div>

        {/* DETAILS PANEL */}
        {selectedAsset && !isSelectMode && (
          <div className="absolute inset-0 z-30 md:static md:z-auto flex">
             <div className="flex-1 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setSelectedAsset(null)} />
             <AssetDetailPanel 
               asset={selectedAsset}
               onClose={() => setSelectedAsset(null)}
               onAction={handleAction}
               isPro={false}
             />
          </div>
        )}

      </div>
      
      {/* --- MODALS --- */}
      
      {/* 1. Sync Modals */}
      <SyncLiteModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} onNavigate={onNavigate} />
      
      <FolderPickerModal 
        isOpen={isFolderPickerOpen} 
        onClose={() => setIsFolderPickerOpen(false)} 
        onConfirm={() => {
            setIsFolderPickerOpen(false);
            setIsSyncingFolder(true);
        }} 
      />

      <GlassModal isOpen={isSyncingFolder} onClose={() => {}}>
         <SyncProgressView onComplete={() => {
             setIsSyncingFolder(false);
             setIsSyncSuccessOpen(true);
         }} />
      </GlassModal>

      <GlassModal isOpen={isSyncSuccessOpen} onClose={() => setIsSyncSuccessOpen(false)}>
         <div className="text-center p-6">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Icons.Check className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sync Complete!</h3>
             <p className="text-slate-500 dark:text-slate-400 mb-8">
                Successfully organized and added new photos to your library.
             </p>
             <NeonButton onClick={() => setIsSyncSuccessOpen(false)} className="mx-auto">
                Awesome
             </NeonButton>
         </div>
      </GlassModal>

      <SyncSelectionModal 
        isOpen={isSyncSelectionOpen} 
        onClose={() => setIsSyncSelectionOpen(false)}
        onSelect={(option) => {
            if (option === 'phone') setIsSyncModalOpen(true);
            else setIsFolderPickerOpen(true);
        }}
      />

      {/* 2. Upload Modals */}
      <MultiSourceUploadModal 
        isOpen={isUploadSelectionOpen} 
        onClose={() => setIsUploadSelectionOpen(false)}
        onConfirm={handleUploadConfirm}
        activeFolderName={activeFolder ? MOCK_FOLDERS.find(f => f.id === activeFolder)?.name || 'Collection' : 'Collection'}
      />

      <GlassModal isOpen={isUploadSuccessOpen} onClose={() => setIsUploadSuccessOpen(false)}>
         <div className="text-center p-6">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Icons.Check className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upload Successful!</h3>
             <p className="text-slate-500 dark:text-slate-400 mb-8">
                Your files have been added to the library.
             </p>
             <NeonButton onClick={() => setIsUploadSuccessOpen(false)} className="mx-auto">
                Finish
             </NeonButton>
         </div>
      </GlassModal>

      <GlassModal isOpen={isSaveSuccessOpen} onClose={() => setIsSaveSuccessOpen(false)}>
         <div className="text-center p-6">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Icons.Download className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Saved to Device</h3>
             <p className="text-slate-500 dark:text-slate-400 mb-8">
                Successfully saved {selectedIds.size > 0 ? selectedIds.size : 'selected'} images to your gallery.
             </p>
             <NeonButton onClick={() => setIsSaveSuccessOpen(false)} className="mx-auto">
                Great
             </NeonButton>
         </div>
      </GlassModal>

      {/* 3. Action Modals */}
      <CreateCollectionModal 
        isOpen={isCreateFolderOpen} 
        onClose={() => setIsCreateFolderOpen(false)}
        onCreate={handleCreateFolder}
      />

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={actionAsset ? 'Delete Asset?' : `Delete ${selectedIds.size} Assets?`}
      />

      <MoveCollectionModal 
        isOpen={isMoveModalOpen} 
        onClose={() => setIsMoveModalOpen(false)}
        onConfirm={confirmMove}
        folders={folders}
      />

      <ClassificationModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)}
        onConfirm={confirmFilterChange}
      />

    </DashboardLayout>
  );
};
