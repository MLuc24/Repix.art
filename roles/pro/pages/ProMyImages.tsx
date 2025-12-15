
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_PRO_USER } from '../../../services/mock/dashboard';
import { MOCK_ASSETS, MOCK_FOLDERS } from '../../../services/mock/my_images';
import { AssetItem } from '../../../features/my-images/types';
import { AssetCard } from '../../../features/my-images/components/AssetCard';
import { AssetDetailPanel } from '../../../features/my-images/components/AssetDetailPanel';
import { AssetFilterBar } from '../../../features/my-images/components/AssetFilterBar';
import { BatchActionBar } from '../components/my-images/BatchActionBar';
import { FolderList } from '../components/my-images/FolderList';
import { Icons } from '../../../shared/components/Icons';
import { SyncLiteModal } from '../../../features/sync/components/SyncLiteModal';
import { UploadDropzone } from '../../../features/upload-sync/components/UploadUI';
import { FolderPickerModal, SyncProgressView } from '../../../features/upload-sync/components/SyncLiteUI';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';


export const ProMyImages = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(MOCK_FOLDERS[0]?.id || null);
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false); // Phone Sync
  const [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false); // Computer Sync
  const [isSyncingFolder, setIsSyncingFolder] = useState(false);
  const [isSyncSuccessOpen, setIsSyncSuccessOpen] = useState(false);
  const [isSyncSelectionOpen, setIsSyncSelectionOpen] = useState(false);
  const [folders, setFolders] = useState(MOCK_FOLDERS);

  // Multi-Upload State
  const [isUploadSelectionOpen, setIsUploadSelectionOpen] = useState(false);
  const [activeUploadTab, setActiveUploadTab] = useState<'local' | 'drive' | 'cloud' | 'link'>('local');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccessOpen, setIsUploadSuccessOpen] = useState(false);

  // Modals & Actions
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderIcon, setNewFolderIcon] = useState('folder');
  
  const [actionAsset, setActionAsset] = useState<AssetItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  
  // Batch State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isSelectMode = selectedIds.size > 0;

  // Filter Logic
  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter(item => {
      const matchesTab = activeTab === 'All' || item.source === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFolder = activeFolder === null || item.folderId === activeFolder;
      return matchesTab && matchesSearch && matchesFolder;
    });
  }, [activeTab, searchQuery, activeFolder]);

  // Handlers
  // Handlers
  const handleAction = (action: string, asset?: AssetItem) => {
    if (!asset) {
       // Only for non-specific actions or direct calls
       if (action === 'edit' || action === 'remix') onNavigate('editor');
       return;
    }

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
    console.log("Deleted", actionAsset?.id);
    setIsDeleteModalOpen(false);
    setActionAsset(null);
  };

  const confirmMove = (folderId: string) => {
    console.log("Moved", actionAsset?.id, "to", folderId);
    setIsMoveModalOpen(false);
    setActionAsset(null);
  };

  const confirmFilterChange = (newSource: string) => {
    console.log("Changed filter", actionAsset?.id, "to", newSource);
    setIsFilterModalOpen(false);
    setActionAsset(null);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder = {
      id: `folder_${Date.now()}`,
      name: newFolderName,
      count: 0,
      icon: newFolderIcon
    };
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setNewFolderIcon('folder');
    setIsCreateFolderOpen(false);
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBatchAction = (action: string) => {
    console.log(`Batch ${action} on`, Array.from(selectedIds));
    setSelectedIds(new Set()); // Clear
  };

  return (
    <DashboardLayout user={MOCK_PRO_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="my-images">
      <div className="flex h-[calc(100vh-140px)] overflow-hidden border-t border-slate-200 dark:border-white/5 -mt-4">
        
        {/* PRO SIDEBAR: FOLDERS */}
        <div className="w-64 bg-white dark:bg-[#0e0f13] border-r border-slate-200 dark:border-white/5 hidden lg:flex flex-col transition-colors">
            {/* Custom Sync Button placed ABOVE folders */}
            <div className="p-4 pb-0 space-y-2">
                <button 
                  onClick={() => setIsSyncSelectionOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95 group"
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
                  Library <span className="text-slate-500 font-normal text-sm bg-white dark:bg-white/5 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-white/5">{filteredAssets.length}</span>
                </h1>
                <p className="text-xs text-slate-500">{activeFolder ? MOCK_FOLDERS.find(f => f.id === activeFolder)?.name : 'All Assets'}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onNavigate('upload')}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl text-sm font-bold border border-slate-200 dark:border-white/5 transition-colors"
                >
                  <Icons.Plus className="w-4 h-4" /> Import
                </button>
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
                       isSelectMode={true} // Pro always allows selection click
                       isSelected={selectedIds.has(asset.id)}
                       onSelect={() => toggleSelection(asset.id)}
                       onClick={() => {
                         if (selectedIds.size > 0) toggleSelection(asset.id);
                         else setSelectedAsset(asset);
                       }}
                       onAction={handleAction}
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

           {/* Batch Bar */}
           {isSelectMode && (
             <BatchActionBar 
               count={selectedIds.size}
               onClear={() => setSelectedIds(new Set())}
               onAction={handleBatchAction}
             />
           )}
        </div>

        {/* DETAILS (Collapsible) */}
        {selectedAsset && !isSelectMode && (
           <div className="absolute inset-0 z-30 lg:static lg:z-auto flex">
             <div className="flex-1 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSelectedAsset(null)} />
             <AssetDetailPanel 
               asset={selectedAsset}
               onClose={() => setSelectedAsset(null)}
               onAction={handleAction}
               isPro={true}
             />
           </div>
        )}

      </div>
      <SyncLiteModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} onNavigate={onNavigate} />
      
      {/* Folder Picker Modal */}
      <FolderPickerModal 
        isOpen={isFolderPickerOpen} 
        onClose={() => setIsFolderPickerOpen(false)} 
        onConfirm={() => {
            setIsFolderPickerOpen(false);
            setIsSyncingFolder(true);
        }} 
      />

      {/* Sync Progress Modal */}
      <GlassModal isOpen={isSyncingFolder} onClose={() => {}}>
         <SyncProgressView onComplete={() => {
             setIsSyncingFolder(false);
             setIsSyncSuccessOpen(true);
         }} />
      </GlassModal>

      {/* Sync Success Modal */}
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

      {/* Sync Selection Modal */}
      <GlassModal isOpen={isSyncSelectionOpen} onClose={() => setIsSyncSelectionOpen(false)}>
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sync Source</h2>
            <p className="text-slate-500 dark:text-slate-400">Where would you like to import photos from?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => {
                    setIsSyncSelectionOpen(false);
                    setIsSyncModalOpen(true);
                }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-violet-50 dark:hover:bg-violet-600/20 hover:border-violet-500 hover:shadow-lg transition-all group"
            >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icons.Smartphone className="w-8 h-8 text-violet-500" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                <p className="text-xs text-slate-500 text-center">Scan QR to connect</p>
            </button>
            <button 
                onClick={() => {
                    setIsSyncSelectionOpen(false);
                    setIsFolderPickerOpen(true);
                }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-600/20 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icons.Layout className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Computer</h3>
                <p className="text-xs text-slate-500 text-center">Local folders</p>
            </button>
        </div>
      </GlassModal>

      {/* --- UPLOAD COMPONENT FAMILY (From Casual) --- */}
      <GlassModal isOpen={isUploadSelectionOpen} onClose={() => setIsUploadSelectionOpen(false)}>
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Multi-Source Upload</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Import media from your device or cloud services.</p>
            </div>

            <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
                {[
                    { id: 'local', label: 'Device', icon: Icons.Smartphone, color: 'violet' },
                    { id: 'drive', label: 'Drive', icon: Icons.Google, color: 'blue' },
                    { id: 'cloud', label: 'Cloud', icon: Icons.Cloud, color: 'cyan' },
                    { id: 'link', label: 'Link', icon: Icons.Link, color: 'pink' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveUploadTab(tab.id as any)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all whitespace-nowrap
                            ${activeUploadTab === tab.id 
                                ? `bg-${tab.color}-100 dark:bg-${tab.color}-900/30 border-${tab.color}-500 text-${tab.color}-700 dark:text-${tab.color}-400` 
                                : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }
                        `}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[300px] flex flex-col">
                {activeUploadTab === 'local' && (
                    <div className="animate-fade-in">
                        <UploadDropzone onFilesSelected={() => {
                            setIsUploadSelectionOpen(false);
                            setIsUploading(true);
                        }} />
                    </div>
                )}
                {/* Simplified other tabs for brevity, matching Casual logic structure */}
                {activeUploadTab !== 'local' && (
                     <div className="flex flex-col items-center justify-center h-full text-center">
                         <p className="mb-4 text-slate-500">Connect to {activeUploadTab}...</p>
                         <NeonButton onClick={() => { setIsUploadSelectionOpen(false); setIsUploading(true); }}>Connect</NeonButton>
                     </div>
                )}
            </div>
        </div>
      </GlassModal>

      <GlassModal isOpen={isUploading} onClose={() => {}}>
         <SyncProgressView onComplete={() => {
             setIsUploading(false);
             setIsUploadSuccessOpen(true);
         }} />
      </GlassModal>
      
      <GlassModal isOpen={isUploadSuccessOpen} onClose={() => setIsUploadSuccessOpen(false)}>
         <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upload Successful!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Files added to library.</p>
              <NeonButton onClick={() => setIsUploadSuccessOpen(false)} className="mx-auto">Finish</NeonButton>
         </div>
      </GlassModal>

      {/* Create Collection Modal */}
      <GlassModal isOpen={isCreateFolderOpen} onClose={() => setIsCreateFolderOpen(false)}>
         <div className="p-4 w-full max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">New Collection</h3>
            <div className="grid grid-cols-5 gap-2 mb-6">
                {['folder', 'heart', 'star', 'image', 'user'].map((icon) => (
                    <button
                        key={icon}
                        onClick={() => setNewFolderIcon(icon)}
                        className={`p-3 rounded-xl border flex items-center justify-center transition-all ${newFolderIcon === icon ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500'}`}
                    >
                        {icon === 'heart' && <Icons.Wand className="w-5 h-5" />}
                        {icon === 'star' && <Icons.Star className="w-5 h-5" />}
                        {icon === 'folder' && <Icons.Layout className="w-5 h-5" />}
                        {icon === 'image' && <Icons.Image className="w-5 h-5" />}
                        {icon === 'user' && <Icons.User className="w-5 h-5" />}
                    </button>
                ))}
            </div>
            
            <input 
                autoFocus
                type="text" 
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                placeholder="Collection Name..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6"
            />
            
            <div className="flex gap-3">
                <button onClick={() => setIsCreateFolderOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Cancel</button>
                <NeonButton onClick={handleCreateFolder} disabled={!newFolderName.trim()} className="flex-1 !w-auto">Create</NeonButton>
            </div>
         </div>
      </GlassModal>

      {/* Delete/Move/Filter Modals (Simplified Copies) */}
      <GlassModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
         <div className="p-6 text-center max-w-sm mx-auto">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Trash className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete Asset?</h3>
             <div className="flex gap-3 mt-6">
                 <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">Cancel</button>
                 <NeonButton onClick={confirmDelete} className="flex-1 !w-auto bg-red-500 hover:bg-red-600 shadow-red-500/20">Delete</NeonButton>
             </div>
         </div>
      </GlassModal>

      <GlassModal isOpen={isMoveModalOpen} onClose={() => setIsMoveModalOpen(false)}>
         <div className="p-6 max-w-sm mx-auto">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Move to Collection</h3>
             <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                 {folders.map(f => (
                     <button key={f.id} onClick={() => confirmMove(f.id)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 text-left transition-colors">
                        <Icons.Image className="w-4 h-4 opacity-50" />
                        <span className="font-medium">{f.name}</span>
                     </button>
                 ))}
             </div>
         </div>
      </GlassModal>

      <GlassModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
         <div className="p-6 max-w-sm mx-auto">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Change Classification</h3>
             <div className="grid grid-cols-2 gap-3">
                 {[{ id: 'upload', label: 'Upload' }, { id: 'remix', label: 'AI Remix' }, { id: 'generated', label: 'Generated' }, { id: 'export', label: 'Export' }].map(type => (
                     <button key={type.id} onClick={() => confirmFilterChange(type.id)} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 font-bold transition-all">{type.label}</button>
                 ))}
             </div>
         </div>
      </GlassModal>
    </DashboardLayout>
  );
};
