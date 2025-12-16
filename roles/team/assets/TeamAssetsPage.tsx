
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_USER, MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { Icons } from '../../../shared/components/Icons';
import { AssetFilterBar } from '../../../features/my-images/components/AssetFilterBar';
import { TeamFolderSidebar } from './TeamFolderSidebar';
import { TeamAssetCard } from './TeamAssetCard';
import { TeamAssetDetailPanel } from './TeamAssetDetailPanel';
import { UploadToTeamModal } from './UploadToTeamModal';
import { AddToProjectModal } from './AddToProjectModal';
import { TeamAssetItem, MOCK_TEAM_ASSETS, MOCK_FOLDERS } from './types';

export const TeamAssetsPage = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user?: any }) => {
    // ... (rest of the component state is fine, just changing the function signature and JSX)
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAsset, setSelectedAsset] = useState<TeamAssetItem | null>(null);
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null); // null = All Assets
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAddToProjectModalOpen, setIsAddToProjectModalOpen] = useState(false);

    // Only show shared team assets
    const sharedAssets = useMemo(() => {
        return MOCK_TEAM_ASSETS.filter(item => item.isShared === true);
    }, []);

    // Apply filters
    const filteredAssets = useMemo(() => {
        return sharedAssets.filter(item => {
            // 1. Folder Filter
            if (activeFolderId && item.folderId !== activeFolderId) {
                return false;
            }

            // 2. Tab Filter (All, Uploads, Generated, Remixed)
            const normalizedTab = activeTab.toLowerCase();
            const matchesTab = 
                activeTab === 'All' || 
                item.source === normalizedTab || 
                (activeTab === 'Uploads' && item.source === 'upload') ||
                (activeTab === 'AI Generated' && item.source === 'generated') ||
                (activeTab === 'Remixes' && item.source === 'remix');

            // 3. Search Filter
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [sharedAssets, activeTab, searchQuery, activeFolderId]);

    const handleAction = (action: string, asset?: TeamAssetItem) => {
        console.log('Action:', action, asset);
        if (action === 'upload') {
            setIsUploadModalOpen(true);
        } else if (action === 'add-to-project') {
            setIsAddToProjectModalOpen(true);
        } else if (action === 'open' && asset) {
            onNavigate('editor');
        } else if (action === 'download' && asset) {
            console.log('Download asset:', asset.id);
        } else if (action === 'delete' && asset) {
            console.log('Delete asset:', asset.id);
        }
    };

    return (
        <DashboardLayout user={user || MOCK_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="team-assets">
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50 dark:bg-slate-900">

                {/* Left Sidebar (Folders) */}
                <div className="w-64 border-r border-slate-200 dark:border-slate-800 hidden md:block bg-white dark:bg-slate-900">
                    <TeamFolderSidebar
                        activeFolderId={activeFolderId}
                        onSelectFolder={setActiveFolderId}
                        viewMode="shared"
                        folders={MOCK_FOLDERS}
                        onCreateFolder={() => console.log('Create folder request')}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* Header with Navigation Tabs */}
                    <div className="flex-none px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Team Assets</h1>
                                <p className="text-sm text-slate-500">Shared library for your team</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Icons.Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search team assets..."
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
                        
                        {/* Navigation Tabs - Link to My Images */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => onNavigate('my-images')}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <div className="flex items-center gap-2">
                                    <Icons.User className="w-4 h-4" />
                                    My Assets
                                </div>
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            >
                                <div className="flex items-center gap-2">
                                    <Icons.User className="w-4 h-4" />
                                    Team Shared
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex-none px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
                        <AssetFilterBar
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            searchQuery=""
                            onSearchChange={() => {}}
                            hideSearch={true}
                        />
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto p-6" onClick={() => setSelectedAsset(null)}>
                        {filteredAssets.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {filteredAssets.map((asset, index) => (
                                    <TeamAssetCard
                                        key={asset.id}
                                        asset={asset}
                                        onAssetClick={() => {
                                            setSelectedAsset(asset);
                                        }}
                                        onAction={(action) => handleAction(action, asset)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                <Icons.Image className="w-12 h-12 mb-4 opacity-50" />
                                <p>No team assets found.</p>
                                <p className="text-xs mt-2">Try adjusting your filters or upload new assets.</p>
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
                <UploadToTeamModal 
                    onClose={() => setIsUploadModalOpen(false)}
                    isTeamUpload={true}
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
