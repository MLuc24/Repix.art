
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

export const ProMyImages = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
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
  const handleAction = (action: string) => {
    if (action === 'edit' || action === 'remix') onNavigate('editor');
    console.log(action);
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
            <div className="p-4 pb-0">
                <button 
                  onClick={() => setIsSyncModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-500/20 transition-all active:scale-95 group mb-2"
                >
                  <Icons.Smartphone className="w-4 h-4 group-hover:animate-pulse" /> Sync from Phone
                </button>
            </div>

           <FolderList 
             folders={MOCK_FOLDERS}
             activeId={activeFolder}
             onSelect={setActiveFolder}
             onCreate={() => console.log('Create Folder')}
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
    </DashboardLayout>
  );
};
