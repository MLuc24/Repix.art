import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamAssetItem } from './types';

interface BatchActionBarProps {
    selectedAssets: TeamAssetItem[];
    onClearSelection: () => void;
    onDelete: () => void;
    onMove: () => void;
    onDownload: () => void;
    onShare?: () => void;
    viewMode: 'personal' | 'shared';
}

export const BatchActionBar = ({
    selectedAssets,
    onClearSelection,
    onDelete,
    onMove,
    onDownload,
    onShare,
    viewMode
}: BatchActionBarProps) => {
    if (selectedAssets.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom-10 duration-300">
            <div className="bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Selection Info */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                                    {selectedAssets.length}
                                </div>
                                <div>
                                    <p className="text-white font-semibold">
                                        {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} selected
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Click assets to select/deselect
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClearSelection}
                                className="ml-4 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition"
                            >
                                Clear Selection
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Download */}
                            <button
                                onClick={onDownload}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium text-sm transition flex items-center gap-2"
                                title="Download selected assets"
                            >
                                <Icons.Download className="w-4 h-4" />
                                Download
                            </button>

                            {/* Move to Folder */}
                            <button
                                onClick={onMove}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium text-sm transition flex items-center gap-2"
                                title="Move to folder"
                            >
                                <Icons.Folder className="w-4 h-4" />
                                Move
                            </button>

                            {/* Share (conditional) */}
                            {viewMode === 'personal' && onShare && (
                                <button
                                    onClick={onShare}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
                                    title="Share to team"
                                >
                                    <Icons.Upload className="w-4 h-4" />
                                    Share to Team
                                </button>
                            )}

                            {/* Delete */}
                            <button
                                onClick={onDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition flex items-center gap-2 shadow-lg shadow-red-500/20"
                                title="Delete selected assets"
                            >
                                <Icons.Trash className="w-4 h-4" />
                                Delete ({selectedAssets.length})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
