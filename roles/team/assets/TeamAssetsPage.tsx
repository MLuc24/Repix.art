
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { Icons } from '../../../shared/components/Icons';
import { TeamFolderSidebar } from './TeamFolderSidebar';
import { TeamAssetCard } from './TeamAssetCard';
import { TeamAssetDetailPanel } from './TeamAssetDetailPanel';
import { UploadToTeamModal } from './UploadToTeamModal';
import { AddToProjectModal } from './AddToProjectModal';
import { TeamAssetItem, MOCK_TEAM_ASSETS, MOCK_FOLDERS } from './types';
import { MultiSourceUploadModal } from '../../../features/upload-sync/components/MultiSourceUploadModal';
import { ShareToTeamModal } from './ShareToTeamModal';
import { MoveToPersonalModal } from './MoveToPersonalModal';
import { UnifiedSearchModal } from './UnifiedSearchModal';
import { SmartSuggestions } from './SmartSuggestions';
import { CrossTabActivityFeed } from './CrossTabActivityFeed';
import { NewFolderModal } from './NewFolderModal';
import { BatchActionBar } from './BatchActionBar';

type ViewMode = 'personal' | 'shared';

export const TeamAssetsPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('personal');
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAsset, setSelectedAsset] = useState<TeamAssetItem | null>(null);
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAddToProjectModalOpen, setIsAddToProjectModalOpen] = useState(false);
    const [isPersonalUploadOpen, setIsPersonalUploadOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [isShareToTeamModalOpen, setIsShareToTeamModalOpen] = useState(false);
    const [isMoveToPersonalModalOpen, setIsMoveToPersonalModalOpen] = useState(false);
    const [isUnifiedSearchOpen, setIsUnifiedSearchOpen] = useState(false);
    const [selectedAssetsForAction, setSelectedAssetsForAction] = useState<TeamAssetItem[]>([]);
    const [showActivityFeed, setShowActivityFeed] = useState(true);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
    const [isBatchMode, setIsBatchMode] = useState(false);
    const [batchSelectedAssets, setBatchSelectedAssets] = useState<TeamAssetItem[]>([]);

    // Filter assets based on view mode
    const viewAssets = useMemo(() => {
        if (viewMode === 'personal') {
            return MOCK_TEAM_ASSETS.filter(item => item.isShared === false);
        } else {
            return MOCK_TEAM_ASSETS.filter(item => item.isShared === true);
        }
    }, [viewMode]);

    // Filter folders based on view mode
    const viewFolders = useMemo(() => {
        if (viewMode === 'personal') {
            return MOCK_FOLDERS.filter(f => f.isShared === false);
        } else {
            return MOCK_FOLDERS.filter(f => f.isShared === true);
        }
    }, [viewMode]);

    // Apply filters
    const filteredAssets = useMemo(() => {
        return viewAssets.filter(item => {
            if (activeFolderId && item.folderId !== activeFolderId) {
                return false;
            }

            const normalizedTab = activeTab.toLowerCase();
            const matchesTab =
                activeTab === 'All' ||
                item.source === normalizedTab ||
                (activeTab === 'Uploads' && item.source === 'upload') ||
                (activeTab === 'AI Generated' && item.source === 'generated') ||
                (activeTab === 'Remixes' && item.source === 'remix');

            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [viewAssets, activeTab, searchQuery, activeFolderId]);

    const handleAction = (action: string, asset?: TeamAssetItem) => {
        if (action === 'upload') {
            setIsUploadModalOpen(true);
        } else if (action === 'add-to-project') {
            setIsAddToProjectModalOpen(true);
        } else if (action === 'open' || action === 'open-editor' || action === 'edit') {
            onNavigate('editor');
        } else if (action === 'download' && asset) {
            console.log('Download asset:', asset.id);
        } else if (action === 'delete' && asset) {
            console.log('Delete asset:', asset.id);
        } else if (action === 'share-to-team' && asset) {
            setSelectedAssetsForAction([asset]);
            setIsShareToTeamModalOpen(true);
        } else if (action === 'save-to-personal' && asset) {
            setSelectedAssetsForAction([asset]);
            setIsMoveToPersonalModalOpen(true);
        }
    };

    // Get suggested assets for smart suggestions
    const suggestedAssets = useMemo(() => {
        if (viewMode === 'personal') {
            // Suggest personal assets to share with team
            return MOCK_TEAM_ASSETS.filter(a => !a.isShared && a.isPro).slice(0, 5);
        } else {
            // Suggest popular team assets to save personally
            return MOCK_TEAM_ASSETS.filter(a => a.isShared && a.isPro).slice(0, 5);
        }
    }, [viewMode]);

    const filterTabs = [
        { id: 'All', label: 'All Assets', icon: <Icons.Grid className="w-4 h-4" /> },
        { id: 'Uploads', label: 'Uploads', icon: <Icons.Upload className="w-4 h-4" /> },
        { id: 'AI Generated', label: 'AI Generated', icon: <Icons.Sparkles className="w-4 h-4" /> },
        { id: 'Remixes', label: 'Remixes', icon: <Icons.Wand className="w-4 h-4" /> },
    ];

    return (
        <DashboardLayout user={MOCK_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="team-assets">
            <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

                {/* Sidebar */}
                <aside className="w-64 border-r border-slate-800/80 bg-slate-900/50 hidden lg:flex flex-col backdrop-blur-xl">
                    <TeamFolderSidebar
                        activeFolderId={activeFolderId}
                        onSelectFolder={setActiveFolderId}
                        viewMode={viewMode}
                        folders={viewFolders}
                        onCreateFolder={() => setIsNewFolderModalOpen(true)}
                    />
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* Premium Header - Inspired by reference */}
                    <header className="flex-none bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80">
                        <div className="px-6 py-5">
                            {/* Title Section */}
                            <div className="mb-5">
                                <h1 className="text-2xl font-bold text-white mb-1">
                                    {viewMode === 'personal' ? 'My Assets Library' : 'Team Assets Library'}
                                </h1>
                                <p className="text-slate-400 text-xs">
                                    {viewMode === 'personal'
                                        ? 'Manage and organize your personal creative assets'
                                        : 'Collaborate and share assets with your team'
                                    }
                                </p>
                            </div>

                            {/* View Tabs with Quick Actions */}
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setViewMode('personal');
                                            setActiveFolderId(null);
                                        }}
                                        className={`
                                            px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-2
                                            ${viewMode === 'personal'
                                                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30'
                                                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icons.User className="w-3.5 h-3.5" />
                                        My Assets
                                    </button>

                                    <button
                                        onClick={() => {
                                            setViewMode('shared');
                                            setActiveFolderId(null);
                                        }}
                                        className={`
                                            px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-2
                                            ${viewMode === 'shared'
                                                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30'
                                                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icons.User className="w-3.5 h-3.5" />
                                        Team Shared
                                    </button>
                                </div>

                                {/* Quick Cross-Tab Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsUnifiedSearchOpen(true)}
                                        className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                                    >
                                        <Icons.Search className="w-3.5 h-3.5" />
                                        Search All
                                    </button>
                                    {viewMode === 'personal' && viewAssets.filter(a => a.isPro).length > 0 && (
                                        <button
                                            onClick={() => {
                                                const assetsToShare = viewAssets.filter(a => a.isPro).slice(0, 3);
                                                setSelectedAssetsForAction(assetsToShare);
                                                setIsShareToTeamModalOpen(true);
                                            }}
                                            className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border border-blue-500/30"
                                        >
                                            <Icons.Upload className="w-3.5 h-3.5" />
                                            Quick Share
                                        </button>
                                    )}
                                    {viewMode === 'shared' && viewAssets.filter(a => a.isPro).length > 0 && (
                                        <button
                                            onClick={() => {
                                                const assetsToSave = viewAssets.filter(a => a.isPro).slice(0, 3);
                                                setSelectedAssetsForAction(assetsToSave);
                                                setIsMoveToPersonalModalOpen(true);
                                            }}
                                            className="px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 hover:text-violet-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border border-violet-500/30"
                                        >
                                            <Icons.Download className="w-3.5 h-3.5" />
                                            Quick Save
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Filter Pills + Actions */}
                            <div className="flex items-center justify-between">
                                {/* Filter Pills - Inspired by reference */}
                                <div className="flex items-center gap-2">
                                    {filterTabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`
                                                px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                                                flex items-center gap-1.5
                                                ${activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                                                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                                                }
                                            `}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Sort + Actions */}
                                <div className="flex items-center gap-3">
                                    {/* Sort Dropdown - Inspired by reference */}
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="px-3 py-1.5 pr-8 rounded-lg bg-slate-800/50 text-slate-300 text-xs font-medium border border-slate-700/50 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                                        >
                                            <option value="newest">Sort: Newest</option>
                                            <option value="oldest">Sort: Oldest</option>
                                            <option value="name">Sort: Name</option>
                                        </select>
                                        <Icons.ChevronRight className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                                    </div>

                                    {/* Upload Button - Inspired by reference */}
                                    <button
                                        onClick={() => viewMode === 'personal' ? setIsPersonalUploadOpen(true) : setIsUploadModalOpen(true)}
                                        className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-lg font-semibold text-xs shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
                                    >
                                        <Icons.Upload className="w-3.5 h-3.5" />
                                        Upload
                                    </button>

                                    {/* Batch Edit Button - Functional */}
                                    <button
                                        onClick={() => {
                                            setIsBatchMode(!isBatchMode);
                                            if (isBatchMode) {
                                                setBatchSelectedAssets([]);
                                            }
                                        }}
                                        className={`px-4 py-1.5 rounded-lg font-semibold text-xs border transition-all duration-300 flex items-center gap-1.5 ${isBatchMode
                                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                                            : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/50 hover:border-slate-600'
                                            }`}
                                        title={isBatchMode ? 'Exit batch mode' : 'Select multiple assets'}
                                    >
                                        <Icons.Settings className="w-3.5 h-3.5" />
                                        {isBatchMode ? 'Exit Batch' : 'Batch Edit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Grid */}
                    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950/50 to-slate-900/50 relative">
                        {/* Floating Suggestion Button - Compact */}
                        {viewMode === 'personal' && suggestedAssets.length > 0 && (
                            <div className="fixed bottom-6 right-6 z-30">
                                <button
                                    onClick={() => {
                                        const assetsToShare = suggestedAssets.slice(0, 3);
                                        setSelectedAssetsForAction(assetsToShare);
                                        setIsShareToTeamModalOpen(true);
                                    }}
                                    className="group px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl font-semibold text-sm shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                    <Icons.Upload className="w-4 h-4 group-hover:animate-bounce" />
                                    <span>Share {suggestedAssets.length} to Team</span>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                                        {suggestedAssets.length}
                                    </div>
                                </button>
                            </div>
                        )}
                        {viewMode === 'shared' && suggestedAssets.length > 0 && (
                            <div className="fixed bottom-6 right-6 z-30">
                                <button
                                    onClick={() => {
                                        const assetsToSave = suggestedAssets.slice(0, 3);
                                        setSelectedAssetsForAction(assetsToSave);
                                        setIsMoveToPersonalModalOpen(true);
                                    }}
                                    className="group px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm shadow-2xl shadow-violet-500/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                    <Icons.Download className="w-4 h-4 group-hover:animate-bounce" />
                                    <span>Save {suggestedAssets.length} to My Assets</span>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                                        {suggestedAssets.length}
                                    </div>
                                </button>
                            </div>
                        )}
                        <div className="p-8">
                            {filteredAssets.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {filteredAssets.map((asset, index) => (
                                        <div
                                            key={asset.id}
                                            className="animate-in fade-in slide-in-from-bottom-4"
                                            style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
                                        >
                                            <TeamAssetCard
                                                asset={asset}
                                                onAssetClick={() => {
                                                    if (isBatchMode) {
                                                        // Toggle selection in batch mode
                                                        setBatchSelectedAssets(prev =>
                                                            prev.find(a => a.id === asset.id)
                                                                ? prev.filter(a => a.id !== asset.id)
                                                                : [...prev, asset]
                                                        );
                                                    } else {
                                                        // Open detail panel in normal mode
                                                        setSelectedAsset(asset);
                                                    }
                                                }}
                                                onAction={handleAction}
                                                isSelected={isBatchMode ? batchSelectedAssets.some(a => a.id === asset.id) : selectedAsset?.id === asset.id}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[60vh]">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                                        <div className="relative bg-slate-800/50 p-12 rounded-3xl border border-slate-700/50 backdrop-blur-xl">
                                            <Icons.Image className="w-24 h-24 text-slate-600" />
                                        </div>
                                    </div>
                                    <h3 className="mt-8 text-xl font-bold text-slate-300">
                                        {viewMode === 'personal' ? 'No personal assets yet' : 'No team assets yet'}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 max-w-sm text-center">
                                        {viewMode === 'personal'
                                            ? 'Start by uploading your first asset or create something amazing'
                                            : 'Upload and share assets with your team to get started'
                                        }
                                    </p>
                                    <button
                                        onClick={() => viewMode === 'personal' ? setIsPersonalUploadOpen(true) : setIsUploadModalOpen(true)}
                                        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                                    >
                                        <Icons.Upload className="w-4 h-4" />
                                        Upload Your First Asset
                                    </button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>

                {/* Detail Panel */}
                {selectedAsset && (
                    <div className="w-96 border-l border-slate-800/80 bg-slate-900/90 backdrop-blur-xl overflow-y-auto animate-in slide-in-from-right-10 duration-300">
                        <TeamAssetDetailPanel
                            asset={selectedAsset}
                            onClose={() => setSelectedAsset(null)}
                            onAction={handleAction}
                        />
                    </div>
                )}

            </div>

            {/* Modals */}
            {isPersonalUploadOpen && (
                <MultiSourceUploadModal
                    isOpen={isPersonalUploadOpen}
                    onClose={() => setIsPersonalUploadOpen(false)}
                    onConfirm={(newAssets) => {
                        console.log("Uploaded personal assets:", newAssets);
                        setIsPersonalUploadOpen(false);
                    }}
                    activeFolderName={activeFolderId ? viewFolders.find(f => f.id === activeFolderId)?.name || 'Library' : 'Library'}
                />
            )}

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

            {/* New Cross-Tab Modals */}
            {isShareToTeamModalOpen && (
                <ShareToTeamModal
                    assets={selectedAssetsForAction}
                    folders={MOCK_FOLDERS}
                    onClose={() => {
                        setIsShareToTeamModalOpen(false);
                        setSelectedAssetsForAction([]);
                    }}
                    onConfirm={(assetIds, folderId, message) => {
                        console.log('Sharing to team:', { assetIds, folderId, message });
                        setIsShareToTeamModalOpen(false);
                        setSelectedAssetsForAction([]);
                        // Show success notification
                    }}
                />
            )}

            {isMoveToPersonalModalOpen && (
                <MoveToPersonalModal
                    assets={selectedAssetsForAction}
                    folders={MOCK_FOLDERS}
                    onClose={() => {
                        setIsMoveToPersonalModalOpen(false);
                        setSelectedAssetsForAction([]);
                    }}
                    onConfirm={(assetIds, folderId, keepInTeam) => {
                        console.log('Saving to personal:', { assetIds, folderId, keepInTeam });
                        setIsMoveToPersonalModalOpen(false);
                        setSelectedAssetsForAction([]);
                        // Show success notification
                    }}
                />
            )}

            {isUnifiedSearchOpen && (
                <UnifiedSearchModal
                    personalAssets={MOCK_TEAM_ASSETS.filter(a => !a.isShared)}
                    teamAssets={MOCK_TEAM_ASSETS.filter(a => a.isShared)}
                    onClose={() => setIsUnifiedSearchOpen(false)}
                    onSelectAsset={(asset, source) => {
                        setSelectedAsset(asset);
                        setViewMode(source === 'personal' ? 'personal' : 'shared');
                        setIsUnifiedSearchOpen(false);
                    }}
                />
            )}

            {/* New Folder Modal */}
            {isNewFolderModalOpen && (
                <NewFolderModal
                    isOpen={isNewFolderModalOpen}
                    onClose={() => setIsNewFolderModalOpen(false)}
                    onConfirm={(folderName, icon) => {
                        console.log(`Creating folder "${folderName}" with icon "${icon}" in ${viewMode}`);
                        // TODO: Implement actual folder creation API call
                        setIsNewFolderModalOpen(false);
                    }}
                    viewMode={viewMode}
                />
            )}

            {/* Batch Action Bar */}
            <BatchActionBar
                selectedAssets={batchSelectedAssets}
                onClearSelection={() => setBatchSelectedAssets([])}
                onDelete={() => {
                    console.log('Deleting assets:', batchSelectedAssets.map(a => a.id));
                    // TODO: Implement delete API call
                    setBatchSelectedAssets([]);
                }}
                onMove={() => {
                    console.log('Moving assets:', batchSelectedAssets.map(a => a.id));
                    // TODO: Show move to folder modal
                }}
                onDownload={() => {
                    console.log('Downloading assets:', batchSelectedAssets.map(a => a.id));
                    // TODO: Implement download
                }}
                onShare={viewMode === 'personal' ? () => {
                    setSelectedAssetsForAction(batchSelectedAssets);
                    setIsShareToTeamModalOpen(true);
                } : undefined}
                viewMode={viewMode}
            />
        </DashboardLayout>
    );
};
