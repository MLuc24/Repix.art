
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { Icons } from '../../../shared/components/Icons';
import { AssetFilterBar } from '../../../features/my-images/components/AssetFilterBar';
import { TeamFolderSidebar } from './TeamFolderSidebar';
import { TeamAssetGrid } from './TeamAssetGrid';
import { TeamAssetDetailPanel } from './TeamAssetDetailPanel';
import { MultiSourceUploadModal } from '../../../features/upload-sync/components/MultiSourceUploadModal';
import { AddToProjectModal } from './AddToProjectModal';
import { TeamAssetItem, MOCK_TEAM_ASSETS } from './types';

export const TeamAssetsPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAsset, setSelectedAsset] = useState<TeamAssetItem | null>(null);
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null); // null = All Assets
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAddToProjectModalOpen, setIsAddToProjectModalOpen] = useState(false);

    // Filter Logic
    const filteredAssets = useMemo(() => {
        return MOCK_TEAM_ASSETS.filter(item => {
            // 1. Folder Filter
            if (activeFolderId && item.folderId !== activeFolderId) {
                // Special case: if activeFolderId is 'product-shots' (mock folder id mapped from sidebar), handle accordingly
                // For simplicity in this mock, we only strictly match if folderId exists.
                // If activeFolderId is null, show all.
                return false;
            }

            // 2. Tab Filter (All, Uploads, Generated, Remixed)
            // Map 'Uploads' to 'upload', 'Generated' to 'generated', etc.
            // Or just lowercase match if tabs are named properly.
            const normalizedTab = activeTab.toLowerCase();
            const matchesTab = activeTab === 'All' || item.source === normalizedTab || (activeTab === 'Uploads' && item.source === 'upload');

            // 3. Search Filter
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery, activeFolderId]);

    const handleAction = (action: string, asset?: TeamAssetItem) => {
        console.log('Action:', action, asset);
        if (action === 'upload') {
            setIsUploadModalOpen(true);
        } else if (action === 'add-to-project') {
            setIsAddToProjectModalOpen(true);
        }
        // Handle other actions like 'delete'
    };

    return (
        <DashboardLayout user={MOCK_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="team-assets">
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50 dark:bg-slate-900">

                {/* Left Sidebar (Folders) */}
                <div className="w-64 border-r border-slate-200 dark:border-slate-800 hidden md:block bg-white dark:bg-slate-900">
                    <TeamFolderSidebar
                        activeFolderId={activeFolderId}
                        onSelectFolder={setActiveFolderId}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* Header */}
                    <div className="flex-none px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Team Assets</h1>
                            <p className="text-sm text-slate-500">Shared library for your team</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Icons.Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search assets..."
                                    className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setIsUploadModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <Icons.Upload className="w-4 h-4" />
                                Upload to Team
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex-none px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
                        <AssetFilterBar
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            searchQuery="" // Search is in header now, so we can hide or reuse this prop if needed. FilterBar might have its own search input which we should hide or sync.
                            onSearchChange={() => { }} // No-op if we hide it
                            hideSearch={true} // We need to check if AssetFilterBar supports hiding search
                        />
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto p-6" onClick={() => setSelectedAsset(null)}>
                        {filteredAssets.length > 0 ? (
                            <TeamAssetGrid
                                assets={filteredAssets}
                                onAssetClick={(e, asset) => {
                                    e.stopPropagation();
                                    setSelectedAsset(asset);
                                }}
                                onAction={handleAction}
                                selectedAssetId={selectedAsset?.id}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                <Icons.Image className="w-12 h-12 mb-4 opacity-50" />
                                <p>No assets found in this view.</p>
                            </div>
                        )}
                    </div>
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

            </div>

            {isUploadModalOpen && (
                <MultiSourceUploadModal 
                    isOpen={isUploadModalOpen} 
                    onClose={() => setIsUploadModalOpen(false)} 
                    onConfirm={(assets) => {
                        console.log("Uploaded to Team:", assets);
                        // Mock adding to team
                        setIsUploadModalOpen(false);
                        alert("Assets uploaded to Team successfully!");
                    }}
                    activeFolderName={activeFolderId ? activeFolderId : 'Team Assets'}
                />
            )}

            {isAddToProjectModalOpen && (
                <AddToProjectModal
                    onClose={() => setIsAddToProjectModalOpen(false)}
                    assetIds={selectedAsset ? [selectedAsset.id] : []}
                />
            )}
        </DashboardLayout>
    );
};
