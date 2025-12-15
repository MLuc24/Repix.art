


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
import { UploadDropzone } from '../../../features/upload-sync/components/UploadUI';
import { FolderList } from '../../pro/components/my-images/FolderList'; // Reusing Pro component
import { BatchActionBar } from '../../pro/components/my-images/BatchActionBar'; // Reusing Pro component
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI'; // Import GlassModal for Selection Modal

export const CasualMyImages = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [folders, setFolders] = useState(MOCK_FOLDERS);
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);
  
  // Modals
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderIcon, setNewFolderIcon] = useState('folder'); // New Icon State
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
  const [activeUploadTab, setActiveUploadTab] = useState<'local' | 'drive' | 'cloud' | 'link'>('local');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccessOpen, setIsUploadSuccessOpen] = useState(false);

  // Batch State (Added to match Pro feel, even if simple)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isSelectMode = selectedIds.size > 0;

  // Filter Logic
  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter(item => {
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
    console.log("Deleted", actionAsset?.id);
    setIsDeleteModalOpen(false);
    setActionAsset(null);
  };

  const confirmMove = (folderId: string) => {
    // In a real app, update asset folderId
    console.log("Moved", actionAsset?.id, "to", folderId);
    setIsMoveModalOpen(false);
    setActionAsset(null);
  };

  const confirmFilterChange = (newSource: string) => {
    // In a real app, update asset source
    console.log("Changed filter", actionAsset?.id, "to", newSource);
    setIsFilterModalOpen(false);
    setActionAsset(null);
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
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
               onAction={(action) => {
                  console.log(action); 
                  setSelectedIds(new Set());
               }}
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
      <SyncLiteModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} onNavigate={onNavigate} />
      
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

      {/* --- UPLOAD COMPONENT FAMILY --- */}
      
      {/* Upload Selection Modal (Tabbed Interface) */}
      <GlassModal isOpen={isUploadSelectionOpen} onClose={() => setIsUploadSelectionOpen(false)}>
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Multi-Source Upload</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Import media from your device or cloud services.</p>
            </div>

            {/* Tabs */}
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

            {/* Content Area */}
            <div className="min-h-[300px] flex flex-col">
                {activeUploadTab === 'local' && (
                    <div className="animate-fade-in">
                        <UploadDropzone onFilesSelected={() => {
                            setIsUploadSelectionOpen(false);
                            setIsUploading(true);
                        }} />
                    </div>
                )}

                {activeUploadTab === 'drive' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center h-full py-8 border-2 border-dashed border-blue-200 dark:border-blue-500/30 rounded-3xl bg-blue-50/50 dark:bg-blue-900/10">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                           <Icons.Google className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Google Drive</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xs text-sm">
                           Connect your account to access photos directly from Drive.
                        </p>
                        <NeonButton onClick={() => { setIsUploadSelectionOpen(false); setIsUploading(true); }} className="!w-auto px-8 bg-blue-600 hover:bg-blue-700">
                           Connect Account
                        </NeonButton>
                    </div>
                )}

                {activeUploadTab === 'cloud' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center h-full py-8 border-2 border-dashed border-cyan-200 dark:border-cyan-500/30 rounded-3xl bg-cyan-50/50 dark:bg-cyan-900/10">
                        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center mb-4">
                           <Icons.Cloud className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cloud Storage</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xs text-sm">
                           Sync seamlessly from Dropbox, OneDrive, or Box.
                        </p>
                        <div className="flex gap-3">
                             <NeonButton onClick={() => { setIsUploadSelectionOpen(false); setIsUploading(true); }} className="!w-auto px-6 bg-[#0061FE] hover:bg-[#0061FE]/80">
                                Dropbox
                             </NeonButton>
                             <NeonButton onClick={() => { setIsUploadSelectionOpen(false); setIsUploading(true); }} className="!w-auto px-6 bg-[#0078D4] hover:bg-[#0078D4]/80">
                                OneDrive
                             </NeonButton>
                        </div>
                    </div>
                )}

                {activeUploadTab === 'link' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center h-full py-8 border-2 border-dashed border-pink-200 dark:border-pink-500/30 rounded-3xl bg-pink-50/50 dark:bg-pink-900/10">
                        <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center mb-4">
                           <Icons.Link className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Import via Link</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xs text-sm">
                           Paste a direct URL to an image file (JPG, PNG).
                        </p>
                        <div className="flex gap-2 w-full max-w-sm">
                             <input 
                               type="text" 
                               placeholder="https://example.com/image.jpg"
                               className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1b26] focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                             />
                             <NeonButton onClick={() => { setIsUploadSelectionOpen(false); setIsUploading(true); }} className="!w-auto px-6 bg-pink-600 hover:bg-pink-700">
                                Import
                             </NeonButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </GlassModal>

      {/* Upload Progress */}
      <GlassModal isOpen={isUploading} onClose={() => {}}>
         <SyncProgressView onComplete={() => {
             setIsUploading(false);
             setIsUploadSuccessOpen(true);
         }} />
      </GlassModal>

      {/* Upload Success */}
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
                <button 
                  onClick={() => setIsCreateFolderOpen(false)} 
                  className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                    Cancel
                </button>
                <NeonButton 
                  onClick={handleCreateFolder} 
                  disabled={!newFolderName.trim()}
                  className="flex-1 !w-auto"
                >
                    Create
                </NeonButton>
            </div>
         </div>
      </GlassModal>

      {/* Delete Confirmation Modal */}
      <GlassModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
         <div className="p-6 text-center max-w-sm mx-auto">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Icons.Trash className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete Asset?</h3>
             <p className="text-slate-500 dark:text-slate-400 mb-6">This action cannot be undone.</p>
             <div className="flex gap-3">
                 <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">Cancel</button>
                 <NeonButton onClick={confirmDelete} className="flex-1 !w-auto bg-red-500 hover:bg-red-600 shadow-red-500/20">Delete</NeonButton>
             </div>
         </div>
      </GlassModal>

      {/* Move to Collection Modal */}
      <GlassModal isOpen={isMoveModalOpen} onClose={() => setIsMoveModalOpen(false)}>
         <div className="p-6 max-w-sm mx-auto">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Move to Collection</h3>
             <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                 {folders.map(f => (
                     <button 
                        key={f.id}
                        onClick={() => confirmMove(f.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 text-left transition-colors"
                     >
                        <Icons.Image className="w-4 h-4 opacity-50" />
                        <span className="font-medium">{f.name}</span>
                     </button>
                 ))}
             </div>
         </div>
      </GlassModal>

      {/* Filter Classification Modal */}
      <GlassModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
         <div className="p-6 max-w-sm mx-auto">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Change Classification</h3>
             <div className="grid grid-cols-2 gap-3">
                 {[
                    { id: 'upload', label: 'Upload', color: 'blue' },
                    { id: 'remix', label: 'AI Remix', color: 'fuchsia' },
                    { id: 'generated', label: 'Generated', color: 'violet' },
                    { id: 'export', label: 'Export', color: 'green' }
                 ].map(type => (
                     <button 
                        key={type.id}
                        onClick={() => confirmFilterChange(type.id)}
                        className={`p-4 rounded-xl border border-${type.color}-500/30 bg-${type.color}-500/10 hover:bg-${type.color}-500/20 text-${type.color}-500 font-bold transition-all`}
                     >
                        {type.label}
                     </button>
                 ))}
             </div>
         </div>
      </GlassModal>

    </DashboardLayout>
  );
};
