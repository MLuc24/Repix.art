
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { MOCK_ASSETS } from '../../../services/mock/my_images';
import { AssetItem } from '../../../features/my-images/types';
import { AssetCard } from '../../../features/my-images/components/AssetCard';
import { AssetDetailPanel } from '../../../features/my-images/components/AssetDetailPanel';
import { AssetFilterBar } from '../../../features/my-images/components/AssetFilterBar';
import { Icons } from '../../../shared/components/Icons';

export const CasualMyImages = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);

  // Filter Logic
  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter(item => {
      const matchesTab = activeTab === 'All' || item.source === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleAction = (action: string) => {
    if (action === 'edit' || action === 'remix') onNavigate('editor');
    // Mock other actions
    console.log(action);
  };

  return (
    <DashboardLayout user={MOCK_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="my-images">
      <div className="flex h-[calc(100vh-140px)] overflow-hidden relative">
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-2 md:p-6 overflow-hidden">
           
           <div className="flex-none mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                My Images <span className="text-slate-500 font-normal text-sm bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-white/5">{filteredAssets.length}</span>
              </h1>
              <button 
                onClick={() => onNavigate('upload')}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-500/20"
              >
                <Icons.Upload className="w-4 h-4" /> Upload
              </button>
           </div>

           <AssetFilterBar 
             activeTab={activeTab} 
             onTabChange={setActiveTab}
             searchQuery={searchQuery}
             onSearchChange={setSearchQuery}
           />

           <div className="flex-1 overflow-y-auto custom-scrollbar pb-20">
              {filteredAssets.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                   {filteredAssets.map((asset, idx) => (
                     <AssetCard 
                       key={asset.id}
                       asset={asset}
                       index={idx}
                       onClick={() => setSelectedAsset(asset)}
                       onAction={handleAction}
                     />
                   ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                   <Icons.Image className="w-12 h-12 mb-4 opacity-50" />
                   <p>No images found.</p>
                </div>
              )}
           </div>
        </div>

        {/* Detail Overlay (Desktop: Sidebar, Mobile: Modal style) */}
        {selectedAsset && (
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
    </DashboardLayout>
  );
};
