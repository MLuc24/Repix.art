import React, { useState, useMemo } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { AssetFilterBar } from '../../../features/my-images/components/AssetFilterBar';
import { TeamAssetCard } from './TeamAssetCard';
import { TeamAssetDetailPanel } from './TeamAssetDetailPanel';
import { TeamAssetItem } from './types';

interface MyAssetsContentProps {
    assets: TeamAssetItem[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeFolderId: string | null;
    onNavigate: (path: string) => void;
}

export const MyAssetsContent = ({
    assets,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    activeFolderId,
    onNavigate,
}: MyAssetsContentProps) => {
    const [selectedAsset, setSelectedAsset] = useState<TeamAssetItem | null>(null);

    // Filter assets
    const filteredAssets = useMemo(() => {
        return assets.filter(item => {
            // Folder Filter
            if (activeFolderId && item.folderId !== activeFolderId) {
                return false;
            }

            // Tab Filter
            const normalizedTab = activeTab.toLowerCase();
            const matchesTab =
                activeTab === 'All' ||
                item.source === normalizedTab ||
                (activeTab === 'Uploads' && item.source === 'upload') ||
                (activeTab === 'AI Generated' && item.source === 'generated') ||
                (activeTab === 'Remixes' && item.source === 'remix');

            // Search Filter
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [assets, activeTab, searchQuery, activeFolderId]);

    const handleAction = (action: string, asset?: TeamAssetItem) => {
        if (action === 'open-editor' || action === 'edit' || action === 'remix') {
            onNavigate('editor');
        } else if (action === 'download' && asset) {
            console.log('Download asset:', asset.id);
        } else if (action === 'delete' && asset) {
            console.log('Delete asset:', asset.id);
        }
    };

    return (
        <>
            {/* Filter Bar */}
            <div className="flex-none px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
                <AssetFilterBar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchQuery=""
                    onSearchChange={() => { }}
                    hideSearch={true}
                />
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6" onClick={() => setSelectedAsset(null)}>
                {filteredAssets.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredAssets.map((asset) => (
                            <TeamAssetCard
                                key={asset.id}
                                asset={asset}
                                onAssetClick={() => setSelectedAsset(asset)}
                                onAction={handleAction}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <Icons.Image className="w-12 h-12 mb-4 opacity-50" />
                        <p>No assets found.</p>
                        <p className="text-xs mt-2">Upload or create new assets to get started.</p>
                    </div>
                )}
            </div>

            {/* Right Panel (Detail) */}
            {selectedAsset && (
                <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto absolute right-0 top-0 bottom-0 z-20 shadow-xl md:static md:shadow-none animate-in slide-in-from-right-10 duration-200">
                    <TeamAssetDetailPanel
                        asset={selectedAsset}
                        onClose={() => setSelectedAsset(null)}
                        onAction={handleAction}
                    />
                </div>
            )}
        </>
    );
};
