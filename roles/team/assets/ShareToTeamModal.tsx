import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamAssetItem, AssetFolder } from './types';

interface ShareToTeamModalProps {
    assets: TeamAssetItem[];
    onClose: () => void;
    onConfirm: (assetIds: string[], targetFolderId?: string, message?: string) => void;
    folders: AssetFolder[];
}

export const ShareToTeamModal = ({ assets, onClose, onConfirm, folders }: ShareToTeamModalProps) => {
    const [selectedFolderId, setSelectedFolderId] = useState<string>('');
    const [message, setMessage] = useState('');
    const [notifyTeam, setNotifyTeam] = useState(true);

    const handleConfirm = () => {
        onConfirm(
            assets.map(a => a.id),
            selectedFolderId || undefined,
            message || undefined
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg">
                            <Icons.User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Share to Team</h3>
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
                            Share to Folder (Optional)
                        </label>
                        <select
                            value={selectedFolderId}
                            onChange={(e) => setSelectedFolderId(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            <option value="">Team Root (All Assets)</option>
                            {folders.filter(f => f.isShared).map(folder => (
                                <option key={folder.id} value={folder.id}>
                                    {folder.name} ({folder.count} items)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Add a message (Optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Let your team know what these assets are for..."
                            rows={3}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        />
                    </div>

                    {/* Notify Team */}
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <input
                            type="checkbox"
                            checked={notifyTeam}
                            onChange={(e) => setNotifyTeam(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">Notify team members</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Send notification about new shared assets</div>
                        </div>
                    </label>
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
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <Icons.Upload className="w-4 h-4" />
                        Share to Team
                    </button>
                </div>
            </div>
        </div>
    );
};
