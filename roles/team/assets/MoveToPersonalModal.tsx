import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamAssetItem, AssetFolder } from './types';

interface MoveToPersonalModalProps {
    assets: TeamAssetItem[];
    onClose: () => void;
    onConfirm: (assetIds: string[], targetFolderId?: string, keepInTeam?: boolean) => void;
    folders: AssetFolder[];
}

export const MoveToPersonalModal = ({ assets, onClose, onConfirm, folders }: MoveToPersonalModalProps) => {
    const [selectedFolderId, setSelectedFolderId] = useState<string>('');
    const [keepInTeam, setKeepInTeam] = useState(true);

    const handleConfirm = () => {
        onConfirm(
            assets.map(a => a.id),
            selectedFolderId || undefined,
            keepInTeam
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                            <Icons.User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Save to My Assets</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {assets.length} asset{assets.length > 1 ? 's' : ''} selected
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <Icons.Close className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Preview Assets */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {assets.slice(0, 4).map(asset => (
                            <div key={asset.id} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                                <img src={asset.src} alt={asset.title} className="w-full h-full object-cover" />
                            </div>
                        ))}
                        {assets.length > 4 && (
                            <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                    +{assets.length - 4}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Target Folder */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Save to Folder (Optional)
                        </label>
                        <select
                            value={selectedFolderId}
                            onChange={(e) => setSelectedFolderId(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        >
                            <option value="">My Assets (Root)</option>
                            {folders.filter(f => !f.isShared).map(folder => (
                                <option key={folder.id} value={folder.id}>
                                    {folder.name} ({folder.count} items)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Keep in Team */}
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <input
                            type="checkbox"
                            checked={keepInTeam}
                            onChange={(e) => setKeepInTeam(e.target.checked)}
                            className="w-4 h-4 text-violet-600 rounded focus:ring-2 focus:ring-violet-500"
                        />
                        <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">Keep in Team Assets</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Copy to personal library without removing from team</div>
                        </div>
                    </label>

                    {/* Info Box */}
                    <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <Icons.Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-900 dark:text-blue-300">
                            <strong>Tip:</strong> Saving team assets to your personal library lets you work on them independently without affecting the team version.
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <Icons.Download className="w-4 h-4" />
                        Save to My Assets
                    </button>
                </div>
            </div>
        </div>
    );
};
