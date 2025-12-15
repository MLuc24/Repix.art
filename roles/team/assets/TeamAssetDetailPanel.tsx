
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamAssetItem } from './types';

interface TeamAssetDetailPanelProps {
    asset: TeamAssetItem;
    onClose: () => void;
    onAction: (action: string, asset: TeamAssetItem) => void;
}

export const TeamAssetDetailPanel = ({ asset, onClose, onAction }: TeamAssetDetailPanelProps) => {
    return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white">Asset Details</h3>
                <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <Icons.Close className="w-5 h-5 text-slate-500" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Preview */}
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img src={asset.src} alt={asset.title} className="w-full h-full object-contain" />
                </div>

                {/* Title & Actions */}
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{asset.title}</h2>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => onAction('add-to-project', asset)}
                            className="flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors col-span-2"
                        >
                            <Icons.Plus className="w-4 h-4" />
                            Add to Project
                        </button>
                        <button
                            onClick={() => onAction('duplicate', asset)}
                            className="flex items-center justify-center gap-2 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Icons.Copy className="w-4 h-4" />
                            Duplicate
                        </button>
                        <button
                            onClick={() => onAction('export', asset)}
                            className="flex items-center justify-center gap-2 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Icons.Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>

                    <button
                        onClick={() => onAction('delete', asset)}
                        className="w-full mt-2 flex items-center justify-center gap-2 py-2 border border-red-200 dark:border-red-900/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Icons.Trash className="w-4 h-4" />
                        Delete from Team
                    </button>
                </div>

                {/* Info */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div>
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Uploaded By</label>
                        <div className="flex items-center gap-2">
                            {asset.ownerAvatar ? (
                                <img src={asset.ownerAvatar} alt="" className="w-6 h-6 rounded-full" />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                                    {asset.ownerString.charAt(0)}
                                </div>
                            )}
                            <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{asset.ownerString}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Created</label>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{new Date(asset.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Resolution</label>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{asset.meta.width} x {asset.meta.height}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Size</label>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{asset.meta.size}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Type</label>
                            <p className="text-sm text-slate-700 dark:text-slate-300 capitalize">{asset.source}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {['hero', 'campaign', '2023'].map(tag => (
                                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md">
                                    #{tag}
                                </span>
                            ))}
                            <button className="px-2 py-1 border border-slate-200 dark:border-slate-700 text-slate-500 text-xs rounded-md hover:bg-slate-50 hover:text-slate-700 transition-colors">
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
